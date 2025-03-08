module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    content: { type: DataTypes.TEXT, allowNull: false },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Posts",
        key: "id",
      },
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: "userId", as: "author" }); // Link to comment author
    Comment.belongsTo(models.Post, { foreignKey: "postId", as: "post" }); // Link to post
  };

  return Comment;
};