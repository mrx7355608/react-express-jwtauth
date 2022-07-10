const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const protectRoute = require("../middlewares/protectRoute");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/change-password", protectRoute, authController.updatePassword);

module.exports = router;
