const express = require("express");
const properties = require("./listings-model")
const router = express.Router();

router.get("/", (req, res) => {
  properties
    .getProperties()
    .then((properties) => {
      if (properties) {
        res.status(200).json({ properties, decodedToken: req.decodedToken });
      } else {
        res.status(404).json({ message: "Can't get the list of properties." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error getting the classes." });
    });
});

router.get("/:id", (req, res) => {
  properties
    .getPropertyById(req.params.id)
    .then((properties) => {
      if (properties) {
        res.status(200).json({ properties, decodedToken: req.decodedToken });
      } else {
        res.status(404).json({ message: "Class with this id doesn't exist." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error getting the properties by id." });
    });
});

router.post("/", (req, res) => {
  properties
    .addProperty(req.body)
    .then((properties) => {
      res.status(200).json({ properties, decodedToken: req.decodedToken });
    })
    .catch((err) => {
      res.status(500).json({ message: "Can't post the property." });
    });
});

router.put("/:id", (req, res) => {
  properties
    .updateProperty(req.params.id, req.body)
    .then((properties) => {
      if (properties) {
        res.status(200).json({ properties, decodedToken: req.decodedToken });
      } else {
        res.status(404).json({ message: "Incorrect information provided." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "There was an error updating the property." });
    });
});

router.delete("/:id", (req, res) => {
  properties
    .removeProperty(req.params.id)
    .then((properties) => {
      if (properties) {
        res.status(200).json({ properties, decodedToken: req.decodedToken });
      } else {
        res.status(404).json({ message: "Property with this id doesn't exist." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error deleting the property." });
    });
});

module.exports = router;

// router.get('/', async (req, res, next) =>{
//   try{
//     res.status(200).json( await properties.getProperties())
//   } catch(error){
//     next(error)
//   }
// })
