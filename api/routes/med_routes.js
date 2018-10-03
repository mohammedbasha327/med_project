'use strict';

var express = require('express');
var app = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('Users');
var Temp = mongoose.model('Temps');
var Last = mongoose.model('Lasts');
var randtoken = require('rand-token');
const auth = require('./../../auth');






    app.get("/check", auth, (req, res, next) => { (err,body) => {
        if (err)
            res.send(err);
        res.status(200).json({ message: "Data returned!" });
        }
    });

    app.get('/Register', function (req, res, next) {
        return res.render('registration');
      });

    app.post("/Register", (req, res) => {
        var token = randtoken.generate(16);
        console.log(token);


        var newUser = new User({
            phone_number: req.body.phone,
            tokenS : token
        });
        
        newUser.save()
            .then(item => {
                res.send("Please note down token number for future use: "+token);
            })
            .catch(err => {
                res.status(400).send("Unable to save to database");
            });

            
    });

    app.get('/Verify', function (req, res, next) {
        return res.render('verification');
      });    

    app.post("/Verify", (req,res) => {
        var phoneNumber = Number;
        var TOKEN = String;

        phoneNumber = req.body.phoneNo;
        TOKEN = req.body.inputToken;
        module.exports.val = req.body.value;
        
    
        User.findOne({phone_number: phoneNumber, tokenS: TOKEN}, function(err,obj) {
            if (err || !obj) {
                var err = new Error('Nothing found here.');
                res.send(err);
            } else {

                var tempUser = new Temp({
                    phone_number1: phoneNumber
                });
                
                    tempUser.save()
                        .then(item1 => {
                            console.log("Your phone number has been saved temporarily");
                        })
                        .catch(err1 => {
                            res.status(400).send("Unable to save to database");
                        });

                var finalUser = new Last({
                    phone_numberF: phoneNumber
                });
                    
                    finalUser.save()
                        .then(item1 => {
                            console.log("Your phone number has been saved Permanently");
                        })
                        .catch(err1 => {
                            res.status(400).send("Unable to save to database");
                        });
                
            }
        });

        setTimeout(function() {
            Temp.findOne({phone_number1: phoneNumber}, function(err1,obj1) {
            if (err1 || !obj1) {
                var err1 = new Error('Nothing found here.');
                res.send(err1);
            } else {
                console.log(obj1.id);
                res.send("This is your url to your console session: /User/"+obj1.id);
            }
        });
        }, 1000);

        


    });

    app.get('/User/:id', (req, res) => {

        Temp.findById(req.params.id, (err, resData) => {
            var callnumber = resData;
            if (callnumber != null){
                res.render( 'response',
                     { message : (callnumber.phone_number1) }
                    ); 
            } else{
                res.send("<h1>Session Expired</h1> <br> <h3><a href='/verify'>Verify Again!</a></h3>");
                }
            });
    });
    module.exports = app;