const express = require("express");
const router = express.Router();
const { getMenu, addMenuItem } = require("../controllers/menuController");

router.get("/", getMenu);
router.post("/add", addMenuItem);

module.exports = router;
