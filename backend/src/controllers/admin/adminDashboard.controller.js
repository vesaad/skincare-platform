const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getStats = async (req, res) => {
  try {
    const [totalUsers, activeUsers, totalProducts] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.product.count(),
    ]);

    res.json({ totalUsers, activeUsers, totalProducts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const [totalUsers, activeUsers, totalProducts, productsByCategory] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.product.count(),
      prisma.product.groupBy({
        by: ['category'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 6
      })
    ]);

    res.json({ 
      totalUsers, 
      activeUsers, 
      totalProducts,
      productsByCategory: productsByCategory.map(p => ({
        category: p.category,
        count: p._count.id
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};