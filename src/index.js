require("dotenv").config();

const express = require("express");
const app = express();

const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require("discord.js");

// =========================
// DISCORD CLIENT
// =========================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// =========================
// READY
// =========================

client.once("ready", () => {
  console.log(`✅ ${client.user.tag} online`);
});

// =========================
// COMMAND SHOP
// =========================

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!shop") {

    const embed = new EmbedBuilder()
      .setTitle("🛒 KENIOS SHOP")
      .setDescription("✨ Chào mừng đến shop tự động\n\n📂 Chọn danh mục bên dưới")
      .setColor("Blue");

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("pubg")
        .setLabel("PUBG")
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId("admin")
        .setLabel("ADMIN")
        .setStyle(ButtonStyle.Danger)
    );

    await message.channel.send({
      embeds: [embed],
      components: [row]
    });
  }
});

// =========================
// BUTTON
// =========================

client.on("interactionCreate", async (interaction) => {

  if (!interaction.isButton()) return;

  if (interaction.customId === "pubg") {

    await interaction.reply({
      content: "📦 Danh mục PUBG",
      ephemeral: true
    });
  }

  if (interaction.customId === "admin") {

    await interaction.reply({
      content: "🛠️ Khu ADMIN",
      ephemeral: true
    });
  }
});

// =========================
// WEB SERVER
// =========================

app.get("/", (req, res) => {
  res.send("KENIOS ONLINE");
});

// =========================
// LOGIN
// =========================

client.login(process.env.TOKEN);

// =========================
// PORT
// =========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Webhook online ${PORT}`);
});
