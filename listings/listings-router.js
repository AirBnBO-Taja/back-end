const express = require("express");
const listings = require("./listings-model")
const router = express.Router();

router.get("/", (req, res) => {
  listings
    .getListings()
    .then((listings) => {
      if (listings) {
        res.status(200).json({ listings, decodedToken: req.decodedToken });
      } else {
        res.status(404).json({ message: "Can't get the list of listings." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error getting the listings." });
    });
});

router.get("/:id", (req, res) => {
  listings
    .getListingById(req.params.id)
    .then((listings) => {
      if (listings) {
        res.status(200).json({ listings, decodedToken: req.decodedToken });
      } else {
        res.status(404).json({ message: "Listing with this id doesn't exist." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error getting the listings by id." });
    });
});

router.post("/", (req, res) => {
  listings
    .addListing(req.body)
    .then((listings) => {
      res.status(200).json({ listings, decodedToken: req.decodedToken });
    })
    .catch((err) => {
      res.status(500).json({ message: "Can't post the Listing." });
    });
});

router.put("/:id", (req, res) => {
  listings
    .updateListing(req.params.id, req.body)
    .then((listings) => {
      if (listings) {
        res.status(200).json({ listings, decodedToken: req.decodedToken });
      } else {
        res.status(404).json({ message: "Incorrect information provided." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "There was an error updating the Listing." });
    });
});

router.delete("/:id", (req, res) => {
  listings
    .removeListing(req.params.id)
    .then((listings) => {
      if (listings) {
        res.status(200).json({ listings, decodedToken: req.decodedToken });
      } else {
        res.status(404).json({ message: "Listing with this id doesn't exist." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error deleting the Listing." });
    });
});

module.exports = router;

// router.get('/', async (req, res, next) =>{
//   try{
//     res.status(200).json( await listings.getlistings())
//   } catch(error){
//     next(error)
//   }
// })
