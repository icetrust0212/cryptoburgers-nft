
const {apiController} = require("../controllers");
const Router = require('express').Router;
const router = new Router();

router.get(
    "/metadata/:id",
    apiController.getMetadata
);
router.get(
    "/tokens",
    apiController.getBurgers
)

module.exports = router;