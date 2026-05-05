const prisma = require("../database/db");

function parseProduct(p) {
  return {
    ...p,
    sizes: JSON.parse(p.sizes),
    // imagem principal = position 0; fallback para a primeira disponível
    imageUrl: p.images?.find(i => i.position === 0)?.url
           || p.images?.[0]?.url
           || null,
    images: p.images
      ?.sort((a, b) => a.position - b.position)
      .map(i => i.url) || [],
  };
}

const includeImages = { images: { orderBy: { position: "asc" } } };

exports.getAll = async () => {
  const products = await prisma.product.findMany({
    include: includeImages,
    orderBy: { createdAt: "desc" },
  });
  return products.map(parseProduct);
};

exports.getByCategory = async (category) => {
  const products = await prisma.product.findMany({
    where: { category },
    include: includeImages,
    orderBy: { createdAt: "desc" },
  });
  return products.map(parseProduct);
};

exports.getBySubcategory = async (category, subcategory) => {
  const products = await prisma.product.findMany({
    where: { category, subcategory },
    include: includeImages,
    orderBy: { createdAt: "desc" },
  });
  return products.map(parseProduct);
};

exports.getById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: includeImages,
  });
  if (!product) return null;
  return parseProduct(product);
};