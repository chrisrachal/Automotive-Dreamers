'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class allcars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  allcars.init({
    userId: DataTypes.INTEGER,
    carId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'allcars',
  });
  return allcars;
};