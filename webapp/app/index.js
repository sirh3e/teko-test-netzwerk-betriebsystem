const express = require('express');
// const { expressjwt: jwt } = require('express-jwt');
const jwt = require("jsonwebtoken");
const formidable = require('express-formidable');
//const bcrypt = require("bcrypt");
const models = require('./models');
const controller = require('./controller');

const db = models.database;


console.log("\x1b[36m[sequelize] initialize database\x1b[37m");
// db.sync({logging: () => {}}).then(() => {
db.sync().then(() => {    
    console.log("\x1b[32m[sequelize] database loaded\x1b[37m");

    const app = express();

    app.use(express.json());
    
    app.post('/token', async function(req,res) {
        
        req.body.username 
        req.body.password
    
        const token = jwt.sign({username: req.body.username, password: req.body.password}, "MySecretKeyYesThisIsSecret", {
            expiresIn: "24h"
        });
    
        res.json({
            token
        });
    
        // res.send({
            // test: "test",
            // body: req.body});
        // res.json({requestBody: req.body});
    });
    
    const authenticateJWT = (req, res, next) => {
        const authHeader = req.headers.authorization;
    
        if(authHeader) {
            const token = authHeader.split(" ")[1];
    
            jwt.verify(token, "MySecretKeyYesThisIsSecret", (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                };
    
                req.user = user;
    
                console.log(user);
            
                next();
            })
        }
    
        return res.sendStatus(403);
    }
    
    // app.use(authenticateJWT);
    
    app.get("/login", async function(req,res) {
    
        res.send(
        '<form method="POST" action="">'
            + '<p>'
                + '<label for="username">Username</label>'
                + '<input type="text" name="username" id="login_username">'
            + '</p>'
            + '<p>'
                + '<label for="password">Password</label>'
                + '<input type="password" name="password" id="login_password">'
            + '</p>'
            + '<p>'
                + '<input type="submit" name="submit" id="login_submit" value="submit">'
            + '</p>'
        + '</form>'
        
        
        );
    });

    app.get("/register", async function(req,res) {
    
        res.send(
        '<form method="POST" action="">'
            + '<p>'
                + '<label for="username">Username</label>'
                + '<input type="text" name="username" id="login_username">'
            + '</p>'
            + '<p>'
                + '<label for="password">Password</label>'
                + '<input type="password" name="password" id="login_password">'
            + '</p>'
            + '<p>'
                + '<input type="submit" name="submit" id="login_submit" value="register">'
            + '</p>'
        + '</form>'
        
        
        );
    });
    
    app.use(formidable());
    
    app.post("/login", async function(req,res) {
        controller.user.signin(req,res);
    })

    app.post("/register", async function(req, res) {
        controller.user.create(req,res);
    })
    
    app.get("/test", async function(req,res) {
        
        res.send('<a href="http://google.ch">test</a>');
    })
    
    app.get('/', async function(req, res) {
        res.send('Hello World');
        console.log("Instance created");
    })
    
    app.get('/api/v1/', async (req, res) => {
        const docker = new Docker();
        let containerList = await docker.listContainers({all:true});
    
        res.json({
            data: containerList
        });
    })
    
    app.post('/api/v1', async (req, res) => {
        const docker = new Docker();
        let container = await docker.createContainer({
            Image:"mongo:latest",
        });
    
        container.start();
        res.json(container);
    })
    
    app.listen(3000);
    console.log("Server is running...");
    
    
})


