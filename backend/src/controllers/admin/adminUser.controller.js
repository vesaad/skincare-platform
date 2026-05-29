const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { Parser } = require('json2csv');

exports.getAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        userRoles: { include: { role: true } }
      },
      omit: { passwordHash: true }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleStatus = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const updated = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { isActive: !user.isActive }
    });
    res.json({ message: 'Status updated', isActive: updated.isActive });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.assignRole = async (req, res) => {
  try {
    const { roleId } = req.body;
    const userId = parseInt(req.params.id);

    // Fshi rolet ekzistuese
    await prisma.userRole.deleteMany({ where: { userId } });

    // Cakto rolin e ri
    await prisma.userRole.create({
      data: { userId, roleId: parseInt(roleId), assignedAt: new Date() }
    });

    res.json({ message: 'Role assigned successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await prisma.userRole.deleteMany({ where: { userId: parseInt(req.params.id) } });
    await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.exportUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, firstName: true, lastName: true, email: true, isActive: true, createdAt: true }
    });
    const parser = new Parser();
    const csv = parser.parse(users);
    res.header('Content-Type', 'text/csv');
    res.attachment('users.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};