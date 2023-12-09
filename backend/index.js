import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import jobRoute from './routes/jobs.js'
import applicationRoute from './routes/application.js'
import sendEmailRoute from './routes/sendEmail.js'
import courseRoute from './routes/courses.js'
import subscriptionRoute from './routes/subscription.js'
import adminRoute from './routes/admin.js'

// Require dotenv config file
dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
    origin:true,
    credentials:true
}

// Set up database connection from env variables
mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // If database is connected display success message
        console.log("MongoDB connected");
    }
    catch (err) {
        // If database connection fails, display error in console.
        console.log("MongoDB connection Failed");

    }
};

// Middleware handling
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Define all routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/jobs', jobRoute);
app.use('/api/v1/application', applicationRoute);
app.use('/api/v1/sendEmail', sendEmailRoute);
app.use('/api/v1/courses', courseRoute);
app.use('/api/v1/subscription', subscriptionRoute);
app.use('/api/v1/admin', adminRoute);

// Start the application and display port number
app.listen(port, () => {
    connect();
    console.log('server Listening on port ', port);
});