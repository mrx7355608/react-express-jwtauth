const router = require("express").Router();
const userController = require("../controllers/user.controller");
const protectRoute = require("../middlewares/protectRoute");

router.post("/delete-user", protectRoute, userController.deleteUser);
router.get("/user", protectRoute, userController.getUser);

module.exports = router;
