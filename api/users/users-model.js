const db = require("../../data/dbConfig");

module.exports = {
  getInstructorClasses,
  findById,
  addClass,
  updateClass,
  deleteClass,
  getAllClasses,
};

function getInstructorClasses(id) {
  console.log(id);
  return db("userclass as uc")
    .join("users as u", "uc.userid", "u.id")
    .join("classes as c", "uc.classid", "c.id")
    .select("*")
    .where({ "uc.userid": id });
}

function findById(id) {
  return db("classes").where({ id }).first();
}

async function addClass(id, newClass) {
  const [classid] = await db("classes").insert(newClass, "id");
  db("userclass").insert({ userid: id, classid: classid });

  return findById(classid);
}

async function updateClass(classes, id) {
  await db("classes").update(classes).where({ id });
  return findById(id);
}

async function deleteClass(id) {
  const promise1 = await findById(id);
  await db("userclass").where({ classid: id }).del();
  const promise2 = db("classes")
    .where({ id })
    .del()
    .then(() => {
      return promise1;
    });
  return promise2;
}

function getAllClasses() {
  return db("classes").select("*");
}
