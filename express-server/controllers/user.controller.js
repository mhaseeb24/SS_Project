const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const user = mongoose.model('user');

module.exports.register = (req, res, next) => {
    var User = new user();
    User.name = req.body.name;
    User.email = req.body.email;
    User.password = req.body.password;
    User.address = req.body.address;
    User.role = req.body.role;
    User.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate  adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.retrieve_role =  (req, res, next) => {
    let role;
    user.find({ email: req.body.email}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            role = docs[0]._doc.role;
            console.log(role);
        }
    });
    setTimeout(function(){
        console.log("waited for seconds");
        res.send(role);
      }, 1000);
}

module.exports.get_name_from_address =  (req, res, next) => {
    let username;
    if(req.body.address == '0x0000000000000000000000000000000000000000')
    {
        res.send('NA');
    }

    else{
    user.find({ address: req.body.address}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            username = docs[0]._doc.name;
            console.log(username);
        }
    });
    setTimeout(function(){
        console.log("waited for seconds");
        res.send(username);
      }, 1000);}
}


