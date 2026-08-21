/* =========================================================
   BEYOND THE VEIL — INTERACTIONS
   ========================================================= */

const BOOK_PRICE = 1200; // Example: 1200. Change this when your final price is ready.

const priceElement = document.getElementById("price");
if (BOOK_PRICE !== null) {
  priceElement.textContent = BOOK_PRICE.toLocaleString();
} else {
  priceElement.textContent = "TBA";
}

/* Mobile navigation */
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuToggle.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* Scroll reveal */
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => revealObserver.observe(item));

/* Demo order handling.
   Later we can connect this to WhatsApp, Google Forms, Formspree,
   a database, or a real checkout system. */
const orderForm = document.getElementById("orderForm");
const formMessage = document.getElementById("formMessage");

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(orderForm);

  const name = data.get("name");
  const phone = data.get("phone");
  const city = data.get("city");
  const address = data.get("address");
  const quantity = data.get("quantity");

  const whatsappNumber = "923301856703";

  const message =
    `*BEYOND THE VEIL ORDER*%0A%0A` +
    `Name: ${name}%0A` +
    `Phone: ${phone}%0A` +
    `City: ${city}%0A` +
    `Address: ${address}%0A` +
    `Quantity: ${quantity} copy/copies%0A` +
    `Price: Rs. 1200 per copy`;

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

  window.open(whatsappURL, "_blank");

  formMessage.textContent =
    "Your order has been submitted. You will receive a confirmation shortly.";

  orderForm.reset();
});
