const express = require("express")
const router = express.Router()
const forumController = require("../controllers/forumControllers")

router.route("/").get(forumController.getUsers)
