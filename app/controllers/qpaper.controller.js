const db = require("../models");
const Qpaper = db.qpapers;
const fs = require("fs");
  //C:\Users\Administrator\AngularNodeExpressMySQL\node-js-server\resources\static\assets
  //C:\Users\Administrator\AngularNodeExpressMySQL\node-js-server\app\resources\static\assets\uploads\
  global.__basedir = __dirname;

// Create and Save a new User
exports.create = (req, res) => {
  
    try {
      console.log(req.file);
  
      if (req.file == undefined) {
        return res.send(`You must select a file.`);
      }
  
      Qpaper.create({
        qname: req.body.qname,
        ename: req.body.ename,
        photo: req.file.filename,
        // photo: req.file.originalname,
        published: req.body.published ? req.body.published : false,
        kit: fs.readFileSync(
          __basedir + "../../../uploads/" + req.file.filename
        ),
        
      }).then(data => {
            return res.send(data);
            return res.send(`File has been uploaded.`);
      });
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying upload images: ${error}`);
    }
};

// Retrieve all Users from the database.
// exports.findAll = (req, res) => {
//   const uname = req.query.uname;
//   var condition = uname ? { uname: { [Op.like]: `%${uname}%` } } : null;

//   User.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Users."
//       });
//     });
// };

// // Retrieve all Users from the database.
// exports.findLoginDetails = (req, res) => {
//   const email = req.body.email;

//   User.findAll({ where: {
//     email:email} })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Users."
//       });
//     });
// };

// // Find a single User with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   User.findByPk(id)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving User with id=" + id
//       });
//     });
// };

// // Update a User by the id in the request
// exports.update = (req, res) => {
//   const id = req.params.id;

//   User.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "User was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating User with id=" + id
//       });
//     });
// };

// // Delete a User with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   User.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "User was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete User with id=${id}. Maybe User was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete User with id=" + id
//       });
//     });
// };

// // Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//   User.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Users were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Users."
//       });
//     });
// };

// // find all published User
// exports.findAllPublished = (req, res) => {
//   User.findAll({ where: { status: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Users."
//       });
//     });
// };