function setCartLocalStorage(cartItems) {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
function getCartLocalStorage() {
  const cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
}

function cartDisplay() {
  const cartItems = getCartLocalStorage();
  const cartItemsList = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const totalAmountElement = document.getElementById("total-amount");
  const priceSumElement = document.querySelector(".price-sum");
  cartItemsList.innerHTML = ""; // Clear the current list

  let totalPrice = 0;
  let totalAmount = 0;

  if (cartItems.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.classList.add("white");
    emptyMessage.textContent = "Your cart is empty.";
    cartItemsList.appendChild(emptyMessage);
    priceSumElement.style.display = "none"; // Hide the total price element
  } else {
    priceSumElement.style.display = "flex"; // Show the total price element
    cartItems.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.classList.add("cart-item");

      // Create left part of cart item
      const cartItemLeft = document.createElement("div");
      cartItemLeft.classList.add("cart-item-left");

      const cartItemImg = document.createElement("img");
      cartItemImg.src = item.image;
      cartItemImg.alt = "";
      cartItemImg.classList.add("cart-item-img");

      const cartItemDetails = document.createElement("div");
      cartItemDetails.classList.add("cart-item-details");

      const cartItemTitle = document.createElement("div");
      cartItemTitle.classList.add("cart-item-title");
      cartItemTitle.textContent = item.name;

      const cartItemPrice = document.createElement("div");
      cartItemPrice.classList.add("cart-item-price");
      cartItemPrice.textContent = `${item.price} SEK`;

      cartItemDetails.appendChild(cartItemTitle);
      cartItemDetails.appendChild(cartItemPrice);

      cartItemLeft.appendChild(cartItemImg);
      cartItemLeft.appendChild(cartItemDetails);

      // Create right part of cart item (quantity and remove buttons)
      const cartItemRight = document.createElement("div");
      cartItemRight.classList.add("cart-item-right");

      const quantityControls = document.createElement("div");
      quantityControls.classList.add("quantity-controls");

      const minusBtn = document.createElement("button");
      minusBtn.classList.add("quantity-btn");
      minusBtn.textContent = "-";
      minusBtn.onclick = () => updateQuantity(item.name, -1);

      const quantityText = document.createElement("span");
      quantityText.classList.add("quantity-text");
      quantityText.textContent = item.quantity;

      const plusBtn = document.createElement("button");
      plusBtn.classList.add("quantity-btn");
      plusBtn.textContent = "+";
      plusBtn.onclick = () => updateQuantity(item.name, 1);

      quantityControls.appendChild(minusBtn);
      quantityControls.appendChild(quantityText);
      quantityControls.appendChild(plusBtn);

      cartItemRight.appendChild(quantityControls);

      cartItem.appendChild(cartItemLeft);
      cartItem.appendChild(cartItemRight);

      cartItemsList.appendChild(cartItem);

      // Calculate total price
      totalPrice += item.price * item.quantity;
      totalAmount += item.quantity;
    });
  }

  // Update total price and amount
  totalPriceElement.textContent = `${totalPrice} SEK`;
  totalAmountElement.textContent = `${totalAmount}`;
}

// Update the quantity of an item in the cart
function updateQuantity(itemName, delta) {
  let cartItems = getCartLocalStorage();
  const itemIndex = cartItems.findIndex((item) => item.name === itemName);

  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity += delta;

    setCartLocalStorage(cartItems);
    cartDisplay();
  }
  if (cartItems[itemIndex].quantity < 1) {
    removeItemFromCart(itemName);
  }
}

function removeItemFromCart(itemName) {
  let cartItems = getCartLocalStorage();

  cartItems = cartItems.filter((item) => item.name !== itemName);

  setCartLocalStorage(cartItems);
  cartDisplay();
}

// toggle the cart
function toggleCart() {
  const cartPopup = document.getElementById("cart-popup");
  if (cartPopup.style.display === "block") {
    cartPopup.style.display = "none";
  } else {
    cartPopup.style.display = "block";
    cartDisplay();
  }
}
function closePopup() {
  document.getElementById("cart-popup").style.display = "none";
}

function addToCart(itemName, price, image) {
  let cartItems = getCartLocalStorage();
  const existingItemIndex = cartItems.findIndex(
    (item) => item.name === itemName
  );

  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity += 1;
  } else {
    cartItems.push({
      name: itemName,
      price: price,
      image: image,
      quantity: 1,
    });
  }

  setCartLocalStorage(cartItems);
  cartDisplay();
}
