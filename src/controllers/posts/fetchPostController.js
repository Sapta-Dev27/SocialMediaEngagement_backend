import fetchPostServices from "../../services/posts/fetchPost.js";

const fetchPostController = async (req, res) => {
  try {
    const userid = req.userInfo.id_from_token;
    const fetchPost = await fetchPostServices(userid);
    if (fetchPost === null) {
      return res.status(404).json({
        success: false,
        message: "No posts found for this user."
      })
    }
    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts: fetchPost
    })
  }
  catch (error) {
    console.log("Error in fetchPostController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export default fetchPostController