/**
 * favoritesService.js
 * Favoritos persistidos no banco via Prisma.
 */
const prisma = require("../database/db");

exports.getFavorites = async (userId) => {
  const favs = await prisma.favorite.findMany({
    where: { userId: Number(userId) },
    include: { product: true },
  });
  return favs.map((f) => ({
    ...f.product,
    sizes: JSON.parse(f.product.sizes),
  }));
};

exports.toggleFavorite = async (userId, productId) => {
  const existing = await prisma.favorite.findUnique({
    where: { userId_productId: { userId: Number(userId), productId } },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return { action: "removed" };
  }

  await prisma.favorite.create({
    data: { userId: Number(userId), productId },
  });
  return { action: "added" };
};