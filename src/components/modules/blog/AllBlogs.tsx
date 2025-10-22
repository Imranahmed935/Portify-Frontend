// "use client";
// import { useEffect, useState } from "react";
// import BlogCard from "./BlogCard";
// // 
// const AllBlogs = () => {
//     const [blogs, setBlogs] =useState([])

//   const blogData = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/v1/blog", {
//         cache: "no-store",
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to fetch blogs, status: ${res.status}`);
//       }

//       const data = await res.json();
//       console.log("Fetched blogs:", data.data);
//       setBlogs(data.data);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//   };

//   useEffect(() => {
//     blogData();
//   }, []);

//   return (
//     <div className="">
//       {
//         blogs?.map(blog =><BlogCard key={blog.id} blog={blog}></BlogCard>)
//       }
//     </div>
//   );
// };

// export default AllBlogs;
