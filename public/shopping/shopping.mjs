const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    const article = document.createElement('article');

    const img = document.createElement('img');
    img.src = product.imageSrc;
    img.alt = product.name;

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'product-details';

    const h3 = document.createElement('h3');
    h3.textContent = product.name;

    const descriptionP = document.createElement('p');
    descriptionP.textContent = product.description;

    const priceP = document.createElement('p');
    priceP.className = 'price';
    priceP.textContent = `$${product.price}`;

    const buttonDiv = document.createElement('div');
    const buyButton = document.createElement('button');
    buyButton.className = 'buy-button';
    buyButton.textContent = 'Add to cart';

    buyButton.addEventListener('click', () => {
        product.numInCart += 1;
        rerenderAllProducts();
        rerenderCart();
    });

    buttonDiv.appendChild(buyButton);

    if (product.numInCart > 0) {
        const numSpan = document.createElement('span');
        numSpan.className = 'num-in-cart';
        numSpan.textContent = `${product.numInCart} in cart`;
        buttonDiv.appendChild(numSpan);
    }

    detailsDiv.append(h3, descriptionP, priceP, buttonDiv);
    article.append(img, detailsDiv);

    return article;
}

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    /*
    1. remove all <article>s
    2. recreate them using the data in PRODUCTS
    3. modify the re-creation so it uses shouldProductBeVisible() (details are near the bottom of the lab directions)

    You can remove and recreate the heading element if it makes things easier.
     */
    const productList = document.querySelector('.product-list');
    const articles = productList.querySelectorAll('article');
    articles.forEach(article => article.remove());

    PRODUCTS.forEach(product => {
        if (shouldProductBeVisible(product)) {
            productList.appendChild(renderProductCard(product));
        }
    });
}

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    /*
    1. remove all card items
    2. recreate them and the remove buttons based off the data in PRODUCTS
     */
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';

    PRODUCTS.forEach(product => {
        if (product.numInCart > 0) {
            const p = document.createElement('p');
            p.textContent = `${product.name} x${product.numInCart}`;

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-button';
            removeButton.textContent = 'Remove';

            removeButton.addEventListener('click', () => {
                product.numInCart = Math.max(0, product.numInCart - 1);
                rerenderAllProducts();
                rerenderCart();
            });

            cartItems.append(p, removeButton);
        }
    });
}

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
    const min = minPriceInput.value ? Number.parseFloat(minPriceInput.value) : -Infinity;
    const max = maxPriceInput.value ? Number.parseFloat(maxPriceInput.value) : Infinity;
    return product.price >= min && product.price <= max;
}

minPriceInput.addEventListener('change', rerenderAllProducts);
maxPriceInput.addEventListener('change', rerenderAllProducts);

rerenderAllProducts();
rerenderCart();