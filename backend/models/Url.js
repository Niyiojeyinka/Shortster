module.exports = (sequelize, Sequelize) => {
  const Url = sequelize.define("Url", {
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    shortCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Url;
};
