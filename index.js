var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs"); // hash user passwords

const app = express();
const path = require('path');

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

const User = mongoose.model('User', userSchema);

// User schema and model
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

// POST route for user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        // If user exists and the password matches the one in the database
        if (user && bcrypt.compareSync(password, user.password)) {
            res.send('Login successful');
        } else {
            // If credentials are invalid
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        // Handle errors
        res.status(500).send('Internal server error');
    }
});
//POST for reset password
app.post('/send-password-reset', (req, res) => {
    const { email } = req.body;
    // Logic to handle password reset request
    res.send('If an account with that email exists, a password reset link will be sent.');
});

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

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'register.html')); 
});

app.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'forgotPassword.html'));
});
app.get("/", (req, res) => {
  res.set({
    "Allow-Access-Allow-Origin" : '*'
  })
  
  return res.redirect('createProfile.html') //html page
}).listen(3000);

console.log("Listening on port 3000");
