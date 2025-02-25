exports.getAllUsers = (req, res) => {
    res.json({ message: "List of all users (admin-only)" });
  };
  
  exports.deleteUser = (req, res) => {
    res.json({ message: `User ${req.params.id} deleted` });
  };
  