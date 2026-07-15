/**
 * ============================================================
 * routes/admin.js
 * ------------------------------------------------------------
 * This route module is responsible for:
 *
 * 1. Displaying the "Add Product" page.
 * 2. Receiving form submissions.
 * 3. Storing products in memory.
 *
 * Every route in this file is prefixed with:
 *
 *      /admin
 *
 * because of:
 *
 *      app.use('/admin', adminData.routes);
 *
 * in app.js.
 * ============================================================
 */

// Import the Express framework.
const express = require('express');

/**
 * Create a Router object.
 *
 * A Router behaves like a mini Express application.
 *
 * Instead of defining all routes inside app.js,
 * we organize related routes into separate files.
 */
const router = express.Router();

/* ============================================================
   PRODUCT STORAGE
   ============================================================ */

/**
 * Temporary in-memory storage.
 *
 * Every submitted product will be pushed into this array.
 *
 * Example:
 *
 * [
 *      { title: 'iPhone' },
 *      { title: 'MacBook' }
 * ]
 *
 * NOTE:
 * This is NOT a database.
 *
 * If the server restarts,
 * everything inside this array disappears.
 *
 * Later in the course,
 * we'll replace this with proper data storage.
 */
const products = [];

/* ============================================================
   GET /admin/add-product
   ============================================================ */

/**
 * This route displays the Add Product page.
 *
 * Browser Request:
 *
 *      GET /admin/add-product
 *
 * Since we're using EJS,
 * Express renders:
 *
 *      views/add-product.ejs
 */
router.get('/add-product', (req, res) => {

    res.render('add-product', {

        // Browser tab title.
        pageTitle: 'Add Product',

        // Used later to highlight the active navigation link.
        path: '/admin/add-product'

    });

});

/* ============================================================
   POST /admin/add-product
   ============================================================ */

/**
 * This route executes when the form is submitted.
 *
 * Browser Request:
 *
 *      POST /admin/add-product
 *
 * The HTML form sends:
 *
 * <input name="title">
 *
 * Because body-parser middleware is enabled,
 * Express stores the submitted value inside:
 *
 *      req.body.title
 */
router.post('/add-product', (req, res) => {

    /**
     * Add the new product to our array.
     *
     * Example:
     *
     * Before:
     *
     * []
     *
     * After:
     *
     * [
     *      {
     *          title: 'Gaming Mouse'
     *      }
     * ]
     */
    products.push({

        title: req.body.title

    });

    /**
     * Redirect the browser.
     *
     * Instead of rendering another page directly,
     * Express tells the browser:
     *
     * "Go make a GET request to /"
     *
     * This follows the
     * Post → Redirect → Get (PRG) pattern,
     * preventing duplicate form submissions if
     * the user refreshes the page.
     */
    res.redirect('/');

});

/* ============================================================
   EXPORTS
   ============================================================ */

/**
 * We export BOTH:
 *
 * 1. router
 * 2. products
 *
 * Why?
 *
 * app.js needs:
 *
 *      adminData.routes
 *
 * shop.js needs:
 *
 *      adminData.products
 *
 * Therefore we export an object containing both.
 */
exports.routes = router;
exports.products = products;