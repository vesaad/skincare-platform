const userRepository = require('./admin-user.repository');
const { Parser } = require('json2csv');

const getAll = () => userRepository.findAll();

const toggleStatus = async (id) => {
  const userId = parseInt(id);
  const user = await userRepository.findById(userId);
  if (!user) return null;
  return userRepository.updateStatus(userId, !user.isActive);
};

const assignRole = async (id, roleId) => {
  const userId = parseInt(id);
  await userRepository.deleteRoles(userId);
  await userRepository.createRole({
    userId, roleId: parseInt(roleId), assignedAt: new Date(),
  });
};

const deleteUser = async (id) => {
  const userId = parseInt(id);
  await userRepository.deleteRoles(userId);
  await userRepository.remove(userId);
};

const exportUsers = async () => {
  const users = await userRepository.findForExport();
  const parser = new Parser();
  return parser.parse(users);
};

module.exports = { getAll, toggleStatus, assignRole, deleteUser, exportUsers };
