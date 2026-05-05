const { PrismaClient } = require("@prisma/client");
//const uuidv4 = require("uuid").v4;
const prisma = new PrismaClient();

const products = [

  // ══════════════════════════════════════════
  // WOMEN'S › DRESSES
  // ══════════════════════════════════════════
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "Black Short Dress",
    category: "womens", subcategory: "dresses",
    originalPrice: 159.90, price: 39.90, discount: 75,
    sizes: JSON.stringify(["XS","S","M","L"]),
    description: "Soft cotton short dress, perfect for everyday wear.",
    images: [
      { url: "/products/womens_clothing/dress/dress01.jpg", position: 0 },
    ],
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "Glitter Party Dress",
    category: "womens", subcategory: "dresses",
    originalPrice: 329.90, price: 199.90, discount: 39,
    sizes: JSON.stringify(["XS","S","M","L","XL"]),
    description: "Stunning glitter party dress, made to shine on special occasions.",
    images: [
      { url: "/products/womens_clothing/dress/dress11.jpg", position: 0 },
      { url: "/products/womens_clothing/dress/dress12.jpg", position: 1 },
    ],
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    name: "Black Night Dress with Straps",
    category: "womens", subcategory: "dresses",
    originalPrice: 189.90, price: 129.90, discount: 32,
    sizes: JSON.stringify(["XS","S","M","L","XL"]),
    description: "Black strap dress, perfect for special nights.",
    images: [
      { url: "/products/womens_clothing/dress/dress31.jpg", position: 0 },
    ],
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    name: "Navy Blue Elegant Dress",
    category: "womens", subcategory: "dresses",
    originalPrice: 249.90, price: 199.90, discount: 20,
    sizes: JSON.stringify(["XS","S","M","L","XL"]),
    description: "Elegant navy blue dress with a sophisticated, refined fabric.",
    images: [
      { url: "/products/womens_clothing/dress/dress21.jpg", position: 0 },
    ],
  },

  // ══════════════════════════════════════════
  // WOMEN'S › TOPS
  // ══════════════════════════════════════════
  {
    id: "55555555-5555-5555-5555-555555555555",
    name: "Elegant Ruffled Blouse",
    category: "womens", subcategory: "tops",
    originalPrice: 89.90, price: 59.90, discount: 33,
    sizes: JSON.stringify(["XS","S","M","L"]),
    description: "Elegant ruffled blouse, feminine and sophisticated.",
    images: [
      { url: "/products/womens_clothing/blouse/red_blouse21.jpg",   position: 0 },
      { url: "/products/womens_clothing/blouse/black_blouse23.jpg", position: 1 },
      { url: "/products/womens_clothing/blouse/white_blouse22.jpg", position: 2 },
    ],
  },
  {
    id: "66666666-6666-6666-6666-666666666666",
    name: "Off-Shoulder Blouse",
    category: "womens", subcategory: "tops",
    originalPrice: 69.90, price: 44.90, discount: 36,
    sizes: JSON.stringify(["XS","S","M","L","XL"]),
    description: "Off-shoulder blouse, a versatile piece for any outfit.",
    images: [
      { url: "/products/womens_clothing/blouse/brown_blouse02.jpg", position: 0 },
      { url: "/products/womens_clothing/blouse/red_blouse01.jpg",  position: 1 },
    ],
  },
  {
    id: "77777777-7777-7777-7777-777777777777",
    name: "High Neck Blouse",
    category: "womens", subcategory: "tops",
    originalPrice: 129.90, price: 89.90, discount: 31,
    sizes: JSON.stringify(["XS","S","M","L"]),
    description: "High neck blouse, delicate and feminine.",
    images: [
      { url: "/products/womens_clothing/blouse/blue_blouse12.jpg",  position: 0 },
      { url: "/products/womens_clothing/blouse/white_blouse11.jpg", position: 1 },
    ],
  },

  // ══════════════════════════════════════════
  // MEN'S › PANTS
  // ══════════════════════════════════════════
  {
    id: "88888888-8888-8888-8888-888888888888",
    name: "Brown Chino Pants",
    category: "mens", subcategory: "pants",
    originalPrice: 139.90, price: 89.90, discount: 36,
    sizes: JSON.stringify(["XS","S","M","L","XL"]),
    description: "Versatile brown chino pants, suitable for different occasions.",
    images: [
      { url: "/products/mens_clothing/pants/brown_pant.jpg", position: 0 },
    ],
  },
  {
    id: "99999999-9999-9999-9999-999999999999",
    name: "Gray Jogger Pants",
    category: "mens", subcategory: "pants",
    originalPrice: 159.90, price: 109.90, discount: 31,
    sizes: JSON.stringify(["XS","S","M","L","XL","XXL"]),
    description: "Comfortable gray jogger pants, perfect for everyday wear.",
    images: [
      { url: "/products/mens_clothing/pants/gray_pant.jpg", position: 0 },
    ],
  },
  {
    id: "10101010-1010-1010-1010-101010101010",
    name: "White Classic Pants",
    category: "mens", subcategory: "pants",
    originalPrice: 149.90, price: 99.90, discount: 33,
    sizes: JSON.stringify(["XS","S","M","L","XL"]),
    description: "Clean white classic pants, elegant and versatile.",
    images: [
      { url: "/products/mens_clothing/pants/white_pant.jpg", position: 0 },
    ],
  },

  // ══════════════════════════════════════════
  // MEN'S › SNEAKERS
  // ══════════════════════════════════════════
  {
    id: "11111111-1111-1111-1111-111111111112",
    name: "White Sneakers",
    category: "mens", subcategory: "sneakers",
    originalPrice: 299.90, price: 199.90, discount: 33,
    sizes: JSON.stringify(["38","39","40","41","42","43","44"]),
    description: "Clean white sneakers, a classic essential for any wardrobe.",
    images: [
      { url: "/products/mens_clothing/sneakers/white_shoes.jpg", position: 0 },
    ],
  },
  {
    id: "11111111-1111-1111-1111-111111111113",
    name: "Black Sneakers",
    category: "mens", subcategory: "sneakers",
    originalPrice: 319.90, price: 219.90, discount: 31,
    sizes: JSON.stringify(["38","39","40","41","42","43","44"]),
    description: "Sleek black sneakers, versatile for casual and semi-formal looks.",
    images: [
      { url: "/products/mens_clothing/sneakers/black_shoes.jpg", position: 0 },
    ],
  },
];

async function main() {
  console.log("Starting safe seed with id...");

  for (const { images, ...productData } of products) {
    await prisma.product.upsert({
      where: { id: productData.id }, // usa o id fixo definido no array
      update: {
        ...productData,
        images: {
          deleteMany: {},
          create: images,
        },
      },
      create: {
        ...productData,
        images: { create: images },
      },
    });
 }

  console.log(`${products.length} products upserted successfully!`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());