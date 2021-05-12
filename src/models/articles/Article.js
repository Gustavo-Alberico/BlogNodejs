const Sequelize = require("sequelize");
const connection = require("../../database/connection");
const Category = require("../categories/Category");
const User = require("../user/Users");

const Article = connection.define("articles", {
    title: {
        type: Sequelize.STRING,
        allowNul: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNul: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNul: false
    }

});

Category.hasMany(Article);
Article.belongsTo(Category);

User.hasMany(Article);
Article.belongsTo(User);

Article.sync({force: false})

module.exports = Article;