/**
 * ============================================================
 * routes/shop.js
 * ------------------------------------------------------------
 * This route module is responsible for:
 *
 * 1. Displaying the Shop page.
 * 2. Retrieving all products.
 * 3. Passing those products to the EJS template.
 *
 * Every route in this file has NO prefix because
 * in app.js we registered it like this:
 *
 *      app.use(shopRoutes);
 *
 * Therefore:
 *
 *      router.get('/')
 *
 * becomes:
 *
 *      GET /
 * ============================================================
 */

// Import the Express framework.
const express = require('express');

/**
 * Create a Router instance.
 *
 * Think of this as a small Express application
 * dedicated only to shop-related routes.
 */
const router = express.Router();

/* ============================================================
   IMPORT PRODUCT DATA
   ============================================================ */

/**
 * Import everything exported from admin.js.
 *
 * admin.js exports:
 *
 * exports.routes = router;
 * exports.products = products;
 *
 * Therefore:
 *
 * adminData.routes
 * adminData.products
 *
 * are both available.
 */
const adminData = require('./admin');

/* ============================================================
   GET /
   ============================================================ */

/**
 * Homepage of our application.
 *
 * Browser Request:
 *
 *      GET /
 *
 * This route:
 *
 * 1. Retrieves all products.
 * 2. Passes them to the EJS template.
 * 3. Express renders HTML.
 */
router.get('/', (req, res) => {

    /**
     * Render:
     *
     * views/shop.ejs
     *
     * The second argument is an object.
     *
     * Every property inside this object becomes
     * available inside the EJS template.
     */
    res.render('shop', {

        /**
         * List of products.
         *
         * Example:
         *
         * [
         *      { title: 'MacBook' },
         *      { title: 'Keyboard' }
         * ]
         *
         * Inside EJS we can access:
         *
         * prods
         */
        prods: adminData.products,

        /**
         * Browser tab title.
         */
        pageTitle: 'Shop',

        /**
         * Used to highlight the active navigation link.
         */
        path: '/'

    });

});

/* ============================================================
   EXPORT ROUTER
   ============================================================ */

/**
 * Export this router.
 *
 * app.js imports this module and registers it:
 *
 * app.use(shopRoutes);
 *
 * allowing Express to execute these routes.
 */
module.exports = router;