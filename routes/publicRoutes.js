const router = require("express").Router();
const { home } = require("../controllers/publicController");

router.get("/", home);


module.exports = router;