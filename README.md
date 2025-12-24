# Wanderlust

**Wanderlust** is a modern, full-stack travel listing application built with **Node.js, Express, MongoDB, and EJS**. It allows users to explore, create, and review travel destinations seamlessly. Designed with clean UI/UX and a modular architecture, it’s perfect for travel enthusiasts and a strong portfolio project.  

## 🌐 Live project Link

**Live Project:** https://wanderlust-tx4p.onrender.com

## 🚀 Features

- **User Authentication:** Signup/Login system for secure access.
- **Listings Management:** Create, edit, delete, and view travel listings.
- **Review System:** Users can leave reviews and ratings on listings.
- **Dynamic Maps & Geolocation:** Visualize listings on a map (via integrated scripts).
- **Responsive Design:** Only for desktop users, UI using CSS.
- **Flash Messages & Error Handling:** Elegant feedback for user actions.
- **Secure & Modular Architecture:** Middleware, utils, and separate route/controller structure.

---

## Folder Structure

```text
MAJOR-PROJECT/
├── controllers/        # Request handlers (listings, reviews, users)
├── init/               # Seed data & initial setup
├── models/             # Mongoose models (listing, review, user)
├── node_modules/       # Dependencies
├── public/             # Static assets (CSS, JS, images)
│   ├── css/            # Stylesheets
│   ├── js/             # Frontend scripts
│   └── images/         # Logos and images
├── routes/             # Express routes
├── scripts/            # Custom scripts (fillGeometry.js)
├── seed-images/        
├── utils/              # Helper functions (ExpressError, WrapAsync)
├── views/              # EJS templates
│   ├── includes/       # Navbar, Footer, Flash
│   ├── layouts/        # Boilerplate layout
│   ├── listings/       # Listing pages (index, show, edit, new)
│   └── users/          # Auth pages (login, signup)
├── .env                # Environment variables
├── app.js              # Main Express server file
├── cloudConfig.js      # Cloudinary config
├── middleware.js       # Express middleware
├── schema.js           # Validation schemas
├── package.json        # Dependencies & scripts
├── package-lock.json
└── README.md           # Project documentation
