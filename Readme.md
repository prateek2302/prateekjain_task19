# (JS DOM) Service Booking Web App

A clean, responsive Service Booking Web Application built with vanilla HTML5, CSS3, and JavaScript (DOM Manipulation).

## Features
- **Navigation Bar**: Includes brand logo, dynamic links (Home, Services, About Us, Contact Us), user display, and a red Logout button.
- **Left Section**:
  - **Added Items**: Shows an empty state with an informational icon initially. When items are added, dynamic table rows are created showing S.No, Service Name, Price, and a Remove button.
  - **Total Amount**: Calculates and updates total service cost dynamically.
  - **Booking Form**: Validates Full Name, Email, and Password/Phone before processing order.
- **Right Section**:
  - **Browse Our Services**: Showcases services with title, pricing, icons, and descriptions.
  - **Skip & Add Buttons**: Cycle through services or add selected items to the cart.
  - **Quick Cart & Book Now Controls**: Provides immediate quick actions.

## File Structure
- `index.html` — Document structure & semantics
- `style.css` — Responsive design and flexbox/grid layout
- `script.js` — State management and JavaScript DOM manipulation
- `Readme.md` — Project documentation

## How to Run
1. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).
2. Alternatively, serve via VS Code Live Server extension.