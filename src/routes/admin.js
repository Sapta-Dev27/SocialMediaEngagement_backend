import authMiddleware from "../middleware/auth.js";
import express from 'express';
import adminMiddleware from "../middleware/admin.js";

import fetchUsersControllers from "../controllers/admin/fetchUsersControllers.js";
import fetchPostsAdminController from "../controllers/admin/fetchPostsControllers.js";
import fetchCommentAdminController from "../controllers/admin/fetchCommentController.js";

import updateAdminServiceController from "../controllers/admin/updateAdmin.js";

const router = express.Router();

router.get('/me', authMiddleware, adminMiddleware, (req, res) => {
  const { username_from_token, id_from_token, useremail_from_token, userrole_from_token } = req.userInfo;
  return res.status(200).json({
    success: true,
    message: "Welcome to the admin page",
    user: {
      id_from_token,
      username_from_token,
      useremail_from_token,
      userrole_from_token
    }
  })
})

router.get('/me/fetchusers', authMiddleware, adminMiddleware, fetchUsersControllers);
router.get('/me/fetchposts', authMiddleware, adminMiddleware, fetchPostsAdminController);
router.get('/me/fetchcomments', authMiddleware, adminMiddleware, fetchCommentAdminController);
router.put('/me/updateuser/:id', authMiddleware, adminMiddleware, updateAdminServiceController)

export default router;