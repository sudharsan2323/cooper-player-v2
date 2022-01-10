const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const cookieParser = require("cookie-parser")
const cors = require('cors')



const Song = require("./routes/Song");
const Playlist = require("./routes/Playlist");
const User = require("./routes/User")
const Admin = require("./routes/Admin")
const errorHandler = require("./middleware/Error")

const app = express();
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("db connected");
});

app.use(expressValidator())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())



app.use('/', Song)
app.use("/user", User)
app.use("/playlist", Playlist)
app.use("/admin", Admin)

app.use(errorHandler);



const server = app.listen(process.env.PORT, () => {
    console.log("welcome to 8080 port");
})

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});