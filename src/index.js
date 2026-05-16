require("dotenv").config();

const fs = require("fs");

const path = require("path");

const {
Client,
GatewayIntentBits,
Collection
} = require("discord.js");

const client =
new Client({

intents: [

GatewayIntentBits.Guilds

]

});

client.commands =
new Collection();

// DATABASE

require("./config/database")();

// LOAD COMMANDS

const commandFiles =
fs.readdirSync(
"./src/commands"
)

.filter(file =>
file.endsWith(".js")
);

for (const file of commandFiles) {

const command =
require(`./commands/${file}`);

client.commands.set(
command.data.name,
command
);

}

// EVENTS

require("./handlers/interactionCreate")(client);

require("./handlers/modalHandler")(client);

require("./handlers/adminPanel")(client);

client.once(
"ready",
() => {

console.log(
`✅ ${client.user.tag} online`
);

}
);

client.login(
process.env.TOKEN
);
