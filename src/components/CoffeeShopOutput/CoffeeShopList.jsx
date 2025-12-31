// import React, { useState } from 'react'
// import axios from 'axios'

// const CoffeeShopList = () => {

//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [responseMessage, setResponseMessage] = useState("");

//   const handleSumbit = (event) => {
//     event.preventDefault();

//     const newPost = {
//       title,
//       body,
//     };

    
//     axios
//       .post("/api/CoffeeShop/FindClosestCoffeeshops/FindClosestCoffeeshops", newPost)
//       .then(() => {
//         setResponseMessage("Post created successfully!");
//       })
//       .catch(() => {
//         setResponseMessage("Error creating post");
//       })
//   };

//   return (
//     <div>
//       <h2>Create New Post</h2>
//       <form onSubmit={handleSumbit}>
//         <input 
//           type='text'
//           placeholder='Post Title'
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea 
//           placeholder='Post Body'
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//         />
//         <button type="sumbit">Create Post</button>
//       </form>
//       {responseMessage && <p>{responseMessage}</p>}
//     </div>
//   )
// }

// export default CoffeeShopList