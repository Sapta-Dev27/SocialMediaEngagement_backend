import createPostService from "../../services/posts/createPost.js";

const createPostController = async (req, res) => {
  try {
    const { posttitle, postcontent } = req.body;
    const postUserId = req.userInfo.id_from_token

    const newPost = await createPostService(posttitle, postcontent, postUserId);
    if (newPost === null) {
      return res.status(400).json({
        success: false,
        message: "Post creation failed. Please try again."
      })
    }
    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
      postedBy: req.userInfo
    })

  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

export default createPostController