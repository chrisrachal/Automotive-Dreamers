'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class garagedream extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.garagedream.belongsToMany(models.car, {through: 'dreamcars'});
      // models.garagedream.hasMany(models.car, {through: 'allcars'});
      models.garagedream.belongsTo(models.user); //user can also have a dream garage
    }
  };
  garagedream.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    mods: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'garagedream',
  });
  return garagedream;
};