const express = require("express");
const user = require("../users/users-model");
const properties = require("./properties-model")
// const restricted = require("../auth/restricted-middleware");
const router = express.Router();

// function checkUser(user) {
//   return (req, res, next) => {
//     if (req.decodedToken === !null) {
//       next();
//     } else {
//       res.status(403).json({ message: "You are not authorized" });
//     }
//   };
// }

// router.get('/', async (req, res, next) =>{
//   try{
//     res.status(200).json( await properties.getProperties())
//   } catch(error){
//     next(error)
//   }
// })

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

// router.get("/:id", restricted, checkRole("user"), (req, res) => {
//   user
//     .getClassById(req.params.id)
//     .then((classes) => {
//       if (classes) {
//         res.status(200).json({ classes, decodedToken: req.decodedToken.role });
//       } else {
//         res.status(404).json({ message: "Class with this id doesn't exist." });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Error getting the classes by id." });
//     });
// });

// router.post("/", restricted, checkRole("user"), (req, res) => {
//   user
//     .addClass(req.body)
//     .then((classes) => {
//       res.status(200).json({ classes, decodedToken: req.decodedToken.role });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Can't post the class." });
//     });
// });

// router.put("/:id", restricted, checkRole("user"), (req, res) => {
//   user
//     .updateClass(req.params.id, req.body)
//     .then((classes) => {
//       if (classes) {
//         res.status(200).json({ classes, decodedToken: req.decodedToken.role });
//       } else {
//         res.status(404).json({ message: "Incorrect information provided." });
//       }
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ message: "There was an error updating the class." });
//     });
// });

// router.delete("/:id", restricted, checkRole("user"), (req, res) => {
//   user
//     .removeClass(req.params.id)
//     .then((classes) => {
//       if (classes) {
//         res.status(200).json({ classes, decodedToken: req.decodedToken.role });
//       } else {
//         res.status(404).json({ message: "Class with this id doesn't exist." });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Error deleting the class." });
//     });
// });

module.exports = router;
