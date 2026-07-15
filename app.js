/**
 * ============================================================
 * app.js
 * ------------------------------------------------------------
 * This is the entry point of our Express application.
 *
 * Responsibilities:
 * 1. Create the Express application.
 * 2. Configure the view engine (EJS).
 * 3. Register global middleware.
 * 4. Register route modules.
 * 5. Handle 404 requests.
 * 6. Start the server.
 * ============================================================
 */

// Import the Express framework.
const express = require('express');

// Node's built-in module used for safely working with file paths.
const path = require('path');

// Middleware that parses HTML form data.
const bodyParser = require('body-parser');

// Create the Express application.
const app = express();

/* ============================================================
   VIEW ENGINE CONFIGURATION
   ============================================================ */

/**
 * Tell Express that EJS will be used as the templating engine.
 *
 * Instead of:
 *      res.sendFile(...)
 *
 * we can now write:
 *      res.render('shop')
 *
 * Express automatically looks for:
 *      views/shop.ejs
 */
app.set('view engine', 'ejs');

/**
 * Tell Express where all view files (.ejs) are stored.
 *
 * Project structure:
 *
 * views/
 *      shop.ejs
 *      add-product.ejs
 *      404.ejs
 */
app.set('views', 'views');

/* ============================================================
   IMPORT ROUTES
   ============================================================ */

/**
 * Import Admin routes.
 *
 * These routes handle:
 *      GET  /admin/add-product
 *      POST /admin/add-product
 */
const adminData = require('./routes/admin');

/**
 * Import Shop routes.
 *
 * These routes handle:
 *      GET /
 */
const shopRoutes = require('./routes/shop');

/* ============================================================
   GLOBAL MIDDLEWARE
   ============================================================ */

/**
 * Parse incoming form data.
 *
 * Without this middleware:
 *
 *      req.body === undefined
 *
 * With this middleware:
 *
 *      req.body.title
 *
 * becomes available after submitting a form.
 */
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Serve static files.
 *
 * Everything inside:
 *
 * public/
 *
 * becomes publicly accessible.
 *
 * Example:
 *
 * public/css/main.css
 *
 * can be requested as:
 *
 * /css/main.css
 */
app.use(express.static(path.join(__dirname, 'public')));

/* ============================================================
   REGISTER ROUTES
   ============================================================ */

/**
 * Every route inside admin.js will automatically
 * begin with "/admin".
 *
 * Example:
 *
 * router.get('/add-product')
 *
 * becomes:
 *
 * GET /admin/add-product
 */
app.use('/admin', adminData.routes);

/**
 * Register shop routes.
 *
 * Handles:
 *
 * GET /
 */
app.use(shopRoutes);

/* ============================================================
   404 HANDLER
   ============================================================ */

/**
 * Express executes middleware in order.
 *
 * If none of the routes above respond,
 * this middleware executes.
 *
 * This should always be the LAST middleware.
 */
app.use((req, res) => {

    // Send a custom 404 page.

    res.status(404).render('404', {

        // Dynamic title for the browser tab.
        pageTitle: 'Page Not Found',

        // Used later to highlight the active navigation link.
        path: ''

    });

});

/* ============================================================
   START SERVER
   ============================================================ */

/**
 * Start the Express server.
 *
 * Port:
 *      3000
 *
 * Visit:
 *
 * http://localhost:3000
 */
app.listen(3000);