const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("./category");

const Product = sequelize.define("productos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: "id",
    },
    allowNull: true,
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
});

Product.belongsTo(Category, { foreignKey: "categoriaId" });
Category.hasMany(Product, { foreignKey: "categoriaId"})

module.exports = Product;
