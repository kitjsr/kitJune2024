module.exports = app => {
  const students = require("../controllers/bissue.controller.js");

  const fs = require("fs");
  const multer = require("multer");
  const path = require("path");
  const { v4: uuidv4 } = require("uuid"); 
  
  global.__basedir = __dirname;
  
  
  
  const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("Please upload only images.", false);
    }
  };
  
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __basedir + "../../../uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() +
      path.extname(file.originalname));
    },
  });
  
  var uploadFile = multer({ storage: storage, fileFilter: imageFilter });

  var router = require("express").Router();
  
  // Create a new User
  // router.post("/", users.create);
  // router.post("/", uploadFile.single("photo"),users.create);
  router.post("/", uploadFile.single("file"), bissues.create);

  // Create a new student
  router.post("/", bissues.create);

  // Retrieve all students
  router.get("/", bissues.findAll);

  // Retrieve all published students
  router.get("/active", bissues.findAllActive);

  // Retrieve a single student with id
  router.get("/:id", bissues.findOne);

  // Update a student with id
  router.put("/:id", bissues.update);

  // Delete a student with id
  router.delete("/:id", bissues.delete);

  // Create a new student
  router.delete("/", bissues.deleteAll);

  app.use("/api/bissues", router);
};
