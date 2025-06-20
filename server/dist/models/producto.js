"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Producto = connection_1.default.define('Producto', {
    id_productos: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // <-- esto es lo que falta
    },
    codigo_productos: {
        type: sequelize_1.DataTypes.INTEGER
    },
    nombre_productos: {
        type: sequelize_1.DataTypes.STRING
    },
    descp_productos: {
        type: sequelize_1.DataTypes.STRING
    },
    precio_venta: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    stock_productos: {
        type: sequelize_1.DataTypes.INTEGER
    },
    precio_compra: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    marca_productos: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Producto;
