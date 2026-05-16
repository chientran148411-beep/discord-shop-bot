require("dotenv").config();

const fs = require("fs");

const path = require("path");

const {
Client,
GatewayIntentBits,
Collection
} = require("discord.js");

const mongoose = require("mongoose");

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages
]
});

client.commands = new Collection();

const commandFiles =
fs.readdirSync(
path.join(__dirname, "commands")
).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

const command =
require(`./commands/${file}`);

client.commands.set(
command.data.name,
command
);

}

require("./handlers/interactionCreate")(client);

require("./handlers/modalHandler")(client);

mongoose.connect(process.env.MONGO_URI)

.then(() => {

console.log("✅ MongoDB Connected");

})

.catch(console.error);

client.once("ready", () => {

console.log(`✅ ${client.user.tag} Online`);

});

client.login(process.env.TOKEN);
