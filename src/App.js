import './App.css';
import { React, useState } from "react";

function App() 
{
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [about, setAbout] = useState("");
  const [country, setCountry] = useState("");
  const [style, setStyle] = useState("");

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

              <label id = "countryLabel">Country*</label>
              
              <input
                className='input-control'
                type="text"
                name="country"
                id="country"
                value={country}
                onChange={(e) =>
                  setCountry(e.target.value)
                }
                placeholder="Enter Your Country"
              />

              <label id = "styleLabel">Style</label>
              
              <select id = "selectStyle" onChange={(e) => setStyle(e.target.value)}>
                <option>Classy</option>
                <option>Chic</option>
                <option>Casual</option>
                <option>Trendy</option>
                <option>Sporty</option>
              </select>
              </form>
          </fieldset>
        </div>
      </body>
    </div>
  );

 function profile_image(e)
  {
    let profilePic = document.getElementById("preview");
    setProfileImage(e.target.files[0]);
    profilePic.src = URL.createObjectURL(e.target.files[0]);
  }

  function validateInputs()
  {
    const input_list = document.getElementsByClassName('input-control');

    for(var i = 0; i < input_list.length; i++)
    {
      if(input_list[i].value.trim() === "")
      {
        return false;
      }
    }

    return true;
  }
}

export default App;
