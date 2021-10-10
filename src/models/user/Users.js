const Sequelize = require("sequelize");
const connection = require("../../database/connection");

const User = connection.define("users", {
    email: {
        type: Sequelize.STRING,
        allowNul: false
    },
    username: {
        type: Sequelize.STRING,
        allowNul: false
    },
    password: {
        type: Sequelize.STRING,
        allowNul: false
    },
    accesslevel: {
        type: Sequelize.INTEGER,
        allowNul: false,
    }
});

User.sync({force: false})

module.exports = User;