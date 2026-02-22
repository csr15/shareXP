const express = require("express");
const router = express.Router();

//controller
const authActions = require("../contollers/auth");

//Username validation
router.post(`/checkUserName/:userName`, authActions.userName);

//Mail validation
router.post("/mailValidation/:mail", authActions.mailValidation);

//Singup
router.post(`/signup`, authActions.signup);

//Signin
router.post(`/signin`, authActions.signin);

//Signin using google
router.post(`/googleAuth`, authActions.googleAuth);

//check auth state an return token
router.get(`/checkAuth`, authActions.checkAuth);

//Delete an account
router.delete("/deleteAccount/:uid", authActions.deleteAccount);

module.exports = router;
