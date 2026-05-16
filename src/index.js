require('dotenv').config();

const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');

const {
  Client,
  Collection,
  GatewayIntentBits
} = require('discord.js');

const User = require('./database/User');
const Transaction = require('./database/Transaction');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

const folders = fs.readdirSync('./src/commands');

for (const folder of folders) {

  const commandFiles = fs
    .readdirSync(`./src/commands/${folder}`)
    .filter(f => f.endsWith('.js'));

  for (const file of commandFiles) {

    const command = require(`./commands/${folder}/${file}`);

    client.commands.set(command.data.name, command);

  }

}

const eventFiles = fs
  .readdirSync('./src/events')
  .filter(f => f.endsWith('.js'));

for (const file of eventFiles) {

  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }

}

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'));

const app = express();

app.use(express.json());

app.post('/webhook/sepay', async (req, res) => {

  const data = req.body;

  try {

    const transactionId = data.id;

    const exists = await Transaction.findOne({
      transactionId
    });

    if (exists) {
      return res.sendStatus(200);
    }

    const content = data.content || '';

    if (!content.includes('NAPTIEN_')) {
      return res.sendStatus(200);
    }

    const userId = content.split('NAPTIEN_')[1];

    let user = await User.findOne({ userId });

    if (!user) {

      user = await User.create({
        userId,
        balance: 0
      });

    }

    user.balance += data.transferAmount;

    await user.save();

    await Transaction.create({
      transactionId,
      amount: data.transferAmount,
      userId
    });

    const discordUser = await client.users.fetch(userId);

    discordUser.send(
      `✅ Nạp thành công ${data.transferAmount} VNĐ`
    );

  } catch (err) {

    console.log(err);

  }

  res.sendStatus(200);

});

app.listen(3000, () => {
  console.log('Webhook Running');
});

client.login(process.env.TOKEN);
