const db = require('../dbSetup');

module.exports = {
    createDisplay: function (userID, display) {
        return new Promise(resolve => {
            let name = display["name"];
            let description = display["description"];
            let location_id = display["location"];

            console.log("Creating Display: ( name: " + name + " description: " + description + " locationID: " + location_id + " userID: " + userID + ")");

            //check that the desired location exists
            db.query('SELECT * FROM LOCATIONS WHERE location_id=$1', [location_id], (err, result) => {

                if (result.rowCount < 1) {
                    let resp = {
                        "displays": {
                            "id": "",
                            "status": "ERROR",
                            "message": "location_id '" + location_id + "' does not exist"
                        }
                    }
                    resolve(resp);
                    return;
                }

                //TODO: I know this is not dry. I know that there is a better way to do this... but its 3am and fuck it
                if (display["content"]) {
                    let content = display["content"];
                    db.query('INSERT INTO DISPLAYS (description, display_name, content) VALUES ($1,$2,$3) RETURNING display_id', [description, name, content], (err, result) => {
                        let display_id = result.rows[0].display_id;

                        /* After getting the display id of our newly created display, map the locationID to the DisplayID in the MAPPED_LD (location, display) table*/
                        db.query('INSERT INTO MAPPED_LD (location_id, display_id) VALUES ($1,$2)', [location_id, display_id], (err, result) => {
                            let resp = {
                                "displays": {
                                    "id": display_id,
                                    "location": location_id,
                                    "name": name,
                                    "description": description
                                }
                            }
                            //return all information to poster including new IDs, can be used to confirm creation and for UI refrences 
                            resolve(resp);
                        });
                    });
                } else {
                    db.query('INSERT INTO DISPLAYS (description, display_name) VALUES ($1,$2) RETURNING display_id', [description, name], (err, result) => {
                        let display_id = result.rows[0].display_id;

                        /* After getting the display id of our newly created display, map the locationID to the DisplayID in the MAPPED_LD (location, display) table*/
                        db.query('INSERT INTO MAPPED_LD (location_id, display_id) VALUES ($1,$2)', [location_id, display_id], (err, result) => {
                            let resp = {
                                "displays": {
                                    "id": display_id,
                                    "location": location_id,
                                    "name": name,
                                    "description": description
                                }
                            }
                            //return all information to poster including new IDs, can be used to confirm creation and for UI refrences 
                            resolve(resp);
                        });
                    });
                }
            })
        })
    },

    getDisplayWithID: function (displayID) {
        return new Promise(resolve => {
            console.log("Getting Display:  ( displayID: " + displayID + ")");

            db.query('SELECT * FROM displays WHERE display_id=$1', [displayID], (err, result) => {
                // Location requested does not exist
                if (!result.rows[0]) {
                    let resp = {
                        "displays": {},
                        "status": "ERROR",
                        "message": "No display with display_id '" + displayID + "'"
                    }
                    resolve(resp);
                    return;
                }
                let display = result.rows[0];

                db.query('SELECT location_id FROM MAPPED_LD WHERE display_id = $1', [displayID], (err, result) => {
                    if (result.rowCount < 1) {
                        let resp = {
                            "displays": {},
                            "status": "ERROR",
                            "message": "No display with display_id '" + displayID + "'"
                        }
                        resolve(resp);
                        return;
                    }
                    console.log(result);
                    let resp = {
                        "displays": {
                            "id": display.display_id,
                            "location": result.rows[0].location_id,
                            "name": display.display_name,
                            "description": display.description,
                            "content": display.content
                        }
                    }
                    resolve(resp);
                });
            });
        })
    },

    deleteDisplayWithID: function (userID, displayID) {
        return new Promise(resolve => {
            console.log("Deleting Display: (id: " + displayID + " userID: " + userID + ")");

            db.query('DELETE FROM MAPPED_LD WHERE display_id=$1', [displayID], (err, result) => {
                console.log(result);
                console.log(err);

                db.query('DELETE FROM displays WHERE display_id=$1', [displayID], (err, result) => {
                    console.log(result);
                    console.log(err);
                });
                resolve(JSON.stringify(result.rows));
            });
        })
    },

    updateDisplayWithID: function (userID, displayID, display) {
        return new Promise(resolve => {
            let name = display["name"];
            let description = display["description"];
            let content = display["content"];

            console.log("Updating Display: ( name: " + name + " address: " + description + " userID: " + userID + " displayID: " + displayID + ")");

            db.query('SELECT * FROM MAPPED_LD WHERE display_id = $1', [displayID], (err, result) => {
                if (result.rowCount < 1) {
                    let resp = {
                        "displays": {},
                        "status": "ERROR",
                        "message": "No display with display_id '" + displayID + "'"
                    }
                    resolve(resp);
                    return;
                }
                let location_id = result.rows[0].location_id;

                db.query('UPDATE displays SET display_name = ($1), description = ($2), content = ($3) WHERE display_id=$4', [name, description, content, displayID], (err, result) => {
                    let resp = {
                        "displays": {
                            "id": displayID,
                            "location": location_id,
                            "name": name,
                            "description": description,
                            "content": content
                        }
                    }
                    resolve(resp);
                });
            });
        })
    },
}