import './App.css';
import { React, useState } from "react";

function UploadPost() 
{
  const [postImage, setPostImage] = useState("");
  const [postTitle, setPostTitle] = useState("");

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
          </form>
         </fieldset>
        </div>
        </body>
      </div>
    );
}

export default UploadPost;
