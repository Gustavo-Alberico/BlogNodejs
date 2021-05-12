const Sequelize = require("sequelize");
const connection = require("../../database/connection");

const Category = connection.define("categories", {
    title: {
        type: Sequelize.STRING,
        allowNul: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNul: false
    }
});

Category.sync({force: false})


module.exports = Category;