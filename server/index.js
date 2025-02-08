// TO USE AUTH IN ALL COMPONENTS THAT GET/PUSH DATA TO SERVER (ROUTES ONLY ABLE TO BE USED BY SUBS)
// AUTH WILL GET TOKEN AND VERIFY IS SUBBED (BY CHECKING CUSTOMER WITH STRIPE) AND AFTER EVERYTHING SEND A STATE INT BACK THAT WILL INDICATE WHAT FRONTEND WILL DISPLAY

// NB: Cheile secrete de auth pentru Stripe (preturi, webhook) sunt de test si le voi ascunde pe cele reale (cand dau drumul pe bani) in fisiere .env
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cron from "node-cron";


import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import fetchRoutes from "./routes/fetch.js";
import searchRoutes from "./routes/search.js";
import pushRoutes from "./routes/push.js";
import listRoutes from "./routes/list.js";
import deleteRoutes from "./routes/delete.js";
import refreshRoutes from "./routes/refresh.js"
import changeemailmodificariRoutes from "./routes/changeemailmodificari.js";
import listasedintaRoutes from "./routes/listasedinta.js";
import addnotitaRoutes from "./routes/addnotita.js";
import getnotitaRoutes from "./routes/getnotita.js";
import rateLimitMiddleware from "./middleware/rateLimit.js";
import authenticateJWT from "./middleware/apiAuth.js";
import torun from "./jobmodificari.js";
import db from "./db.js";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cfg = dotenv.config();
const app = express();
app.use(cors());

const stripeWebhookRoute = express.Router();
stripeWebhookRoute.post(
    '/',
    express.raw({ type: 'application/json' }),
    async (request, response) => {
        function handleDelete(customer_id) {
            return new Promise((resolve, reject) => {
                const sql = "UPDATE `users` SET `customer_id`=?, `emailmodificari`=?, `emailsedinte`=? WHERE `customer_id`=?";
                db.query(sql, [null, 0, 0, customer_id], (err, result) => {
                    if (err) reject(err);
                    resolve(result)
                });
            })
        }

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

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        const endpointSecret = 'whsec_KiusYXKr4NV1GJ4bPjT14Kii7f3BiyVL';
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
            case 'customer.subscription.deleted': {
                subscription = event.data.object;
                status = subscription.status;
                console.log(`Deleted - Subscription status is ${status}.`);
                
                await handleDelete(subscription.customer);

                const customer = await stripe.customers.retrieve(subscription.customer);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const user = await findUserByEmail(customer.email);

                // TODO IMPORTANT: UNCOMMENT WHEN APP IS LIVE
                // await deleteDosare(user[0].id);
            } break;
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
            default:
                console.log(`Unhandled event type ${event.type}.`);
        }
        response.send();
    }    
);

app.use("/api/webhook", stripeWebhookRoute);

app.set('trust proxy', 1);

// TODO: UPGRADE LIMIT TO 50MB BECAUSE SOMETIMES 413 IS THROWN
app.use(express.json());

app.use(rateLimitMiddleware);
app.use(authenticateJWT); 

const [month, quarter, year] = 
['price_1PnHvVIImGcHCAj8tlYcGMao', 'price_1PnIC4IImGcHCAj8KDJYO4GI', 'price_1PnI4WIImGcHCAj83wE0BeK7'];

import Stripe from "stripe"
import process from "process"

const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)

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
            success_url: "https://curiachronos.ro/success",
            cancel_url: "https://curiachronos.ro",
            customer_email: user[0].email
        });
        return session;
    } catch (e){
        return e;
    }
};

app.post("/api/create-subscription-checkout-session", async(req, res) => {
    const {plan, customerId} = req.body;
    let planId = null;
    if (plan == 10) planId = month;
    else if (plan == 27) planId = quarter;
    else if (plan == 100) planId = year;

    function insertSessionIdToUser(id, sessionId) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE `users` SET `customer_id`=? WHERE `id`=?";
            db.query(sql, [sessionId, id], (err, result) => {
                if (err) reject(err);
                resolve(result)
            });
        })
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

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));

// TODO(razvan): Pare ca functia poate primi o data, probabil data la care e invocata
// Mai sunt 2 stringuri ca alternativa dar care probabil ca nu conteaza
// Exista si al treilea parametru prin care se poate configura timezone-ul pentru data
cron.schedule("*/5 * * * *", () => torun())