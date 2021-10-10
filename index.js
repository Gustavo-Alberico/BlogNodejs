// General configs
const express = require("express");
const app = express();
const connection = require("./src/database/connection")
const session = require("express-session")

// Importing external routes
const categoriesController = require("./src/controller/categories/CategoriesController");
const articlesController = require("./src/controller/articles/articlesController");
const usersController = require("./src/controller/users/UsersController")

// Importing models externals
// const Articles = require("./articles/Article")
const Category = require("./src/models/categories/Category");
const Article = require("./src/models/articles/Article");
const Users = require("./src/models/user/Users");

// View engine config
app.set("view engine", "ejs");

// app.disable('x-powered-by');

// Sessions
app.use(session({
    secret: 'qualquercoisa',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 29700000}
}))


// static
app.use(express.static("public"));

//Forms config 
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Database
connection
    .authenticate()
    .then(() =>{
        console.log("Conexão com o banco de dados realizada com sucesso!");
    }).catch((error) => {
        console.log("Conexão com o banco de dados com erro: " + error);
    });


// Routes
app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController)




app.get("/", (req, res) =>{
    Article.findAll({
        include: [{model: Category}],
        order: [
            ["id" , "DESC"]
        ],
        limit: 4
    }).then(articles =>{
        Article.count().then(count =>{
            Category.findAll().then(categories =>{
                Users.findAll({
                    attributes: ["id", "username", "email", "accesslevel"]
                }).then(users =>{
                    res.render("index", {users: users, count: count ,articles: articles, categories: categories});
                })
            });
        })
    });
});

app.get("/:slug", (req, res) =>{
    let slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render("article", {article: article, categories: categories});
            });
        } else{
            res.redirect("/");
        };
    }).catch(error =>{
        res.redirect("/")
    });
});

app.get("/caterogy/:slug", (req, res) =>{
    let slug = req.params.slug;
    
    Category.findOne({
        where: {
            slug : slug,
        },
        include: [{model: Article}]
    }).then(category =>{
        if(category != undefined){

            Category.findAll().then(categories =>{
                Users.findAll({
                    attributes: ["id", "username", "email", "accesslevel"]
                }).then(users =>{
                    res.render("category", {users: users, 
                        articles: category.articles, 
                        categories: categories
                    })
            });
        })
        }else {

            res.redirect("/")
        }
    }).catch(error =>{
        res.redirect("/")
    });
});



app.listen(3000, ()=>{
    console.log("Servidor criado com sucesso!");
});