import { prisma } from "../../lib/prisma";

export const getRecentOrders = async () => {
      return  await prisma.orders.findMany({
            select: {
                  order_id: true,
                  order_date: true,
                  total_price: true,
                  status: true,
                  users: {
                        select: {
                              username: true
                        }
                  }
            },
            orderBy: {
                  order_id: 'desc'
            },
            take: 4
      });
};

export const getDashboardSummaryCards = async () => {
      const totalOrder = await prisma.orders.aggregate({
            where: { 
                  NOT: {
                        status: 'Cancelled'
                  }
            },
            _count: { order_id: true }
      });

      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const todayOrder = await prisma.orders.aggregate({
            where: { 
                  created_at: {
                        gte: startOfDay,
                        lte: endOfDay,
                  },
                  NOT: {
                        status: 'Cancelled'
                  }
            },
            _count: { order_id: true }
      });


      const pendingOrder = await prisma.orders.aggregate({
            where: { status: 'Pending' },
            _count: { order_id: true }
      });

      const totalRevenue = await prisma.orders.aggregate({
            where: {
                  OR: [
                        { payment_method: 'Gcash' },
                        { status: 'Delivered' }
                  ]
            },
            _sum: { total_price: true }
      });

      const totalProducts = await prisma.products.aggregate({
            _count: { product_id: true }
      });

      return {
            totalOrder: totalOrder._count.order_id,
            todayOrder: todayOrder._count.order_id,
            pendingOrder: pendingOrder._count.order_id,
            totalRevenue: totalRevenue._sum.total_price,
            totalProducts: totalProducts._count.product_id
      }
};

export const getOrderStatusDistribution = async () => {
      const grouped = await prisma.orders.groupBy({
            by: ['status'],
            _count: { status: true },
      });

      const totalOrders = await prisma.orders.count();

      return grouped.map(g => ({
            order_status: g.status,
            count: g._count.status,
            percentage: totalOrders === 0 ? 0 : Math.round((g._count.status / totalOrders) * 100),
      }));
};

export const getTopSellingProducts = async () => {
      const grouped = await prisma.order_items.groupBy({
            by: ['product_id'],
            _sum: { quantity: true },
            orderBy: {
                  _sum: { quantity: 'desc' }
            },
            take: 6,
      });

      const products = await prisma.products.findMany({
            where: {
                  product_id: { in: grouped.map(g => g.product_id) }
            },
            select: {
                  product_id: true,
                  name: true,
                  price: true,
                  category: true
            }
      });

      return grouped.map(g => {
            const product = products.find(p => p.product_id === g.product_id);
            return {
                  product_id: g.product_id,
                  name: product?.name,
                  category: product?.category,
                  sold: g._sum.quantity ?? 0,
                  revenue: Number(product?.price ?? 0) * (g._sum.quantity ?? 0)
            };
      });
};

export const getTopCustomers = async () => {
      const grouped = await prisma.orders.groupBy({
            by: ['user_id'],
            _sum: { total_price: true }, // get total spent
            _count: { user_id: true }, // get total orders
            orderBy: {
                  _sum: { total_price: 'desc' }, // order by whoever have higher spent
            },
            take: 5, // get the top 5 only
      });

      // get the user info such as name
      const users = await prisma.users.findMany({
            where: {
                  user_id: { in: grouped.map(g => g.user_id) },
            },
      });

      // build fast look up map for user 
      const userMap = new Map(users.map(u => [u.user_id, u])); // create a key value pair for user so when accessing it is easy by just calling the id and it will give the name

      return grouped.map(g => {
            const user = userMap.get(g.user_id);  // return the username based on the user id
      
            return {
                  user_id: g.user_id,
                  name: user?.username,
                  totalSpent: g._sum.total_price?.toNumber() ?? 0,
                  totalOrders: g._count.user_id,
            };
      });
};