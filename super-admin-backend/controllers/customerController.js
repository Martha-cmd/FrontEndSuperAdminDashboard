const Customer = require("../models/Customer");

exports.addCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existing = await Customer.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "Customer already exists" });
    }

    const customer = await Customer.create({ firstName, lastName, email });

    res.status(201).json({
      msg: "Customer added successfully",
      customer,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);
    res.json({ msg: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
