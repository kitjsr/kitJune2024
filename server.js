const express = require("express");
const cors = require("cors");

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to backend application." });
});
///////////
// Function to serve all static files
// inside public directory.
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
//////////////
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const ename = req.body.ename;
    const qname = req.body.qname;
    const file = req.file;

    console.log('Title:', ename);
    console.log('Title:', qname);
    console.log('File:', file);

    // Process the file and title here...

    res.status(200).send('File uploaded successfully');
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).send('Server error');
  }
});
//////////////
require("./app/routes/student.routes")(app);
require("./app/routes/qpaper.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
