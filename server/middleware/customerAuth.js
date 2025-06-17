const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.PRODUCTION === 'true' ? process.env.STRIPE_PRIVATE_KEY : process.env.T_STRIPE_PRIVATE_KEY); 

function findUserById(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE `id`= ?";
        db.query(sql, [id], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    })
}

const authorizeCustomer = async (req, res, next) => {
    if (['/api/auth', '/api/users', '/api/fetch', '/api/validateToken', '/api/webhook', '/api/create-subscription-checkout-session', '/api/logout', '/api/captcha', '/api/verifyEmail', '/api/compareCodes', '/api/deleteAccount', '/api/fetchUIDFromCustomerCookie'].includes(req.path)) {
        return next(); 
    }

    // Extract token from HTTP-only cookie
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }

    try {
        // Step 2: Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // Assumes `id` is stored in the token payload
        const tokenCreatedAt = decoded.iat; // Issued at (Unix timestamp)
        const tokenExpiresAt = decoded.exp; // Expiration time (Unix timestamp)

        // Attach decoded data to the request for use in later steps
        req.user = { id: userId, tokenCreatedAt, tokenExpiresAt };

        const userFromDB = await findUserById(userId)[0];

        // Step 3: Fetch the customer's ID from the database (replace with your DB query)
        const customerId = userFromDB.customer_id; // Replace with your function
        if (!customerId) {
            return res.status(403).json({ error: 'Forbidden: No customer ID found for the user' });
        }

        // Step 4: Verify the customer ID with Stripe
        const stripeCustomer = await stripe.customers.retrieve(customerId);
        if (!stripeCustomer || stripeCustomer.deleted || stripeCustomer.email !== userFromDB.email) {
            return res.status(403).json({ error: 'Forbidden: Invalid or deleted Stripe customer' });
        }

        // Attach customer info to the request
        req.user.customerId = customerId;
        req.user.stripeCustomer = stripeCustomer;

        // Step 5: Proceed to the next middleware or route
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Unauthorized: Token has expired' });
        }
        console.error('Authorization error:', error.message);
        return res.status(403).json({ error: 'Forbidden: Invalid token or Stripe customer' });
    }
};

module.exports = authorizeCustomer;