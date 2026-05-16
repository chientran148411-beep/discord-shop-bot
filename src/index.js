require("dotenv").config();

const {
  Client,
  GatewayIntentBits
} = require("discord.js");

const mongoose = require("mongoose");

const express = require("express");

// ======================
// CLIENT
// ======================

const client = new Client({

  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]

});

// ======================
// EXPRESS
// ======================

const app = express();

app.use(express.json());

// ======================
// MONGODB
// ======================

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("✅ Đã kết nối MongoDB");

})

.catch((err) => {

  console.log(err);

});

// ======================
// WEBHOOK TEST
// ======================

app.get("/", (req, res) => {

  res.send("KENIOS BOT ONLINE");

});

// ======================
// SEPAY WEBHOOK
// ======================

app.post("/sepay-webhook", async (req, res) => {

  try {

    console.log(req.body);

    return res.json({

      success: true

    });

  }

  catch (err) {

    console.log(err);

    return res.status(500).json({

      success: false

    });

  }

});

// ======================
// EVENTS
// ======================

require("./handlers/interactionCreate")(client);

// ======================
// READY
// ======================

client.once("ready", () => {

  console.log(`✅ ${client.user.tag} online`);

});

// ======================
// LOGIN
// ======================

client.login(process.env.TOKEN);

// ======================
// PORT
// ======================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`✅ Webhook online ${PORT}`);

});
