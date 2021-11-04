
const {apiController} = require("../controllers");
const Router = require('express').Router;
const router = new Router();

router.get(
    "/getMetadata/:id",
    apiController.getMetadata
);

module.exports = router;