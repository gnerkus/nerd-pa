/**
 * 2016-05-01 14:25:07
 * Model definition for a Mot item. A Mot is like a blog article but
 * smaller. It could be compared to a tweet or tumble (Tumblr).
 * @param  {Object} SEQUELIZE Sequelize object
 * @param  {Object} DataTypes Data types
 * @return {Object}           Mot model definition
 *
 * Mot Model Schema:
 * title: varchar(25)
 */
export default (SEQUELIZE, DataTypes) => {
  const MOT = SEQUELIZE.define('Mot', {
    content: {
      type: DataTypes.TEXT,
      field: 'content',
    },
  }, {
    classMethods: {
      associate(models) {
        // TODO: define model associations here
      },
    },
  });

  return MOT;
};
