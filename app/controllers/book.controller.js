const db = require("../models");
const Book = db.books;
const Publisher = db.publishers;

const mongoose = require('mongoose');
// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Book Name can not be empty!" });
    return;
  }

  // Create a Book
  const book = new Book({
    isbn: req.body.isbn,
    title: req.body.title,
    publisher: req.body.publisher,
    category: req.body.category,
    price: req.body.price,
    edition: req.body.edition,
    author: req.body.author,
    active: req.body.active ? req.body.active : false
  });

  // Save Book in the database
  book
    .save(book)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Book."
      });
    });
};

// Retrieve all Books from the database.
// exports.findAll = (req, res) => {
//   const name = req.query.name;
//   var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

//   Book.find(condition)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Books."
//       });
//     });
// };

exports.findAll = (req, res) => {
  
  // Book.aggregate([
  //   {
  //     $lookup: {
  //       from: 'publishers', // Name of the publisher collection (must match the collection name in MongoDB)
  //       localField: 'publisher', // Field in the Book collection
  //       foreignField: '_id', // Field in the Publisher collection
  //       as: 'publisherDetails' // Output field
  //     }
  //   }
  // ])
  Book.aggregate([
    {
      $lookup: {
        from: 'publishers', // Ensure this matches the actual collection name in MongoDB
        localField: 'publisher',
        foreignField: '_id',
        as: 'publisherDetails'
      }
    },
    {
      $lookup: {
        from: 'cats', // Ensure this matches the actual collection name in MongoDB
        localField: 'category',
        foreignField: '_id',
        as: 'categoryDetails'
      }
    }
  ])
  .then(data => {
    if (data.length === 0) {
      console.log('No books found or no matching publishers/categories');
    } 
    else{
      res.send(data);

    }
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving books and publishers."
    });
  });
};
// Find a single Book with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
// Ensure the ID is a valid ObjectId
if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).send({ message: "Invalid book ID format" });
}
  Book.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Book with id " + id });
      else {
        
        Book.aggregate([
          { $match: { _id: mongoose.Types.ObjectId(id) } },
          {
            $lookup: {
              from: 'publishers', // Ensure this matches the actual collection name in MongoDB
              localField: 'publisher',
              foreignField: '_id',
              as: 'publisherDetails'
            }
          },
          {
            $lookup: {
              from: 'cats', // Ensure this matches the actual collection name in MongoDB
              localField: 'category',
              foreignField: '_id',
              as: 'categoryDetails'
            }
          }
        ]).then(data => {
          if (data.length === 0) {
            console.log('No books found or no matching publishers/categories');
          } 
          else{
            res.send(data);
      
          }
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while retrieving books and publishers."
          });
        });
        // res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Book with id=" + id });
    });
};

// Update a Book by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Book with id=${id}. Maybe Book was not found!`
        });
      } else res.send({ message: "Book was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Book with id=" + id
      });
    });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Book.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
        });
      } else {
        res.send({
          message: "Book was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Book with id=" + id
      });
    });
};

// Delete all Book from the database.
exports.deleteAll = (req, res) => {
  Book.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Books were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Books."
      });
    });
};

// Find all published Books
exports.findAllActive = (req, res) => {
  Book.find({ active: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Books."
      });
    });
};
