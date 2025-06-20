import { DataTypes } from 'sequelize'
import db from '../db/connection'

const Producto = db.define('Producto', {
    id_productos:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // <-- esto es lo que falta

    },
    codigo_productos:{
        type: DataTypes.INTEGER
    },
    nombre_productos:{
        type: DataTypes.STRING
    },
    descp_productos:{
        type: DataTypes.STRING
    },
    precio_venta:{
        type: DataTypes.DOUBLE
    },
    stock_productos:{
        type: DataTypes.INTEGER
    },
    precio_compra:{
        type: DataTypes.DOUBLE
    },
    marca_productos:{
        type: DataTypes.STRING
    },
},{
    createdAt: false,
    updatedAt: false
});

export default Producto;