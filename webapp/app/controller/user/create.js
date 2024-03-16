const db = require('../../models');
const bcrypt = require('bcryptjs');

const create = (req, res) => {
    db.user.create({
        username: req.fields.username,
        password: bcrypt.hashSync(req.fields.password, 8),
    }).then((user) => {
        res.send(user);
    }).catch((error) => {
        console.log(error);
        return res.send(error.message, error);
    });
}

module.exports = create;