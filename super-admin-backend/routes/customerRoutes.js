const express = require("express");
const {
  addCustomer,
  getCustomers,
  deleteCustomer,
} = require("../controllers/customerController");
const router = express.Router();

router.post("/", addCustomer);
router.get("/", getCustomers);
router.delete("/:id", deleteCustomer);

module.exports = router;
