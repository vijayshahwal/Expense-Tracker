const express  = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/auth");
const { addExpense } = require("../controllers/addExpense");
const { getExpense } = require("../controllers/getExpense");
const { updateExpense } = require("../controllers/updateExpense");
const { deleteExpense } = require("../controllers/deleteExpense");

// import middlewares
const { Auth } = require("../middlewares/middleware");

//define APi routes
router.post("/login",login);
router.post("/signup",signup);

router.post("/addExpense", addExpense);
router.put("/updateExpense/:id",updateExpense);
// Auth middleware is not applied to getExpense route and deleteExpense route
// There is no problem in adding it
router.get("/getExpense",getExpense);
router.delete("/deleteExpense/:id",deleteExpense);

module.exports = router;