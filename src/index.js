require("dotenv").config();

require("./server");

const {
  Client,
  GatewayIntentBits
} = require("discord.js");

const shopCommand =
  require("./commands/shop");

const interactionCreate =
  require(
    "./handlers/interactionCreate"
  );

const {
  categories,
  products
} = require(
  "./config/database"
);

const Category =
  require(
    "./models/Category"
  );

const Product =
  require(
    "./models/Product"
  );

// ======================
// DATA MẪU
// ======================

categories.push(

  new Category(
    "pubg",
    "PUBG",
    "Danh mục PUBG Mobile"
  )

);

products.push(

  new Product(
    "uc60",
    "PUBG",
    "60 UC",
    "20.000đ",
    "Nạp UC PUBG"
  )

);

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
// READY
// ======================

client.once(
  "clientReady",
  () => {

    console.log(
      `✅ ${client.user.tag} ONLINE`
    );

  }
);

// ======================
// COMMAND
// ======================

client.on(
  "messageCreate",
  async (message) => {

    if (
      message.author.bot
    ) return;

    if (
      message.content ===
      "!shop"
    ) {

      await shopCommand(
        message
      );

    }

  }
);

// ======================
// INTERACTION
// ======================

client.on(
  "interactionCreate",
  async (interaction) => {

    await interactionCreate(
      interaction
    );

  }
);

// ======================
// LOGIN
// ======================

client.login(
  process.env.TOKEN
);
