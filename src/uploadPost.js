import './App.css';
import { React, useState } from "react";

function UploadPost() 
{
  const [postImage, setPostImage] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");

  
  const handleUpload = async (e) => {
    e.preventDefault();
  }
  
  return(
    <div className="UploadPost">
    <header className="SiteName">
      <h1>StyleWish</h1>
    </header>

      <body>
        <div className="upload_post">
          <h2 id = "title">Upload Post Page</h2>
          <fieldset>
            <form action="#" method="post">

            <label id = "post_img">Upload Post Image*</label>
              
              <input
                type="file"
                name="file"
                id="postfile"
                accept="image/*"
                onChange={(e) =>
                  post_image(e) 
                }
                placeholder="Enter Upload File"
              />

            <img src = " " id="post_prev" />

            <input
                className='input-control'
                type="text"
                name="post_title"
                id="post_title"
                value={postTitle}
                onChange={(e) =>
                  setPostTitle(e.target.value)
                }
                placeholder="Enter Post Title"
              />

              <textarea
                className='input-control'
                name="post_description"
                id="post_description"
                cols="30"
                rows="20"
                onChange={(e) =>
                  setPostDescription(e.target.value)
                }
                placeholder="Add what you are looking for, the occasion, the budget, and other details."
              ></textarea>

              <button
                type="upload"
                value="Upload"
                id = "upload"
                onClick={(e) => handleUpload(e)}
              >Upload</button>
          </form>
         </fieldset>
        </div>
        </body>
      </div>
    );

  function post_image(e)
  {
    let postPic = document.getElementById("post_prev");
    setPostImage(e.target.files[0]);
    postPic.src = URL.createObjectURL(e.target.files[0]);
  }
}

export default UploadPost;
