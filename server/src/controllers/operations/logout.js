let {app}  = require('../../app')
// let jwt = require ('jsonwebtoken')
// let securitykey ="areyousure"


app.get("/logout", (req, res) => {
    
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "Lax", // or "None" if using secure: true
        secure: false    // true in production (HTTPS)
    });

    res.json({ message: "Logout successful" });
});