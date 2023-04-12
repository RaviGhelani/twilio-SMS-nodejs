const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.json());

var accountSid = "AC369ad1be75d8e389228dc91ca3e7d86e"; // Your Account SID from www.twilio.com/console
var authToken = "86a7e55e0ad4781bb42fccc650d34a40"; // Your Auth Token from www.twilio.com/console

const otp = Math.floor(100000 + Math.random() * 900000).toString();

const client = require("twilio")(accountSid, authToken);

app.get("/", async function (req, res, next) {
    client.messages.create({
      from: "+15076328555",
      to: "+917698740796",
      body: `enter ${otp} to varify`,
    });

  res.setHeader("Content-type", "text/html");
  res.json({message : 'otp sent'})

});

app.post("/", async function (req, res, next) {
   console.log(req.body)
  if(otp === req.body.otp){
    res.json({message: 'successfully verified OTP'})
  }
})



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.use("/auth", authRoute);
// app.use(contactRoute);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

const MONGODB_URI =
  "mongodb+srv://Ravi1411:Ravi1411@nodejs.19qxclq.mongodb.net/SMSOTP?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    const server = app.listen(3000);
    console.log("connected to db...!");
  })
  .catch((err) => {
    console.log(err);
  });
