const products = [
  {
    name: 'Sony PlayStation 5',
    url: 'images/playstation_5.png',
    category: 'games',
    price: 499.99,
    //description: "The latest gaming console from Sony with advanced graphics and performance."
  },

  {
    name: 'SamSung Galaxy',
    url: 'images/samsung_galaxy.png',
    category: 'smartphones',
    price: 399.99,
    //description: "A high-end smartphone with a large display and powerful features."
  },

  {
    name: 'Cannon EQS Camera',
    url: 'images/cannon_eos_camera.png',
    category: 'cameras',
    price: 799.99,
    //description: "A versatile camera with excellent image quality and features."
  },

  {
    name: 'Sony A7 Camera',
    url: 'images/sony_a7_camera.png',
    category: 'cameras',
    price: 1999.99,
    //description: "A professional-grade camera with advanced features for photography enthusiasts."
  },

  {
    name: 'LG TV 55 inch',
    url: 'images/lg_tv.png',
    category: 'televisions',
    price: 799.99,
    //description: "A 55-inch 4K UHD TV with smart features and stunning picture quality."
  },

  {
    name: 'Nintendo Switch',
    url: 'images/nintendo_switch.png',
    category: 'games',
    price: 299.99,
    //description: "A versatile gaming console that can be used at home or on the go."
  },

  {
    name: 'Xbox Series X',
    url: 'images/xbox_series_x.png',
    category: 'games',
    price: 499.99,
    //description: "The latest gaming console from Microsoft with powerful performance and graphics."
  },

  {
    name: 'Samsung TV 65 inch',
    url: 'images/samsung_tv.png',
    category: 'televisions',
    price: 1099.99,
    //description: "A 65-inch 4K UHD TV with smart features and vibrant picture quality."
  },

  {
    name: 'Google Pixel',
    url: 'images/google_pixel.png',
    category: 'smartphones',
    price: 499.99,
    //description: "A smartphone with a clean Android experience and excellent camera capabilities."
  },
  {
    name: 'Sony ZV1F Camera',
    url: 'images/sony_zv1f_camera.png',
    category: 'cameras',
    price: 799.99,
    //description: "A compact camera designed for vloggers with advanced video features."
  },

  {
    name: 'Toshiba 4K TV',
    url: 'images/toshiba_tv.png',
    category: 'televisions',
    price: 499.99,
    //description: "A 4K UHD TV with smart features and excellent picture quality."
  },

  {
    name: 'iPhone 14',
    url: 'images/iphone_14.png',
    category: 'smartphones',
    price: 999.99,
    //description: "The latest iPhone with advanced features and a stunning display."
  },
];

//Select Dom Element

const productsWrapper = document.getElementById('products-wrapper');
const checkboxes = document.querySelectorAll('.check');
const filtersContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const cartCount = document.getElementById('cart-count');

// Initialize cart count
let cartItemCount = 0;

//initialize products array
const productElements = [];

//Loop over products and create product elements
products.forEach((product) => {
  const productElement = createProductElement(product);

  productElements.push(productElement);
  productsWrapper.appendChild(productElement);
});

//Event listeners for flters and search
filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

//Create product element function
function createProductElement(product) {
  const productElement = document.createElement('div');
  productElement.className = 'item space-y-2';
  productElement.innerHTML = `
  <div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl">
    <img src="${product.url}" alt="${
    product.name
  }" class="w-full h-full object-cover">
       <button class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full group-hover:translate-y-0">
       Add to Cart
       </button>
       <p class="text-xl">${product.name}</p>
       <strong>$${product.price.toLocaleString()}</strong>
        `;
  productElement.querySelector('.status').addEventListener('click', updateCart);
  return productElement;
}

//Update cart function
function updateCart(e) {
  const statusElement = e.target;
  if (statusElement.classList.contains('added')) {
    statusElement.classList.remove('added');
    statusElement.innerHTML = 'Add to Cart';
    statusElement.classList.remove('bg-red-600');
    statusElement.classList.add('bg-gray-800');
    //Remove from cart
    cartItemCount--;
  } else {
    //Add to cart
    statusElement.classList.add('added');
    statusElement.innerHTML = 'Remove From Cart';
    statusElement.classList.remove('bg-gray-800');
    statusElement.classList.add('bg-red-600');
    cartItemCount++;
  }

  //Update cart count
  cartCount.innerHTML = cartItemCount.toString();
}

function filterProducts() {
  //Get search Term
  const searchTerm = searchInput.value.trim().toLowerCase();

  //Get Checked Categories
  const checkedCategories = Array.from(checkboxes)
    .filter((check) => check.checked)
    .map((check) => check.id);

  //Loop over products and check matches
  productElements.forEach((productElement, index) => {
    const product = products[index];

    // Check if product matches search term or checked categories
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
    const isInCheckedCategory =
      checkedCategories.length === 0 ||
      checkedCategories.includes(product.category);

    //Show or hide product based on matches

    if (matchesSearchTerm && isInCheckedCategory) {
      productElement.classList.remove('hidden');
    } else {
      productElement.classList.add('hidden');
    }
  });
}
