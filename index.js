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


  
  var data = {
    "firstName": firstName,
    "lastName": lastName,
    "bio": bio,
    "country": country,
    "style": style
  }
  
  db.collection('profiles').insertOne(data, (err, collection) => {
    if(err)
    {
      throw err;
    }
    
    console.log("Record Inserted");
  })
  
  return res.redirect('uploadPost.html') //next page
})

app.post("/uploadPost", upload.single("file"), (req, res) => {
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
  
  var postTitle = req.body.post_title;
  var postDescription = req.body.post_description;
  
  var data = {
    "postTitle": postTitle,
    "postDescription": postDescription
  }
  
  db.collection('posts').insertOne(data, (err, collection) => {
    if(err)
    {
      throw err;
    }
    
    console.log("Record Inserted");
  })

  //return res.redirect('uploadPost.html') //next page
})

// Add new route for password reset
app.post('/send-password-reset', (req, res) => {
    const { email } = req.body;
    // Implement logic to handle password reset link sending
    console.log(`Reset link sent to ${email}`);
    // Here you would typically integrate with an email service provider
    res.send('Password reset link has been sent to your email address.');
});

app.get("/", (req, res) => {
  res.set({
    "Allow-Access-Allow-Origin" : '*'
  })
  
  return res.redirect('createProfile.html') //html page
}).listen(3000);

console.log("Listening on port 3000");
