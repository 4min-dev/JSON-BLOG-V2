require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./router/authRouter');
const cookieParser = require('cookie-parser');
const imageRouter = require('./router/imageRouter');
const postsRouter = require('./router/postsRouter');
const commentsRouter = require('./router/commentsRouter');
const albumRouter = require('./router/albumRouter')

const HOSTNAME = process.env.HOSTNAME || 'localhost'
const PORT = process.env.PORT || 5000
const UI = process.env.UI

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser(process.env.SECRETCOOKIE))
app.use(express.json({ limit: '10mb' }))

app.use('/auth', authRouter)
app.use('/posts', postsRouter)
app.use('/comments', commentsRouter)
app.use('/albums', albumRouter)
app.use('/image',imageRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const run = async () => {
    try {
        await mongoose.connect(UI)
        app.listen(PORT, () => console.log(`Server was launched - http://${HOSTNAME}:${PORT}`))
    } catch (error) {
        console.log(error)
    }
};

run()