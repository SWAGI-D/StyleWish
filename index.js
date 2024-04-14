var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb+srv://swaradesai16:7Io6sAWSEKco9UNa@cluster0.l6kfsmc.mongodb.net/style-wish-data');

var db = mongoose.connection

db.on('error',() => console.log("Error in Connection"));

db.once('open', () => console.log('connected to db'));

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
});
  
const Image = mongoose.model('Image', imageSchema);

app.post("/create", upload.single("file"), (req, res) => {
  if (!req.file) 
  {
    console.log('No file uploaded.');
  }
  const image = new Image({
    filename: req.file.filename,
    path: req.file.path
  });
  
  try 
  {
    image.save();
    console.log('Image uploaded and saved successfully');
  } 
  catch (error) 
  {
    console.log(500).send('Error saving image to the database');
  }
  
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var bio = req.body.bio;
  var country = req.body.country;
  var style = req.body.style;
