import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    // Get access token from cookies
    const token = req.cookies.accessToken

    if (!token) {
        // If token unavailable, return error
        return res.status(401).json({ success: false, message: "You're not authorize" })
    }

    // If token exists, verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            // Return error if token invalid
            return res.status(401).json({ success: false, message: "token is invalid" })
        }

        // Else set user to currently requested user
        req.user = user

        // Continue to next function
        next() 
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        // If user is admin continue else throw error
        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You're not authenticated" });
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You're not authorize" });
        }
    });
};
