const express = require("express");
const router = express.Router();
const Category = require("../../models/categories/Category");
const Users = require("../../models/user/Users")
const Article = require("../../models/articles/Article");
const slugify = require("slugify");
const adminAuth = require("../../../middlewares/adminAuth")




router.get("/admin/articles", adminAuth ,(req, res) => {
    Article.findAll({
        order: [
            ["id" , "DESC"]
        ],
        include: [{ model: Category}]
    }).then((articles) =>{
        Users.findAll({
            attributes: ["id", "username", "email", "accesslevel"],
        }).then(users =>{
            res.render("admin/articles/index",{users: users, articles: articles});
        })
    })
});

router.get("/admin/articles/new", adminAuth,  (req, res) =>{
    Category.findAll().then(categories => {
        Users.findAll({
            attributes: ["id", "username", "email", "accesslevel"]
        }).then(users =>{
            res.render("admin/articles/new", {users: users, categories: categories});
        })
    });
});

router.post("/articles/save", adminAuth, (req, res) =>{
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;
    let users = req.body.users;

    Article.create({
        title: title,
        slug: slugify(title, {
            lower: true
        }),
        body: body,
        categoryId: category,
        userId: users
    }).then(() =>{
        res.redirect("/admin/articles")
    })

});

router.post("/articles/delete", adminAuth, (req, res) => {
    let id = req.body.id;

    if(id != undefined) {
        if(!isNaN(id)){

            Article.destroy({
                where: {
                    id: id
                }
            }).then(() =>{
                res.redirect("/admin/articles");
            });

        } else {
            res.redirect("/admin/articles");
        }
    } else {
        res.redirect("/admin/articles");
    };

});


router.get("/admin/articles/edit/:id", adminAuth, (req, res) =>{
    let id = req.params.id

    if(isNaN(id)){
        res.redirect("/admin/articles");
    }

    Article.findByPk(id).then(articles => {
        if(articles != undefined){
            Category.findAll().then( categories =>{
                Users.findAll({
                    attributes: ["id", "username", "email", "accesslevel"]
                }).then(users =>{
                    res.render("admin/articles/edit", {users: users, articles: articles, categories: categories});           
                })
            })
        }else {
            res.redirect("/admin/articles");
        };
    }).catch(erro =>{
        res.redirect("/admin/articles");
    });
});


router.post("/articles/update", adminAuth, (req, res) =>{
    let id = req.body.id;
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category
    let userId = req.body.users

    Article.update ({
        title: title,
        slug: slugify(title,{lower: true}), 
        body: body, 
        categoryId: category,
        userId: userId},
        {
        where: {
            id: id
        }
    }).then(() =>{
        res.redirect("/admin/articles")
    })
});

router.get("/articles/page/:num", (req, res) =>{
    let page = req.params.num;
    let offSet = 0

    if(isNaN(page) || page <= 1){
        offSet = 0;
    } else {
        offSet = parseInt((page) -1) * 4;
    }


    Article.findAndCountAll({
        limit: 4,
        offset: offSet,
        order: [["id", "DESC"]]
    }).then(articles => {

        let next;
        if(offSet + 4 >= articles.count) {
            next = false;
        } else {
            next = true;
        }

        let result = {
            page: parseInt(page),
            next: next,
            articles: articles,
        }

    Category.findAll().then(categories =>{
        res.render("admin/articles/page", {result: result, categories: categories});
    });
    });

});

module.exports = router;