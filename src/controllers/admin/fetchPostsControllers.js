import fetchPostsAdminService from "../../services/admin/fetchPosts.js";

const fetchPostsAdminController = async (req, res) => {
  try {
    const posts = await fetchPostsAdminService();
    if (posts === null) {
      return res.status(404).json({
        sucess: false,
        message: "No posts found."
      })
    }
    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts_from_db: posts
    })
  }
  catch (error) {
    console.log("Error in fetchPostsAdminController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export default fetchPostsAdminController