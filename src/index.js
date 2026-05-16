require("dotenv").config();

const fs =
require("fs");

const path =
require("path");

const mongoose =
require("mongoose");

const {

  Client,

  Collection,

  GatewayIntentBits,

  Events

} = require("discord.js");

// ======================
// CLIENT
// ======================

const client =
new Client({

  intents: [

    GatewayIntentBits.Guilds,

    GatewayIntentBits.GuildMessages,

    GatewayIntentBits.MessageContent

  ]

});

// ======================
// COLLECTION
// ======================

client.commands =
new Collection();

// ======================
// LOAD COMMANDS
// ======================

const commandsPath =
path.join(
  __dirname,
  "commands"
);

const commandFiles =
fs.readdirSync(commandsPath)

.filter(file =>
  file.endsWith(".js")
);

for (
  const file of commandFiles
) {

  const command =
  require(
    path.join(
      commandsPath,
      file
    )
  );

  client.commands.set(

    command.data.name,

    command

  );

}

console.log(
  "✅ Đã tải các lệnh gạch chéo"
);

// ======================
// LOAD HANDLERS
// ======================

const buttonsHandler =
require(
  "./handlers/buttons"
);

const modalsHandler =
require(
  "./handlers/modals"
);

// ======================
// READY
// ======================

client.once(

  Events.ClientReady,

  () => {

    console.log(

      `✅ ${client.user.tag} Đang trực tuyến`

    );

  }

);

// ======================
// INTERACTION CREATE
// ======================

client.on(

  Events.InteractionCreate,

  async interaction => {

    try {

      // ==================
      // SLASH COMMAND
      // ==================

      if (
        interaction.isChatInputCommand()
      ) {

        const command =
        client.commands.get(
          interaction.commandName
        );

        if (!command)
          return;

        await command.execute(
          interaction
        );

      }

      // ==================
      // BUTTON
      // ==================

      else if (
        interaction.isButton()
      ) {

        await buttonsHandler(
          interaction
        );

      }

      // ==================
      // MODAL
      // ==================

      else if (
        interaction.isModalSubmit()
      ) {

        await modalsHandler(
          interaction
        );

      }

    } catch (err) {

      console.log(err);

      // ==================
      // ERROR REPLY
      // ==================

      if (
        interaction.replied ||
        interaction.deferred
      ) {

        await interaction.followUp({

          content:
          "❌ Bot đang gặp lỗi",

          ephemeral: true

        });

      } else {

        await interaction.reply({

          content:
          "❌ Bot đang gặp lỗi",

          ephemeral: true

        });

      }

    }

  }

);

// ======================
// MONGODB
// ======================

mongoose.connect(

  process.env.MONGO_URI

).then(() => {

  console.log(
    "✅ Đã kết nối MongoDB"
  );

}).catch(err => {

  console.log(err);

});

// ======================
// LOGIN
// ======================

client.login(

  process.env.TOKEN

);
