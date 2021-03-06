const express = require("express");
var path = require("path");
const app = express();

app.get("/locationlist", (req, res) => {
  let locationList = [
    {
      id: 0,
      name: "Gino's Pizzeria",
      address: "Mankato Mississippi",
      details: "(468) 353-2641"
    },
    {
      id: 1,
      name: "Big Bear",
      address: "Roseville NH 11523",
      details: "(793) 151-6230"
    },
    {
      id: 2,
      name: "Super Store",
      address: "Corona New Mexico",
      details: "(372) 587-2335"
    },
    {
      id: 3,
      name: "Kelseys",
      address: "Santa Rosa MN",
      details: "(684) 579-1879"
    },
    {
      id: 4,
      name: "Super Store",
      address: "Erie Rhode Island",
      details: "(660) 663-4518"
    },
    {
      id: 5,
      name: "Super Store",
      address: "Bandera Dakota",
      details: "(959) 119-8364"
    }
  ];

  res.send(locationList);
});

app.get("/displaylist/:location_id", (req, res) => {
  let location_id = req.params.location_id;

  /**
   * Create a switch statement for these loctions and return the displays based on that
   */
  let displayList;
  switch (location_id) {
    case "0":
      displayList = {
        locations: {
          location_id: 0,
          name: "Gino's Pizzeria",
          details: "(468) 353-2641",
          displays: [
            {
              display_id: 1007,
              display_name: "Counter_1",
              description: "Above Counter 1"
            },
            {
              display_id: 1008,
              display_name: "Counter_2",
              description: "Above Counter 2"
            },
            {
              display_id: 1009,
              display_name: "Counter_3",
              description: "Above Counter 2"
            },
            {
              display_id: 1010,
              display_name: "Counter_4",
              description: "Above Counter 2"
            }
          ]
        }
      };
      return res.send(displayList);
      break;

    case "1":
      displayList = {
        locations: {
          location_id: 0,
          name: "Big Bear",
          details: "(793) 151-6230",
          displays: [
            {
              display_id: 1011,
              display_name: "Counter_4",
              description: "Above Counter 1"
            },
            {
              display_id: 1012,
              display_name: "Counter_3",
              description: "Above Counter 2"
            }
          ]
        }
      };
      return res.send(displayList);
      break;

    case "2":
      displayList = {
        locations: {
          location_id: 2,
          name: "Big Bear",
          details: "(793) 151-6230",
          displays: [
            {
              display_id: 1011,
              display_name: "Counter_4",
              description: "Above Counter 1"
            },
            {
              display_id: 1012,
              display_name: "Counter_3",
              description: "Above Counter 2"
            }
          ]
        }
      };
      return res.send(displayList);
      break;

    case "3":
      displayList = {
        locations: {
          location_id: 3,
          name: "Kelseys",
          details: "(684) 579-1879",
          displays: [
            {
              display_id: 1013,
              display_name: "Counter_4",
              description: "Above Counter 1"
            },
            {
              display_id: 1014,
              display_name: "Counter_3",
              description: "Above Counter 2"
            }
          ]
        }
      };
      return res.send(displayList);
      break;

    case "4":
      displayList = {
        locations: {
          location_id: 4,
          name: "Super Store",
          details: "(660) 663-4518",
          displays: [
            {
              display_id: 1015,
              display_name: "Counter_4",
              description: "Above Counter 1"
            },
            {
              display_id: 1016,
              display_name: "Counter_3",
              description: "Above Counter 2"
            }
          ]
        }
      };
      return res.send(displayList);
      break;

    case "5":
      displayList = {
        locations: {
          location_id: 5,
          name: "Super Store",
          details: "(959) 119-8364",
          displays: [
            {
              display_id: 1017,
              display_name: "Counter_4",
              description: "Above Counter 1"
            },
            {
              display_id: 1018,
              display_name: "Counter_3",
              description: "Above Counter 2"
            }
          ]
        }
      };
      return res.send(displayList);
      break;

    default:
      res.send({});
      break;
  }
});

/**
 * This gives the output for viewer page
 */
app.get("/viewer-page/:display_id", (req, res) => {

  let display_id = req.params.display_id;

  /**
   * Check if the display id exists
   */
   switch(display_id){
     case '1000':
     case '1001':
     case '1002':
     case '1003':
     break;

     default:
      return res.status(400).send('Did not find the display id entered by user');
     break;
   }


  /**
   * Get the content based on the display id
   */
  let content;

  switch(display_id){
    case '1000':
    content = {
      displays: {
        id: 1000,
        display_name: "Counter_1",
        description: "Above Counter 1",
        content: "<!DOCTYPE html>\n<html>\n<body>\n\n<h1>Breakfast menu</h1>\n\n<p>Menu<ul><li>Coffee</li><li>Tea</li></ul></p>\n\n</body>\n</html>"
      }
    };
    return res.send(content);
    break;

    case '1001':
    content = {
      displays: {
        id: 1001,
        display_name: "Counter_1",
        description: "Above Counter 1",
        content: "<!DOCTYPE html>\n<html>\n<body>\n\n<h1>Lunch menu</h1>\n\n<p>Menu</p>\n\n</body>\n</html>"
      }
    };
    return res.send(content);
    break;

    case '1002':
    content = {
      displays: {
        id: 1002,
        display_name: "Counter_1",
        description: "Above Counter 1",
        content: "<!DOCTYPE html>\n<html>\n<body>\n\n<h1>Lunch menu</h1>\n\n<p>Menu</p>\n\n</body>\n</html>"
      }
    };
    return res.send(content);
    break;

    case '1003':
    content = {
      displays: {
        id: 1003,
        display_name: "Counter_1",
        description: "Above Counter 1",
        content: "<!DOCTYPE html>\n<html>\n<body>\n\n<h1>Lunch menu</h1>\n\n<p>Menu</p>\n\n</body>\n</html>"
      }
    };
    return res.send(content);
    break;
  }
});



app.listen(6000, () => {
  console.log("Example app listening on port 6000!");
});
