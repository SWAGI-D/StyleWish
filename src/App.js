import './App.css';
import { React, useState } from "react";

function App() 
{
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [about, setAbout] = useState("");

   return (
    <div className="CreateProfile">
      <header className="SiteName">
        <h1>StyleWish</h1>
      </header>
      
      <body>
        <div className="form_profile">
          <h2>Create Profile Page</h2>
          <fieldset>
            <form action="#" method="get">
              <label id="fname">First Name*</label>
              
              <input
                className='input-control'
                type="text"
                name="firstname"
                id="firstname"
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
                placeholder="Enter First Name"
              />
              
              <label id = "lname" className='firstSet'>Last Name*</label>
              
              <input
                className='input-control'
                type="text"
                name="lastname"
                id="lastname"
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value)
                }
                placeholder="Enter Last Name"
              />

                  <label id = "prof">Upload Profile Image</label>
              
              <input
                type="file"
                name="file"
                id="file"
                accept="image/*"
                onChange={(e) =>
                  profile_image(e) 
                }
                placeholder="Enter Upload File"
              />
              
              <label id = "bio">Bio*</label>
              
              <textarea
                className='input-control'
                name="about"
                id="about"
                cols="30"
                rows="10"
                onChange={(e) =>
                  setAbout(e.target.value)
                }
                placeholder="Your personal style statement"
              ></textarea>
              
              <img src = " " id="preview" />
              </form>
          </fieldset>
        </div>
      </body>
    </div>
  );
}

export default App;
