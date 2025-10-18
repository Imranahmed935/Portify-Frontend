export const create = async (data: FormData) => {
  const blogInfo = Object.fromEntries(data.entries());

  const modifiedData = {
    ...blogInfo,
    tags: blogInfo.tags
      ? blogInfo.tags.toString().split(",").map((tag) => tag.trim())
      : [],
      authorId: 2 ,
    isFeatured: Boolean(blogInfo.isFeatured),
  };

 const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(modifiedData)
 })

 console.log(await res.json())
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`,{
//     method:"POST",
//     headers:{
//         "Content-Type":"application/json"
//     },
//     body:JSON.stringify(modifiedData)
//   });
   
//   const result = await res.json();
//   console.log(result)
//   if(result){
//     redirect("/blogs")
//   }
// return result
};