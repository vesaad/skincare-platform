const userService = require('./admin-user.service');

exports.getAll = async (req, res) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleStatus = async (req, res) => {
  try {
    const updated = await userService.toggleStatus(req.params.id);
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Status updated', isActive: updated.isActive });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.assignRole = async (req, res) => {
  try {
    const { roleId } = req.body;
    await userService.assignRole(req.params.id, roleId);
    res.json({ message: 'Role assigned successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.exportUsers = async (req, res) => {
  try {
    const csv = await userService.exportUsers();
    res.header('Content-Type', 'text/csv');
    res.attachment('users.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
