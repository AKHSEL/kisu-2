import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('kisu', 'root', '40857241axel', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;