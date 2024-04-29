var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();
const path = require('path');

var currentUser = "";

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
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

//const User = mongoose.model('User', userSchema);

// User schema and model
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

const postSchema = new mongoose.Schema({
  userDetail: String,
  postTitle: String,
  postDescription: String,
  imageName: String,
  imagePath: String
});

const Post = mongoose.model('Post', postSchema);

const suggestionSchema = new mongoose.Schema({
  postDetail: String,
  userDetail: String,
  suggestTitle: String,
  suggestDescription: String,
  imageName: String,
  imagePath: String
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

// POST route for user login
app.post('/login', async (req, res) => {
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

      const userExists = await User.findOne( { email : userEmail });

      //if (user && bcrypt.compareSync(userPassword, user.password)) 
      if(userExists.password === userPassword)
      {
          const fs = require('fs');

          currentUser = userEmail;

          let loginUser = 
          { 
              username: userEmail
          };
          
          let data = JSON.stringify(loginUser);
          fs.writeFileSync('public/currentUser.json', data);

          return res.redirect("dashboard.html");
      } 

      else
      {
           res.send("Invalid credentials");
      }

});


//POST for reset password
app.post('/send-password-reset', (req, res) => {
    const { email } = req.body;
    // Logic to handle password reset request
    res.send('If an account with that email exists, a password reset link will be sent.');
});

app.post("/registerUser", async (req, res) => {
  var regEmail = req.body.regEmail;
  var regPassword = req.body.regPassword;

    const userExists = await User.findOne({ email: regEmail });

    if(userExists === null) 
    {
      //var hashPwd = bcrypt.hashSync(password);
      
      var data = 
      {
        "email": regEmail,
        "password": regPassword
      }

      db.collection('users').insertOne(data, (err, collection) => {
        if(err)
        {
          throw err;
        }

        console.log("new user record inserted");

        return res.redirect("createProfile.html");
      })
    }

    else{
      res.send("User Already Exists");
    }


})

/*const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
});
  
const Image = mongoose.model('Image', imageSchema);*/

app.post("/create", upload.single("file"), (req, res) => {
  if (!req.file) 
  {
    console.log('No file uploaded.');
  }
  
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var bio = req.body.bio;
  var country = req.body.country;
  var style = req.body.style;
  var imageName = req.file.filename;
  var imagePath = req.file.path;
 
  var data = {
    "firstName": firstName,
    "lastName": lastName,
    "bio": bio,
    "country": country,
    "style": style,
    "imageName": imageName,
    "imagePath": imagePath
  }

      db.collection('profiles').insertOne(data, (err, collection) => {
    if(err)
    {
      throw err;
    }
    
    console.log("Record Inserted");
  })
  
  return res.redirect("login.html") //next page
})

app.post("/uploadPost", upload.single("file"), (req, res) => {
  if (!req.file) 
  {
    console.log('No file uploaded.');
  }

  var userDetail = currentUser;
  var postTitle = req.body.post_title;
  var postDescription = req.body.post_description;
  var imageName = req.file.filename;
  var imagePath = req.file.path;
  
  var data = {
    "userDetail": userDetail,
    "postTitle": postTitle,
    "postDescription": postDescription,
    "imageName": imageName,
    "imagePath": imagePath
  }
  
  db.collection('posts').insertOne(data, (err, collection) => {
    if(err)
    {
      throw err;
    }
    
    console.log("Record Inserted");
  })

  return res.redirect('dashboard.html') //next page
})

app.post("/makeSuggestion", upload.single("file"), (req, res) => {

  if (!req.file) 
  {
    console.log('No file uploaded.');
  }

  var postDetail = req.body.hiddenField;
  var userDetail = currentUser;
  var suggestTitle = req.body.suggest_title;
  var suggestDescription = req.body.suggest_description;
  var imageName = req.file.filename;
  var imagePath = req.file.path;
  
  var data = {
    "postDetail": postDetail,
    "userDetail": userDetail,
    "suggestTitle": suggestTitle,
    "suggestDescription": suggestDescription,
    "imageName": imageName,
    "imagePath": imagePath
  }
  
  db.collection('suggestions').insertOne(data, (err, collection) => {
    if(err)
    {
      throw err;
    }
    
    console.log("Record Inserted");
  })

  return res.redirect('dashboard.html') //next page
})

// Add POST route for post suggestions
app.post('/post-suggestion', (req, res) => {
    const { postId, suggestion } = req.body;
    //save suggestion to the database
    res.send('Suggestion received');
});

//GET route to fetch posts for the dashboard
app.get("/fetch-posts", async (req, res) => {
    // Logic to fetch posts from the database
    const data = await Post.find({});

    res.send(data);

    //res.json([]);
});

//GET route to fetch suggestions for view
app.get("/fetch-suggestions", async (req, res) => {
  // Logic to fetch posts from the database
  const data = await Suggestion.find({});

  res.send(data);

  //res.json([]);
});

app.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'forgotPassword.html'));
});
app.get("/", (req, res) => {
  res.set({
    "Allow-Access-Allow-Origin" : '*'
  })
  
  return res.redirect("registerUser.html") //html page
}).listen(3000);

console.log("Listening on port 3000");

