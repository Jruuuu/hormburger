const { Router } = require("express");
var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");
//gets all the burgers in DB
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var burgObject = {
            burgers: data
        };
        console.log(burgObject);
        res.render("index", burgObject);
    });
});
//inserts input into DB
router.post("/api/burgers", function (req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function (result) {
        console.log(result)
        // res.json({ id: result.insertId });
        res.redirect("/");
    });
});
// changes devoured into false for DB

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);
    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }

    });
});

// router.deleteOne(condition, function(req,res){
//     var condition ="id = " + req.params.id;
//     console.log("condition", condition);
//     burger.deleteOne(condition,function(result){
//         if((result.changeRows === 0)){
//             return res.status(404).end();
//         } else {
//             res.status(200).end();
//         }
//     })
// })

module.exports = router;