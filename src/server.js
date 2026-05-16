require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Collection
} = require("discord.js");

const mongoose =
require("mongoose");

const fs =
require("fs");

const path =
require("path");

// =========================
// CLIENT
// =========================

const client =
new Client({

  intents: [

    GatewayIntentBits.Guilds,

    GatewayIntentBits.GuildMessages,

    GatewayIntentBits.MessageContent,

    GatewayIntentBits.DirectMessages

  ]

});

// =========================
// COMMANDS
// =========================

client.commands =
new Collection();

const commandsPath =
path.join(
  __dirname,
  "commands"
);

const commandFiles =
fs.readdirSync(
  commandsPath
)

.filter(file =>
  file.endsWith(".js")
);

for (const file of commandFiles) {

  const command =
  require(
    `./commands/${file}`
  );

  client.commands.set(
    command.data.name,
    command
  );

}

// =========================
// MONGODB
// =========================

mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "✅ Đã kết nối MongoDB"
  );

})

.catch(err => {

  console.log(err);

});

// =========================
// HANDLERS
// =========================

const interactionCreate =
require(
  "./handlers/interactionCreate"
);

const shopHandler =
require(
  "./handlers/shopHandler"
);

const buyHandler =
require(
  "./handlers/buyHandler"
);

const checkPayHandler =
require(
  "./handlers/checkPayHandler"
);

// =========================
// WEBHOOK SERVER
// =========================

const startServer =
require("./server");

// =========================
// READY
// =========================

client.once(
  "clientReady",
  () => {

    console.log(
      `✅ ${client.user.tag} online`
    );

  }
);

// =========================
// INTERACTIONS
// =========================

client.on(
  "interactionCreate",
  async interaction => {

    try {

      // =====================
      // SLASH COMMAND
      // =====================

      if (
        interaction.isChatInputCommand()
      ) {

        const command =
        client.commands.get(
          interaction.commandName
        );

        if (!command) return;

        await command.execute(
          interaction,
          client
        );

      }

      // =====================
      // BUTTON / MODAL
      // =====================

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

    catch (err) {

      console.log(err);

      if (
        interaction.replied ||
        interaction.deferred
      ) {

        return;

      }

      return interaction.reply({

        content:
        "❌ Có lỗi xảy ra",

        ephemeral: true

      });

    }

  }
);

// =========================
// START WEBHOOK
// =========================

startServer(client);

// =========================
// LOGIN
// =========================

client.login(
  process.env.TOKEN
);
