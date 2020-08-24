const router = require("express").Router();
const Instructor = require("./instructors-model");

router.get("/all", (req, res) => {
  Instructor.getAllClasses()
    .then((classes) => res.status(201).json({ data: classes }))
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/", (req, res) => {
  const { userId } = req.jwt;

  Instructor.getInstructorClasses(userId)
    .then((classes) => res.status(201).json({ data: classes }))
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/:id", async (req, res) => {
  try {
    const requestedClass = await Instructor.findById(req.params.id);
    res.status(200).json(requestedClass);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error retrieving class" });
  }
});

router.post("/", (req, res) => {
  const { userId } = req.jwt;
  const aClass = req.body;

  Instructor.addClass(userId, aClass)
    .then((newClass) => {
      console.log(newClass);
      res.status(201).json({ data: newClass });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Instructor.findById(id)
    .then((aClass) => {
      if (aClass) {
        Instructor.updateClass(changes, id).then((updatedClass) => {
          res.status(200).json(updatedClass);
        });
      } else {
        res.status(404).json({ message: "Could not find class with given id" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.jwt;

  Instructor.deleteClass(id, userId)
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({ removed: deleted });
      } else {
        res.status(404).json({ message: "Could not find class with given id" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
