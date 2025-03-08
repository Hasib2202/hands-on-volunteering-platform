module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    cause: { type: DataTypes.STRING, allowNull: false },
    urgency: { type: DataTypes.ENUM("low", "medium", "urgent"), defaultValue: "low" },
    isOngoing: { type: DataTypes.BOOLEAN, defaultValue: true },
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: "userId", as: "author" }); // Link to author
    Post.hasMany(models.Comment, { foreignKey: "postId", as: "comments" }); // Link to comments
  };

  return Post;
};