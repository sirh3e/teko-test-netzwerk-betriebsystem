const db = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signin = (req, res) => {
    if (req.fields.username === undefined) {
        return res.send("User not found");
    }

    db.user.findOne({username: req.fields.username}).then((user) => {
        if (!user) {
            return res.send(404);
        };

        const passwordIsValid = bcrypt.compareSync(req.fields.password, user.password);

        if (!passwordIsValid) {
            return res.send(404);
        }

        const accessToken = jwt.sign({ id: user.id}, "MySecretKeyYesThisIsSecret", {
            expiresIn: 86400 //24 hours
        });

        return res.send({
            id: user.id,
            username: user.username,
            accessToken: accessToken
        });
    }).catch((e) => {
        console.log(e);
        return res.send(e.message,e);
    })

}

module.exports = signin;