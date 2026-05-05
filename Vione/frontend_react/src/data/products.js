/**
 * products.js
 * APENAS estrutura de navegação para o sidebar.
 * Preços, tamanhos e imagens estão no banco de dados.
 */

export const CATALOG = {
  womens: {
    label: "Women's",
    subcategories: [
      { id: "dresses",   label: "Dresses"           },
      { id: "tops",      label: "Blouses & T-Shirts" },
      { id: "outerwear", label: "Coats & Jackets"   },
      { id: "blazers",   label: "Blazers"           },
      { id: "pants",     label: "Pants"             },
    ],
  },
  mens: {
    label: "Men's",
    subcategories: [
      { id: "tshirts",   label: "T-Shirts & Polos"      },
      { id: "pants",     label: "Pants & Shorts"        },
      { id: "shirts",    label: "Shirts"                },
      { id: "hoodies",   label: "Hoodies & Sweatshirts" },
      { id: "sneakers",  label: "Sneakers"              },
    ],
  },
};