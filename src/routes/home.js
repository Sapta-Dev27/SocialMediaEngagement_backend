import authMiddleware from "../middleware/auth.js";
import express from 'express';

import createPostController from "../controllers/posts/createPostController.js";
import fetchPostController from "../controllers/posts/fetchPostController.js";
import updatePostController from "../controllers/posts/updatePostController.js";
import deletePostController from "../controllers/posts/deletePostController.js";

import createCommentController from "../controllers/comments/createCommentController.js";
import fetchCommentsByUserController from "../controllers/comments/fetchCommentControllerByUser.js";
import fetchCommentsByPostController from "../controllers/comments/fetchCommentsFromPostController.js";
import updateCommentController from "../controllers/comments/updateCommentController.js"
import deleteCommentController from "../controllers/comments/deleteCommentController.js";

const router = express.Router();

router.get('/me', authMiddleware, (req, res) => {
  const { username_from_token, id_from_token, useremail_from_token, userrole_from_token } = req.userInfo;
  return res.status(200).json({
    success: true,
    message: "Welcome to the home page",
    user: {
      id_from_token,
      username_from_token,
      useremail_from_token,
      userrole_from_token
    }
  })
})

router.post('/me/createpost', authMiddleware, createPostController);
router.get('/me/fetchposts', authMiddleware, fetchPostController);
router.put('/me/updatepost/:id', authMiddleware, updatePostController);
router.delete('/me/deletepost/:id', authMiddleware, deletePostController);

router.post('/me/commentpost/:id', authMiddleware, createCommentController);
router.get('/me/mycomments', authMiddleware, fetchCommentsByUserController);
router.get('/me/comments/post/:id', authMiddleware, fetchCommentsByPostController);
router.put('/me/updatecomment/:id', authMiddleware, updateCommentController);
router.delete('/me/deletecomment/:id' , authMiddleware , deleteCommentController)

export default router;