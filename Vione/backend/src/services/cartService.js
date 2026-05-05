/**
 * cartService.js
 * Gerencia o carrinho persistido no MySQL via Prisma.
 */
const prisma = require("../database/db");

// Função auxiliar para formatar os dados que vão para o React
function parseItem(item) {
  if (!item.product) return item;

  // 1. Converte a string JSON de tamanhos do banco em Array real
  const sizes = typeof item.product.sizes === "string" 
    ? JSON.parse(item.product.sizes) 
    : item.product.sizes;

  // 2. Transforma o array de objetos [{url: '...'}] em ['...', '...']
  // Se 'images' for undefined (erro de include), retornamos um array vazio
  const imagesArray = item.product.images 
    ? item.product.images.map(img => img.url) 
    : [];

  return {
    ...item,
    product: {
      ...item.product,
      sizes: sizes,
      images: imagesArray,
      // Criamos a propriedade imageUrl para o frontend não quebrar
      imageUrl: imagesArray.length > 0 ? imagesArray[0] : null
    },
  };
}

exports.getCart = async (userId) => {
  const cart = await prisma.cart.findFirst({
    where: { userId: Number(userId) },
    include: {
      items: {
        include: { 
          product: {
            include: { images: true } // Busca as fotos na tabela ProductImage
          } 
        },
      },
    },
  });
  
  if (!cart) return { items: [] };
  
  // Mapeia cada item do carrinho passando pela formatação do parseItem
  return { 
    ...cart, 
    items: cart.items.map(parseItem) 
  };
};

// As funções addItem, updateItem e removeItem não mudam, 
// pois elas lidam com IDs e não com a exibição de imagens.
exports.addItem = async (userId, productId, size, qty = 1) => {
  let cart = await prisma.cart.findFirst({ where: { userId: Number(userId) } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId: Number(userId) } });
  }

  const existing = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId, size },
  });

  if (existing) {
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { qty: existing.qty + Number(qty) },
    });
  }

  return prisma.cartItem.create({
    data: { cartId: cart.id, productId, size, qty: Number(qty) },
  });
};

exports.updateItem = async (itemId, qty) => {
  if (Number(qty) < 1) {
    return prisma.cartItem.delete({ where: { id: Number(itemId) } });
  }
  return prisma.cartItem.update({
    where: { id: Number(itemId) },
    data: { qty: Number(qty) },
  });
};

exports.removeItem = async (itemId) => {
  return prisma.cartItem.delete({ where: { id: Number(itemId) } });
};

exports.clearCart = async (userId) => {
  const cart = await prisma.cart.findFirst({ where: { userId: Number(userId) } });
  if (!cart) return;
  return prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
};