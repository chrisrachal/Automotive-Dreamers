'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class garagecurrent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.garagecurrent.hasMany(models.car, {through: 'allcars'});
      models.garagecurrent.belongsTo(models.user);//user can have a current garage
    }
  };
  garagecurrent.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    mods: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'garagecurrent',
  });
  return garagecurrent;
};