// Catalog of Available Services
const servicesData = [
  {
    id: 1,
    name: "Dry Cleaning",
    price: 200.0,
    icon: "🧺",
    description: "Premium fabric cleaning and steam press for suits, shirts, and delicate wear."
  },
  {
    id: 2,
    name: "AC Repair & Servicing",
    price: 499.0,
    icon: "❄️",
    description: "Comprehensive air conditioner filter cleaning, gas refill check, and diagnostics."
  },
  {
    id: 3,
    name: "Home Deep Cleaning",
    price: 999.0,
    icon: "✨",
    description: "Intensive sanitization and scrub for living room, kitchen tiles, and bathrooms."
  },
  {
    id: 4,
    name: "Plumbing Inspection",
    price: 150.0,
    icon: "🔧",
    description: "Fixing pipe leaks, tap aerators, sink clogs, and water pressure issues."
  },
  {
    id: 5,
    name: "Electrical Repair",
    price: 250.0,
    icon: "💡",
    description: "Switchboard diagnostics, short circuit check, and appliance wiring setup."
  }
];

// App State
let currentServiceIndex = 0;
let cartItems = [];

// DOM Element Selectors
const serviceNameDisplay = document.getElementById("serviceNameDisplay");
const servicePriceDisplay = document.getElementById("servicePriceDisplay");
const serviceDescDisplay = document.getElementById("serviceDescDisplay");
const serviceIconBanner = document.getElementById("serviceIconBanner");

const skipBtn = document.getElementById("skipBtn");
const addItemBtn = document.getElementById("addItemBtn");
const quickAddToCartBtn = document.getElementById("quickAddToCartBtn");
const quickBookNowBtn = document.getElementById("quickBookNowBtn");

const emptyState = document.getElementById("emptyState");
const itemsTable = document.getElementById("itemsTable");
const itemsTableBody = document.getElementById("itemsTableBody");
const totalAmountText = document.getElementById("totalAmountText");

const bookingForm = document.getElementById("bookingForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passError = document.getElementById("passError");

const logoutBtn = document.getElementById("logoutBtn");
const toastMessage = document.getElementById("toastMessage");

// Render Current Service in Browse Section
function renderCurrentService() {
  const service = servicesData[currentServiceIndex];
  serviceNameDisplay.textContent = service.name;
  servicePriceDisplay.textContent = `₹${service.price.toFixed(2)}`;
  serviceDescDisplay.textContent = service.description;
  serviceIconBanner.textContent = service.icon;

  const alreadyInCart = cartItems.some(item => item.id === service.id);
  if (alreadyInCart) {
    addItemBtn.textContent = "Added ✓";
    addItemBtn.style.backgroundColor = "#e2e8f0";
    addItemBtn.style.color = "#64748b";
    addItemBtn.disabled = true;
  } else {
    addItemBtn.textContent = "Add Item +";
    addItemBtn.style.backgroundColor = "#d1fae5";
    addItemBtn.style.color = "#047857";
    addItemBtn.disabled = false;
  }
}

// Rotate to Next Service (Skip)
function skipToNextService() {
  currentServiceIndex = (currentServiceIndex + 1) % servicesData.length;
  renderCurrentService();
}

// Add Current Service to Cart
function addCurrentServiceToCart() {
  const service = servicesData[currentServiceIndex];
  const alreadyInCart = cartItems.some(item => item.id === service.id);

  if (!alreadyInCart) {
    cartItems.push(service);
    updateCartDOM();
    renderCurrentService();
    showToast(`Added "${service.name}" to cart.`);
  } else {
    showToast(`"${service.name}" is already in the cart.`);
  }
}

// Remove Service by ID
function removeServiceFromCart(id) {
  const removed = cartItems.find(item => item.id === id);
  cartItems = cartItems.filter(item => item.id !== id);
  updateCartDOM();
  renderCurrentService();
  if (removed) {
    showToast(`Removed "${removed.name}" from cart.`);
  }
}

// Recalculate & Render Cart DOM
function updateCartDOM() {
  if (cartItems.length === 0) {
    emptyState.style.display = "flex";
    itemsTable.style.display = "none";
    itemsTableBody.innerHTML = "";
    totalAmountText.textContent = "₹0";
    return;
  }

  emptyState.style.display = "none";
  itemsTable.style.display = "table";
  itemsTableBody.innerHTML = "";

  let total = 0;
  cartItems.forEach((item, idx) => {
    total += item.price;
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td><strong>${item.name}</strong></td>
      <td>₹${item.price.toFixed(2)}</td>
      <td><button type="button" class="btn-remove" data-id="${item.id}">Remove</button></td>
    `;
    itemsTableBody.appendChild(tr);
  });

  totalAmountText.textContent = `₹${total.toFixed(2)}`;

  // Attach remove handlers
  document.querySelectorAll(".btn-remove").forEach(button => {
    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-id"), 10);
      removeServiceFromCart(id);
    });
  });
}

// Toast helper
function showToast(msg) {
  toastMessage.textContent = msg;
  toastMessage.classList.add("show");
  setTimeout(() => {
    toastMessage.classList.remove("show");
  }, 2400);
}

// Form Validation and Booking Handler
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;
  nameError.textContent = "";
  emailError.textContent = "";
  passError.textContent = "";

  const nameVal = fullNameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const passVal = passwordInput.value.trim();

  if (!nameVal) {
    nameError.textContent = "Please enter your full name.";
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailVal || !emailRegex.test(emailVal)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (!passVal || passVal.length < 4) {
    passError.textContent = "Must be at least 4 characters.";
    isValid = false;
  }

  if (cartItems.length === 0) {
    showToast("Please add at least one service before booking!");
    isValid = false;
  }

  if (isValid) {
    const bookingSummary = `Success! Booking placed for ${nameVal} (${cartItems.length} service(s)). Total: ${totalAmountText.textContent}`;
    alert(bookingSummary);
    
    // Reset Cart & Form
    cartItems = [];
    bookingForm.reset();
    updateCartDOM();
    renderCurrentService();
  }
});

// Logout Button Handler
logoutBtn.addEventListener("click", () => {
  const confirmed = confirm("Are you sure you want to log out?");
  if (confirmed) {
    document.getElementById("usernameBadge").textContent = "Guest";
    showToast("You have been logged out.");
  }
});

// Event Listeners for Browse actions
skipBtn.addEventListener("click", skipToNextService);
addItemBtn.addEventListener("click", addCurrentServiceToCart);
quickAddToCartBtn.addEventListener("click", addCurrentServiceToCart);

quickBookNowBtn.addEventListener("click", () => {
  fullNameInput.focus();
  fullNameInput.scrollIntoView({ behavior: "smooth" });
});

// Initial boot
renderCurrentService();
updateCartDOM();