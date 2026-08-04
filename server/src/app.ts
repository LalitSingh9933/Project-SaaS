import express from 'express'
import authRoute from "./route/globals/auth/authRoute";
import instituteRouter from "./route/institute/instituteRoute";

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/", authRoute)
app.use("/api/institute", instituteRouter)

export default app