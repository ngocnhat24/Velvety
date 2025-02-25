const User = require('../models/User');

// Get all customers (Admin only)
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await User.find({ roleName: "Customer" }).select('-password');
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching customers", error });
    }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await User.findOne({ _id: req.params.id, roleName: "Customer" }).select('-password');
        if (!customer) return res.status(404).json({ message: "Customer not found" });

        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: "Error fetching customer", error });
    }
};

// Update customer profile
exports.updateCustomer = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber } = req.body;
        const updatedCustomer = await User.findOneAndUpdate(
            { _id: req.params.id, roleName: "Customer" },
            { firstName, lastName, phoneNumber, updatedDate: Date.now() },
            { new: true }
        ).select('-password');

        if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });

        res.json({ message: "Customer updated successfully", customer: updatedCustomer });
    } catch (error) {
        res.status(500).json({ message: "Error updating customer", error });
    }
};

// Delete customer (Admin only)
exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await User.findOneAndDelete({ _id: req.params.id, roleName: "Customer" });
        if (!customer) return res.status(404).json({ message: "Customer not found" });

        res.json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting customer", error });
    }
};
