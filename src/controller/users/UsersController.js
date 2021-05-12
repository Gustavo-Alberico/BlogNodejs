const express = require("express");
const router = express.Router();
const User = require("../../models/user/Users");
const bcrypt = require("bcryptjs");
const adminAuth = require("../../../middlewares/adminAuth")



router.get("/admin/users", adminAuth, (req, res) =>{
    User.findAll({
        attributes: ["id", "username", "email", "accesslevel"],
        order: [
            ["accesslevel", "ASC"]
        ]
    }).then(users =>{
        res.render("admin/users/index", {users: users});
    }).catch(error =>{
        res.send("Erro ao carregar página: " + error);
    });
});

router.get("/admin/users/create", adminAuth,  (req, res) =>{
    res.render("admin/users/create");
});


router.post("/users/create", adminAuth, (req, res) =>{
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let accesslevel = req.body.accesslevel;

    User.findOne({where :{ email: email }}).then( user =>{
        if (user == undefined){
            let salt = bcrypt.genSaltSync(11);
            let hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                username: username,
                password: hash,
                accesslevel: accesslevel
            }).then(() =>{
                res.redirect("/admin/users");
            }).catch((error) =>{
                res.redirect("/");
            });
        }else {
            res.redirect("/admin/users/create");
        }
    })

    
});

router.get("/login", (req, res) =>{
    res.render("admin/users/login");
});

router.post("/authenticate", (req,res) =>{
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({where: { email: email }}).then(user =>{
        if(user != undefined){
            let correct = bcrypt.compareSync(password, user.password)
            
            if(correct){

                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles")
            } else {
                res.redirect("/login")
            }

        } else{
            res.redirect("/login")
        }
    }).catch(error =>{
        res.redirect("/login")
    });
}); 


router.get("/logout", adminAuth, (req,res) =>{
    req.session.user = undefined;
    res.redirect("/");
});

module.exports = router