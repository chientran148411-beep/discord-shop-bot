require("dotenv").config();

const fs = require("fs");

const path = require("path");

const mongoose =
require("mongoose");

const {

  Client,

  GatewayIntentBits,

  Collection,

  Events

} = require("discord.js");

const client =
new Client({

  intents: [

    GatewayIntentBits.Guilds

  ]

});

client.commands =
new Collection();

// LOAD COMMANDS

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

for (const file of commandFiles) {

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

// HANDLERS

const buttons =
require("./handlers/buttons");

const modals =
require("./handlers/modals");

// READY

client.once(

  Events.ClientReady,

  () => {

    console.log(
      `✅ ${client.user.tag} online`
    );

  }

);

// INTERACTIONS

client.on(

  Events.InteractionCreate,

  async interaction => {

    try {

      // COMMAND

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

      // BUTTON

      else if (
        interaction.isButton()
      ) {

        await buttons(
          interaction
        );

      }

      // MODAL

      else if (
        interaction.isModalSubmit()
      ) {

        await modals(
          interaction
        );

      }

    } catch (err) {

      console.log(err);

      if (
        interaction.replied ||
        interaction.deferred
      ) {

        await interaction.followUp({

          content:
          "❌ Bot lỗi",

          ephemeral: true

        });

      } else {

        await interaction.reply({

          content:
          "❌ Bot lỗi",

          ephemeral: true

        });

      }

    }

  }

);

// MONGO

mongoose.connect(

  process.env.MONGO_URI

).then(() => {

  console.log(
    "✅ MongoDB connected"
  );

});

// LOGIN

client.login(
  process.env.TOKEN
);
