const {
  Client,
  GatewayIntentBits
} = require("discord.js");

require("dotenv").config();

const mongoose =
require("mongoose");

const client =
new Client({

  intents: [

    GatewayIntentBits.Guilds,

    GatewayIntentBits.GuildMessages

  ]

});

mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "✅ Đã kết nối MongoDB"
  );

});

client.once(
  "ready",
  () => {

    console.log(
      `✅ ${client.user.tag} online`
    );

  }
);

const shopHandler =
require("./handlers/shopHandler");

const buyHandler =
require("./handlers/buyHandler");

const checkPayHandler =
require("./handlers/checkPayHandler");

const interactionCreate =
require("./handlers/interactionCreate");

client.on(
  "interactionCreate",
  async interaction => {

    await interactionCreate(
      interaction
    );

    await shopHandler(
      interaction
    );

    await buyHandler(
      interaction
    );

    await checkPayHandler(
      interaction
    );

  }
);

client.login(
  process.env.TOKEN
);
