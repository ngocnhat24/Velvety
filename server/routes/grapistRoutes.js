const express = require("express");
const router = express.Router();
const grapistController = require("../controllers/grapistController");

router.post("/", grapistController.createGrapist);
router.get("/", grapistController.getAllGrapist);
router.get("/:id", grapistController.getGrapistById);
router.put("/:id", grapistController.updateGrapist);
router.delete("/:id", grapistController.deleteGrapist);

module.exports = router;
