const dashboardRepository = require('./admin-dashboard.repository');

const getStats = async () => {
  const [totalUsers, activeUsers, totalProducts, productsByCategory] = await Promise.all([
    dashboardRepository.countUsers(),
    dashboardRepository.countActiveUsers(),
    dashboardRepository.countProducts(),
    dashboardRepository.groupProductsByCategory(),
  ]);

  return {
    totalUsers,
    activeUsers,
    totalProducts,
    productsByCategory: productsByCategory.map(p => ({
      category: p.category,
      count: p._count.id,
    })),
  };
};

module.exports = { getStats };
