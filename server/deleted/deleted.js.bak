function change(customer_id, session_id, id) {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE `users` SET `customer_id`=?, `session_id`=?, `emailmodificari`=?, `emailsedinte`=? WHERE `id`=?";
        db.query(sql, [customer_id, session_id, 1, 1, id], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    })
}

function findUserBySessionId(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE `session_id`= ?";
        db.query(sql, [id], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    })
}

app.post("/api/payment-success", async (req, res) => {
    const { sessionId } = req.body;
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
    
        if (session.payment_status === 'paid') {
            try {
                var user = await findUserBySessionId(session.id);
                // const user = await findUserById(req.body.uid);

                if (user.length != 0) {
                    if (user[0].id == req.body.uid) {
                        // user went to their own session id a while after subscribing - grant access
                        await change(session.customer, session.id, req.body.uid)
                        return res.json({ data: session.customer, message: "Successful" })
                    }
                    else {
                        // user went to another account's session id - deny access
                        return res.json({ data: "", message: "Ids don't match" })
                    }
                } else {
                    // user = await findUserById(req.body.uid);

                    // if (typeof user[0].customer_id == "null") return res.json({ data: "", message: "Customer id is null" })
                    const cust = await stripe.customers.retrieve(session.customer);
                    
                    // user went to their own account's session id after their subscription ended - deny access
                    if (typeof cust.deleted != "undefined") return res.json({ data: "", message: "Customer is found to be deleted" })
                    
                    // user went to their own account's session id immediately after subscribing - allow access
                    await change(session.customer, session.id, req.body.uid)
                    return res.json({ data: session.customer, message: "Successful" })
                }

                // if (session.customer_email != user[0].email) return res.json({ data: "", message: "Ids don't match" })
                
                // await change(session.customer, req.body.uid)
                // return res.json({ data: session.customer, message: "Successful" })
                
            } catch (error) {
                console.error('Error retrieving subscription:', error);
            }
            
        } else {
            return res.json({ data: "", message: "Payment failed" });
        }
    } catch (error) {
        res.send(error);
    }
});