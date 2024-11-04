const router = require("express").Router();
const { userRegister } = require("../controllers/users/userRegister");
const { userLogin } = require("../controllers/users/userLogin");
const { userIsLoggedIn } = require("../middleware/users/userIsLoggedIn");
const { verifyToken } = require("../controllers/users/verifyToken");
const {userNote} = require('../controllers/users/userNote')

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/verify-token", verifyToken)
router.post ('/notes', userIsLoggedIn, userNote )



module.exports = router;