const Sequelize = require('sequelize')
const TodoItemsModel = require('../models/TodoItems')
const ConnectionString = `postgres://${process.env.POSTGRESQL_USER}:${process.env.POSTGRESQL_PASS}@localhost:${process.env.POSTGRESQL_PORT}/${process.env.POSTGRESQL_DBNAME}`
const sequelize = new Sequelize(ConnectionString)
const TodoItems = TodoItemsModel(sequelize, Sequelize)

sequelize
.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});

module.exports = {
    TodoItems
}