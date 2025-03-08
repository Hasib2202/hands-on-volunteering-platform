const express = require("express");
const { Team, User, Event, TeamInvitation } = require("../models");
const auth = require("../middleware/auth");
const { Op } = require("sequelize"); // Import Sequelize operators
const router = express.Router();

// Create a Team (Public or Private)
router.post("/", auth, async (req, res) => {
  const { name, description, isPublic } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: "Name and description are required" });
  }

  try {
    const team = await Team.create({
      name,
      description,
      isPublic,
      leaderId: req.user.id, // Set the current user as the team leader
    });

    // Add the leader as a team member
    await team.addMembers(req.user.id);

    res.status(201).json({ message: "Team created successfully", team });
  } catch (err) {
    res.status(500).json({ message: "Error creating team", error: err.message });
  }
});


// Send an Invitation to Join a Private Team
router.post("/:id/invite", auth, async (req, res) => {
  const { email } = req.body; // Email of the user to invite

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const team = await Team.findByPk(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Check if the team is private
    if (team.isPublic) {
      return res.status(400).json({ message: "Cannot invite users to a public team" });
    }

    // Check if the current user is the team leader
    if (team.leaderId !== req.user.id) {
      return res.status(403).json({ message: "Only the team leader can send invitations" });
    }

    // Find the user to invite by email
    const userToInvite = await User.findOne({ where: { email } });

    if (!userToInvite) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already a member
    const isMember = await team.hasMembers(userToInvite.id);
    if (isMember) {
      return res.status(400).json({ message: "User is already a member of the team" });
    }

    // Check if the user has already been invited
    const existingInvitation = await TeamInvitation.findOne({
      where: { teamId: team.id, userId: userToInvite.id },
    });

    if (existingInvitation) {
      return res.status(400).json({ message: "User has already been invited" });
    }

    // Create the invitation
    const invitation = await TeamInvitation.create({
      teamId: team.id,
      userId: userToInvite.id,
      status: "pending",
    });

    res.status(201).json({ message: "Invitation sent successfully", invitation });
  } catch (err) {
    res.status(500).json({ message: "Error sending invitation", error: err.message });
  }
});

// Accept or Reject a Team Invitation
// router.post("/invitations/:id/respond", auth, async (req, res) => {
//   const { status } = req.body;

//   if (!status || !["accepted", "rejected"].includes(status)) {
//     return res.status(400).json({ message: "Invalid status" });
//   }

//   try {
//     const invitation = await TeamInvitation.findByPk(req.params.id);

//     if (!invitation) {
//       return res.status(404).json({ message: "Invitation not found" });
//     }

//     // Update the invitation status
//     invitation.status = status;
//     await invitation.save();

//     // If accepted, add the user to the team
//     if (status === "accepted") {
//       const team = await Team.findByPk(invitation.teamId);
//       await team.addMembers(invitation.userId);
//     }

//     res.json({ message: "Invitation response recorded", invitation });
//   } catch (err) {
//     res.status(500).json({ message: "Error responding to invitation", error: err.message });
//   }
// });

// Fetch Pending Invitations for a User
router.get("/invitations", auth, async (req, res) => {
  try {
    const invitations = await TeamInvitation.findAll({
      where: { userId: req.user.id, status: "pending" },
      include: [
        { model: Team, as: "team", include: [{ model: User, as: "leader", attributes: ["id", "name"] }] },
      ],
    });

    res.json(invitations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching invitations", error: err.message });
  }
});


// Respond to an Invitation (Accept or Reject)
router.post("/invitations/:id/respond", auth, async (req, res) => {
  const { status } = req.body;

  if (!status || !["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const invitation = await TeamInvitation.findByPk(req.params.id);

    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    // Check if the invitation belongs to the current user
    if (invitation.userId !== req.user.id) {
      return res.status(403).json({ message: "You do not have permission to respond to this invitation" });
    }

    // Update the invitation status
    invitation.status = status;
    await invitation.save();

    // If accepted, add the user to the team
    if (status === "accepted") {
      const team = await Team.findByPk(invitation.teamId);
      await team.addMembers(req.user.id);
    }

    res.json({ message: "Invitation response recorded", invitation });
  } catch (err) {
    res.status(500).json({ message: "Error responding to invitation", error: err.message });
  }
});

// List Teams (Only Public Teams or Teams the User is a Member Of)
router.get("/", auth, async (req, res) => {
  try {
    const teams = await Team.findAll({
      where: {
        [Op.or]: [
          { isPublic: true }, // Public teams
          { "$members.id$": req.user.id }, // Teams the user is a member of
        ],
      },
      include: [
        { model: User, as: "leader", attributes: ["id", "name"] }, // Include leader
        { model: User, as: "members", attributes: ["id", "name"] }, // Include members
      ],
    });

    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: "Error fetching teams", error: err.message });
  }
});


// Get Team Details
router.get("/:id", auth, async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id, {
      include: [
        { model: User, as: "leader", attributes: ["id", "name"] }, // Include leader
        { model: User, as: "members", attributes: ["id", "name"] }, // Include members
        { model: Event, as: "events" }, // Include team events
      ],
    });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Check if the team is private and the user is not a member
    if (!team.isPublic && !team.members.some((member) => member.id === req.user.id)) {
      return res.status(403).json({ message: "You do not have access to this team" });
    }

    res.json(team);
  } catch (err) {
    res.status(500).json({ message: "Error fetching team details", error: err.message });
  }
});
module.exports = router;