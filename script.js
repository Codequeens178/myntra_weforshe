// import { products,trendyProducts } from './products.js';
const cardsContainer = document.getElementById("cards-container");
const cartItems = document.getElementById("cart-items");
const wishlistItems = document.getElementById("wishlist-items");
const notificationContainer = document.getElementById("notification-container");
const trendScoreElement = document.getElementById("trend-score");
const cartIcon = document.getElementById("cart-icon");
const wishlistIcon = document.getElementById("wishlist-icon");
const cartSidebar = document.getElementById("cart-sidebar");
const wishlistSidebar = document.getElementById("wishlist-sidebar");

const products = [
  { id: 1, name: "StyleCast Cuban Collar Mini Blazer Dress", price: "Rs.999", oldprice: "Rs.2799" , discount:"(Rs.1800 OFF)", image: "images/1.jpg" },
  { id: 2, name: "Trendyol Women Maxi Dress", price: "Rs.2092",  image: "images/2.jpg" },
  { id: 3, name: "Freakins Women Shirt Dress", price: "Rs.2099", oldprice: "Rs.3099" , discount:"(Rs.1000 OFF)", image: "images/3.jpg" },
  { id: 4, name: "BAESD Embellished Sheath Dress", price: "Rs.1291", oldprice: "Rs.7599" , discount:"(83% OFF)", image: "images/4.jpg" },
  { id: 5, name: "Van Heusen Party Dress", price: "Rs.2359", oldprice: "Rs.3999" , discount:"(41% OFF)", image: "images/5.jpg" },
  { id: 6, name: "Bodycon Midi Dress", price: "Rs.835", oldprice: "Rs.1899" , discount:"(56% OFF)", image: "images/6.jpg" },
  { id: 7, name: "Next One Parallel Trousers", price: "Rs.1199", oldprice: "Rs.2999" , discount:"(60% OFF)", image: "images/7.jpg" },
  { id: 8, name: "Dressberry Heeled Pumps", price: "Rs.1019", oldprice: "Rs.2999" , discount:"(66% OFF)", image: "images/8.jpg" },
  { id: 9, name: "M&H Black Block Heels", price: "Rs.899", oldprice: "Rs.2999" , discount:"(70% OFF)", image: "images/9.jpg" },
  { id: 10, name: "Chemistry Mini Dress", price: "Rs.799", image: "images/10.jpg" },
];

const trendyProducts = [2, 3, 5, 8];

let isDragging = false;
let startX, currentX;
let currentCardIndex = 0;
let currentCard;
let trendScore = 0;
let swipingAllowed = true;
let cart = [];
let wishlist = [];
function createProductCard(product, index) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.style.zIndex = products.length - index;
  card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div>
            <h2>${product.name}</h2>
            <p>${product.price}</p>
        </div>
    `;
  return card;
}

function initializeCards() {
  products.forEach((product, index) => {
    const card = createProductCard(product, index);
    cardsContainer.appendChild(card);
  });
  updateCardPositions();
}

function updateCardPositions() {
  Array.from(cardsContainer.children).forEach((card, index) => {
    card.style.transition = "transform 0.3s ease-out";
    card.style.transform = `translateY(${index * 10}px) scale(${
      1 - index * 0.05
    })`;
    card.style.zIndex = products.length - index;
  });
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notificationContainer.appendChild(notification);

  // Trigger reflow
  notification.offsetHeight;

  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notificationContainer.removeChild(notification);
    }, 500);
  }, 3000);
}

function addToCart(product) {
  // const li = document.createElement('li');
  // li.textContent = `${product.name} - $${product.price.toFixed(2)}`;
  // cartItems.appendChild(li);
  cart.push(product);
  console.log("cart: ", cart);
  // showNotification(`${product.name} added to cart!`);
}

// adding to wishlist
function addToWishlist(product) {
  wishlist.push(product);
  console.log("wishlist: ", wishlist);
  // const li = document.createElement('li');
  // li.textContent = `${product.name} - $${product.price.toFixed(2)}`;
  // wishlistItems.appendChild(li);
  // showNotification(`${product.name} added to wishlist!`);
}

function showTrendyProductPrompt(product) {
  swipingAllowed = false;
  cardsContainer.style.cursor = "not-allowed";

  const sideContainer = document.getElementById("side-container");
  const defaultMessage = document.getElementById("default-message");

  // Remove the default message
  if (defaultMessage) {
    sideContainer.removeChild(defaultMessage);
  }

  // Clear any existing content
  sideContainer.innerHTML = "";

  // Create and append the prompt content
  const promptContent = document.createElement("div");
  promptContent.innerHTML = `
        <div class="side-window-text" style="font-size:60px">It's a</div>
        <div class="side-window-text" style="font-size:80px">MAtCH</div>
        <button id="yes-button" class="prompt-button" style="font-size:20px">Add Item to Cart</button>
        <button id="no-button" class ="prompt-button" style="font-size:20px">Add Item to Wishlist</button>
    `;
  sideContainer.appendChild(promptContent);

  // Add event listeners to the buttons
  sideContainer.querySelector("#yes-button").addEventListener("click", () => {
    handleTrendyProductResponse(product, true);
  });

  sideContainer.querySelector("#no-button").addEventListener("click", () => {
    handleTrendyProductResponse(product, false);
  });
}

function handleTrendyProductResponse(product, add) {
  const sideContainer = document.getElementById("side-container");

  if (add) {
    addToCart(product);
    sideContainer.innerHTML = `<h2>Item added to cart</h2>`;
    setTimeout(resetSideContainer, 2000); // Reset after 2 seconds
  } else {
    addToWishlist(product);
    sideContainer.innerHTML = `<div>Item added to wishlist</div>`;
    setTimeout(resetSideContainer, 2000); // Reset after
  }
  swipingAllowed = true;
  cardsContainer.style.cursor = "";
}

function resetSideContainer() {
  const sideContainer = document.getElementById("side-container");
  sideContainer.innerHTML = '<div id="default-message">Keep Swiping</div>';
  swipingAllowed = true;
  cardsContainer.style.cursor = "";
}

function updateTrendScore() {
  trendScore += 5;
  trendScoreElement.textContent = trendScore;
}

function toggleSidebar(sidebar) {
  if (sidebar) {
    sidebar.classList.toggle("open");
  }
}

function closeSidebars() {
  if (cartSidebar) cartSidebar.classList.remove("open");
  if (wishlistSidebar) wishlistSidebar.classList.remove("open");
}

function startDrag(e) {
  if (!swipingAllowed || currentCardIndex >= products.length) return;
  isDragging = true;
  startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  currentCard = cardsContainer.children[0];
  currentCard.style.transition = "none";
}

function drag(e) {
  if (!swipingAllowed || !isDragging) return;
  e.preventDefault();
  currentX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  const diffX = currentX - startX;
  const swipePercentage = (diffX / currentCard.offsetWidth) * 100;
  const rotation = swipePercentage / 10;

  requestAnimationFrame(() => {
    currentCard.style.transform = `translateX(${diffX}px) rotate(${rotation}deg)`;
    currentCard.style.opacity = 1 - Math.abs(swipePercentage) / 100;
  });
}

function endDrag() {
  if (!swipingAllowed || !isDragging) return;
  isDragging = false;
  const diffX = currentX - startX;
  const swipePercentage = (diffX / currentCard.offsetWidth) * 100;

  if (Math.abs(swipePercentage) > 25) {
    swipeAnimation(swipePercentage > 0 ? "right" : "left");
  } else {
    resetCardPosition();
  }
}

function resetCardPosition() {
  currentCard.style.transition = "transform 0.3s ease, opacity 0.3s ease";
  currentCard.style.transform = "translateX(0) rotate(0deg)";
  currentCard.style.opacity = 1;
}

function showFinalMessage() {
  const sideContainer = document.getElementById("side-container");
  const cardsContainer = document.getElementById("cards-container");

  // Hide the cards container
  cardsContainer.style.display = "none";

  // Style the side container to appear at the center
  sideContainer.style.position = "absolute";
  sideContainer.style.left = "50%";
  sideContainer.style.top = "50%";
  sideContainer.style.transform = "translate(-50%, -50%)";
  sideContainer.style.textAlign = "center";

  // Set the final message
  sideContainer.innerHTML = `
        <h2>Done for today! 😊</h2>
        <p>Thanks for shopping with us!</p>
    `;
}

function swipeAnimation(direction) {
  const transitionDuration = "0.5s";
  const translateDistance = "150%";
  const rotationAngle = "30deg";

  currentCard.style.transition = `transform ${transitionDuration} ease, opacity ${transitionDuration} ease`;

  let transformValue =
    direction === "right"
      ? `translateX(${translateDistance}) rotate(${rotationAngle})`
      : `translateX(-${translateDistance}) rotate(-${rotationAngle})`;

  currentCard.style.transform = transformValue;
  currentCard.style.opacity = 0;

  setTimeout(() => {

    const sideContainer = document.getElementById("side-container");        
    if (direction === "right" && currentCardIndex < products.length) {
      try {
        const productToAdd = products[currentCardIndex];
        if (trendyProducts.includes(productToAdd.id)) {
          updateTrendScore();
          showTrendyProductPrompt(productToAdd);
        } else {
          addToWishlist(productToAdd);
          sideContainer.innerHTML = `
        <div class="side-window-text" style="font-size:60px">It's not a</div>
        <div class="side-window-text" style="font-size:80px"> MAtCH</div>
        <div style="font-size:38px ; margin-top:70px" >ITEM ADDED TO WISHLIST!!!</div>`;
        //   resetSideContainer();
        }
      } catch (error) {
        console.error("Failed to add product to cart:", error);
      }
    } else {
      resetSideContainer();
    }

    cardsContainer.removeChild(currentCard);
    currentCardIndex++;

    if (currentCardIndex >= products.length) {
      // showNotification('No more products to show!');
      showFinalMessage();
    } else {
      updateCardPositions();
    }
  }, 500);
}

// Event listeners
cardsContainer.addEventListener("mousedown", startDrag);
cardsContainer.addEventListener("mousemove", drag);
cardsContainer.addEventListener("mouseup", endDrag);
cardsContainer.addEventListener("mouseleave", endDrag);

cardsContainer.addEventListener("touchstart", startDrag);
cardsContainer.addEventListener("touchmove", drag);
cardsContainer.addEventListener("touchend", endDrag);
cartIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleSidebar(cartSidebar);
  if (wishlistSidebar) wishlistSidebar.classList.remove("open");
});

wishlistIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleSidebar(wishlistSidebar);
  if (cartSidebar) cartSidebar.classList.remove("open");
});

document.addEventListener("click", (e) => {
  if (
    cartSidebar &&
    wishlistSidebar &&
    !cartSidebar.contains(e.target) &&
    !wishlistSidebar.contains(e.target)
  ) {
    closeSidebars();
  }
});

// Initialize cards
initializeCards();
