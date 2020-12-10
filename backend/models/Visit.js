module.exports = (sequelize, Sequelize) => {
  const Visit = sequelize.define("Visit", {
    shortCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Visit;
};
