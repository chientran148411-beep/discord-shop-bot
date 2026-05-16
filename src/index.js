require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Events
} = require("discord.js");

const mongoose =
require("mongoose");



// CLIENT

const client =
new Client({

  intents: [
    GatewayIntentBits.Guilds
  ]

});



// DATABASE

mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "✅ MongoDB Connected"
  );

})

.catch(console.error);



// MODELS

require("./models/Product");
require("./models/Category");
require("./models/Key");
require("./models/Order");
require("./models/User");



// HANDLERS

const buttonHandler =
require("./handlers/buttons");

const modalHandler =
require("./handlers/modals");



// PANELS

const shopPanel =
require("./panels/shopPanel");

const adminPanel =
require("./panels/adminPanel");



// READY

client.once(

  Events.ClientReady,

  async () => {

    console.log(
      `✅ ${client.user.tag} Online`
    );

    const guild =
    client.guilds.cache.get(
      process.env.GUILD_ID
    );

    if (!guild) {

      console.log(
        "❌ Không tìm thấy server"
      );

      return;

    }

    // SLASH COMMANDS

    await guild.commands.set([

      {

        name: "shop",

        description:
        "Mở shop"

      },

      {

        name: "admin",

        description:
        "Admin panel"

      }

    ]);

    console.log(
      "✅ Slash Commands Loaded"
    );

  }

);



// INTERACTION

client.on(

  Events.InteractionCreate,

  async interaction => {

    try {

      // ===================
      // SLASH COMMAND
      // ===================

      if (
        interaction.isChatInputCommand()
      ) {

        // SHOP

        if (
          interaction.commandName ===
          "shop"
        ) {

          return shopPanel(
            interaction
          );

        }

        // ADMIN

        if (
          interaction.commandName ===
          "admin"
        ) {

          return adminPanel(
            interaction
          );

        }

      }

      // ===================
      // BUTTON
      // ===================

      if (
        interaction.isButton()
      ) {

        return buttonHandler(
          interaction
        );

      }

      // ===================
      // MODAL
      // ===================

      if (
        interaction.isModalSubmit()
      ) {

        return modalHandler(
          interaction
        );

      }

    } catch (err) {

      console.log(err);

      try {

        if (
          !interaction.replied
        ) {

          await interaction.reply({

            content:
            "❌ Bot đang gặp lỗi",

            ephemeral: true

          });

        }

      } catch {}

    }

  }

);



// LOGIN

client.login(
  process.env.TOKEN
);
