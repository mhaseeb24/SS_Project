const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const product = mongoose.model('product');

module.exports.store_transaction = (req, res, next) => {
    var Product = new product();
    Product.id = req.body.id;
    Product.sender = req.body.sender;
    Product.receiver = req.body.receiver;
    Product.hash = req.body.hash;
    Product.amount = req.body.amount;
    Product.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate hash found.']);
            else
                return next(err);
        }

    });
}

module.exports.retrieve_transaction =  (req, res, next) => {
    let response;
    product.find({ id: req.body.id}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            response = docs;
            console.log(docs);
        }
    });
    setTimeout(function(){
        console.log("waited for seconds");
        res.send(response);
      }, 1000);
}



