'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.car.belongsToMany(models.user, {through: 'allcars'}); //car can have many users
    }
  };
  car.init({
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    description: DataTypes.STRING,
    garage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'car',
  });
  return car;
};