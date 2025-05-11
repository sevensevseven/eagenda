// TO USE AUTH IN ALL COMPONENTS THAT GET/PUSH DATA TO SERVER (ROUTES ONLY ABLE TO BE USED BY SUBS)
// AUTH WILL GET TOKEN AND VERIFY IS SUBBED (BY CHECKING CUSTOMER WITH STRIPE) AND AFTER EVERYTHING SEND A STATE INT BACK THAT WILL INDICATE WHAT FRONTEND WILL DISPLAY

// NB: Cheile secrete de auth pentru Stripe (preturi, webhook) sunt de test si le voi ascunde pe cele reale (cand dau drumul pe bani) in fisiere .env

require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const cron = require("node-cron");

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const fetchRoutes = require("./routes/fetch");
const searchRoutes = require("./routes/search");
const pushRoutes = require("./routes/push");
const listRoutes = require("./routes/list");
const deleteRoutes = require("./routes/delete");
const refreshRoutes = require("./routes/refresh");
const changeemailmodificariRoutes = require("./routes/changeemailmodificari");
const listasedintaRoutes = require("./routes/listasedinta");
const addnotitaRoutes = require("./routes/addnotita");
const getnotitaRoutes = require("./routes/getnotita");
const validateTokenRoutes = require("./routes/validateToken");
const logoutRoutes = require("./routes/logout");
const captchaRoutes = require("./routes/captcha");
const verifyEmailRoutes = require("./routes/verifyEmail");
const compareCodesRoutes = require("./routes/compareCodes");
const deleteAccountRoutes = require("./routes/deleteAccount");
const deleteAccountIdRoutes = require("./routes/deleteAccountId");
const fetchUIDFromTempCookieRoutes = require("./routes/fetchUIDFromTempCookie");

const rateLimitMiddleware = require("./middleware/rateLimit");
const authenticateJWT = require('./middleware/apiAuth');

const stripeWebhookRoute = express.Router();

const torun = require("./jobmodificari");
const cleanup = require("./cleanup");
const db = require("./db");
const cookieParser = require("cookie-parser");

const allowed = [
    "https://curiachronos.ro",        // e.g. https://app.yourdomain.com
    "https://api.curiachronos.ro",
    'http://localhost:3000'   // if you have another frontend for the Stripe portal
];
  

app.use(cors({
    origin: allowed,
    credentials: true
}));

app.use(cookieParser());

stripeWebhookRoute.post(
    '/',
    cors(),
    express.raw({ type: 'application/json' }),
    async (request, response) => {
        function handleSuccess(customer_id, email) {
            return new Promise((resolve, reject) => {
                const sql = "UPDATE `users` SET `customer_id`=?, `emailmodificari`=?, `emailsedinte`=? WHERE `email`=?";
                db.query(sql, [customer_id, 1, 1, email], (err, result) => {
                    if (err) reject(err);
                    resolve(result)
                });
            })
        }

        function handlePastDue(customer_id, email) {
            return new Promise((resolve, reject) => {
                const sql = "UPDATE `users` SET `customer_id`=? WHERE `email`=?";
                db.query(sql, ["past_due_" + customer_id, email], (err, result) => {
                    if (err) reject(err);
                    resolve(result)
                });
            })
        }

        function findUserByEmail(email) {
            return new Promise((resolve, reject) => {
                const sql = "SELECT * FROM users WHERE `email`= ?";
                db.query(sql, [email], (err, result) => {
                    if (err) reject(err);
                    resolve(result)
                });
            })
        }

        function deleteDosare(id) {
            return new Promise((resolve, reject) => {
                const sql = "DELETE FROM `dosare` WHERE `userid`=?";
                db.query(sql, [id], (err, result) => {
                    if (err) reject(err);
                    resolve(result)
                });
            })
        }

        let event = request.body;
        const endpointSecret = process.env.WEBHOOK_SECRET;
        if (endpointSecret) {
            const signature = request.headers['stripe-signature'];
            try {
                event = stripe.webhooks.constructEvent(
                    request.body,
                    signature,
                    endpointSecret
                );
            } catch (err) {
                console.log(`⚠️  Webhook signature verification failed.`, err.message);
                return response.sendStatus(400);
            }
        }
        let subscription;
        let status;
        switch (event.type) {
            // case 'customer.subscription.trial_will_end':
            //     subscription = event.data.object;
            //     status = subscription.status;
            //     console.log(`Subscription status is ${status}.`);
            //     break;
            case 'customer.subscription.deleted':
                subscription = event.data.object;
                status = subscription.status;
                console.log(`Deleted - Subscription status is ${status}.`);

                await new Promise((resolve, reject) => {
                    db.query("DELETE FROM users WHERE customer_id = ?", [subscription.customer], (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                });

                const customer = await stripe.customers.retrieve(subscription.customer);
                const user = await findUserByEmail(customer.email);

                await deleteDosare(user[0].id);

                break;
            case 'customer.subscription.created':
                subscription = event.data.object;
                status = subscription.status;
                console.log(`Created - Subscription status is ${status}.`);

                break;
            case 'customer.subscription.updated':
                subscription = event.data.object;
                status = subscription.status;
                console.log(`Updated - Subscription status is ${status}.`);

                if (status == "active") {
                    const customer = await stripe.customers.retrieve(subscription.customer);

                    await handleSuccess(subscription.customer, customer.email);
                }

                if (status == "past_due") {
                    const customer = await stripe.customers.retrieve(subscription.customer);

                    await handlePastDue(subscription.customer, customer.email);
                }

                break;
            // case 'checkout.session.expired':
            //     const session = event.data.object;
            //     const userId = session.metadata?.userId;
            //     if (userId) {
            //         try {
            //             // Get the user's customer_id by id
            //             const users = await new Promise((resolve, reject) => {
            //                 db.query("SELECT customer_id FROM users WHERE id = ?", [userId], (err, result) => {
            //                     if (err) reject(err);
            //                     resolve(result);
            //                 });
            //             });

            //             const user = users[0];
            //             if (!user) break;

            //             const customerId = user.customer_id;

            //             // Only delete if the customer_id matches this expired session
            //             if (customerId === session.id) {
            //                 await new Promise((resolve, reject) => {
            //                     db.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
            //                         if (err) reject(err);
            //                         else resolve(result);
            //                     });
            //                 });
            //                 console.log(`Deleted user with ID ${userId} due to session expiration`);
            //             } else {
            //                 console.log(`Session ${session.id} expired but user has newer session/customer ID: ${customerId}`);
            //             }
            //         } catch (err) {
            //             console.error("Error handling expired session cleanup:", err);
            //         }
            //     }
            //     break;
            default:
                console.log(`Unhandled event type ${event.type}.`);
        }
        response.send();
    }    
);

app.use("/api/webhook", stripeWebhookRoute);

app.set('trust proxy', 1);

// TODO: UPGRADE LIMIT TO 50MB BECAUSE SOMETIMES 413 IS THROWN
app.use(express.json({ limit: '50mb' }));

app.use(rateLimitMiddleware);
app.use(authenticateJWT); 

const [month, half, year] =
[process.env.PRICE_MONTH, process.env.PRICE_HALF, process.env.PRICE_YEAR];

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

function findUserById(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE `id`= ?";
        db.query(sql, [id], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    })
}

const stripeSession = async(plan, uid) => {
    try {
        const user = await findUserById(uid);
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: plan,
                    quantity: 1
                },
            ],
            tax_id_collection: {
                enabled: true,
            },
            success_url: "https://curiachronos.ro/success",
            cancel_url: `https://curiachronos.ro/canceled?value=${uid}`,
            metadata: {
                userId: uid.toString()
            },
            customer_email: user[0].email,
        });
        return session;
    } catch (e){
        return e;
    }
};

app.post("/api/create-subscription-checkout-session", async(req, res) => {
    const {plan, customerId} = req.body;
    let planId = null;
    if (plan == 4.99) planId = month;
    else if (plan == 27.99) planId = half;
    else if (plan == 49.99) planId = year;

    function insertSessionIdToUser(id, sessionId) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE `users` SET `customer_id`=? WHERE `id`=?";
            db.query(sql, [sessionId, id], (err, result) => {
                if (err) reject(err);
                resolve(result)
            });
        })
    }

    const userCheck = await new Promise((resolve, reject) => {
        db.query("SELECT verified FROM users WHERE id = ?", [customerId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });

    if (!userCheck.length || userCheck[0].verified !== 1) {
        return res.status(403).json({ error: "Account is not verified." });
    }

    try {
        const session = await stripeSession(planId, customerId);

        await insertSessionIdToUser(req.body.customerId, session.id);

        return res.json({session})

    } catch(error){
        res.send(error)
    }
})

app.post('/api/create-portal-session', async (req, res) => {
    try {
        const returnUrl = "https://curiachronos.ro";
    
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: req.body.customer_id,
            return_url: returnUrl,
        });
    
        res.send(portalSession.url);
    } catch (e) {
        res.send(e);
    }
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/fetch", fetchRoutes)
app.use("/api/search", searchRoutes);
app.use("/api/push", pushRoutes);
app.use("/api/list", listRoutes);
app.use("/api/delete", deleteRoutes);
app.use("/api/refresh", refreshRoutes);
app.use("/api/changeemailmodificari", changeemailmodificariRoutes);
app.use("/api/listasedinta", listasedintaRoutes);
app.use("/api/addnotita", addnotitaRoutes);
app.use("/api/getnotita", getnotitaRoutes);
app.use("/api/validateToken", validateTokenRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/captcha", captchaRoutes);
app.use("/api/verifyEmail", verifyEmailRoutes);
app.use("/api/compareCodes", compareCodesRoutes);
app.use("/api/deleteAccount", deleteAccountRoutes);
app.use("/api/deleteAccountId", deleteAccountIdRoutes);
app.use("/api/fetchUIDFromTempCookie", fetchUIDFromTempCookieRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));

cron.schedule("*/15 * * * *", () => torun())
cron.schedule("*/30 * * * *", () => cleanup());