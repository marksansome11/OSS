const express = require('express');
const passport = require('passport');
const db = require('../dbSetup')
const bcrypt = require('bcrypt');
const locationsController = require('../controllers/locationsController');
const router = express.Router();

router.get('/locations', (req, res, next) => {
    
    if (req.user == null) {
        res.status(500).send("Error - cannot GET locations: no valid account found. Please sign in first.");
    }
    else {
        let user = req.user; 
        let userID = user[0]["userID"];
        let displayName = user[0]["displayName"];

        let locationsJson = locationsController.getLocations(userID);



        res.status(200).send([userID, displayName]);
    }
});




//Hit like http://localhost:3000/api/getLocation/your_id_here
router.get('/getLocation/:id', (req, res, next) => {

	let id = req.params.id; console.log(id);
	


    res.status(200).send("locations API hit");
});




module.exports = router;

/* 

'use strict';
module.exports = function (app) {
    var locations = require('../controllers/locationsController');

    // todoList Routes
    app.route('/locations')
        .get(locations.list_all_tasks)
        .post(locations.create_a_task);


    app.route('/locations/:locationId');
    // .get(locations.read_a_task)
    // .put(locations.update_a_task)
    // .delete(locations.delete_a_task);
};
*/ 