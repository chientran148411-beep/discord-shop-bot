require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
  Client,
  Collection,
  GatewayIntentBits
} = require("discord.js");

const mongoose = require("mongoose");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.commands = new Collection();



// =========================
// LOAD COMMANDS
// =========================

const commandsPath = path.join(
  __dirname,
  "commands"
);

const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

  const command = require(
    path.join(commandsPath, file)
  );

  client.commands.set(
    command.data.name,
    command
  );

}

console.log("✅ Đã tải commands");



// =========================
// LOAD INTERACTION HANDLER
// =========================

const interactionHandler = require(
  "./handlers/interactionCreate"
);

client.on(
  "interactionCreate",
  interactionHandler
);



// =========================
// READY
// =========================

client.once("ready", () => {

  console.log(
    `✅ ${client.user.tag} online`
  );

});



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
// SLASH COMMANDS
// =========================

client.on(
  "interactionCreate",
  async interaction => {

    if (
      !interaction.isChatInputCommand()
    ) return;

    const command =
      client.commands.get(
        interaction.commandName
      );

    if (!command) return;

    try {

      await command.execute(
        interaction,
        client
      );

    } catch (error) {

      console.log(error);

      if (interaction.replied) {

        await interaction.followUp({

          content:
          "❌ Có lỗi xảy ra",

          ephemeral: true

        });

      } else {

        await interaction.reply({

          content:
          "❌ Có lỗi xảy ra",

          ephemeral: true

        });

      }

    }

  }
);



// =========================
// LOGIN
// =========================

client.login(
  process.env.TOKEN
);
