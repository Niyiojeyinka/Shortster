module.exports = (sequelize, Sequelize) => {
  const Visit = sequelize.define("Visit", {
    shortCode: {
      type: Sequelize.STRING,
    },
    platform: {
      type: Sequelize.STRING,
    },
    browser: {
      type: Sequelize.STRING,
    },
  });

  return Visit;
};
