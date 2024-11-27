import express from "express"
import {Server} from "socket.io"
import {createServer} from "http"
import { Socket } from "dgram"
import { log } from "console"

const app = express()
const server = createServer(app)
const io = new Server(server)


app.get('/', (req, res) => {
    res.send("hello world")
})

io.on("connection", (socket) => {
    console.log("user connction")
    console.log("id", socket.id)
})

const port = 3000

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
    
})