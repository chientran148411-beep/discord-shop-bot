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
// EXPRESS
// =========================

app.use(express.json());

app.get("/", (req, res) => {
  res.send("KENIOS ONLINE");
});

app.get("/sepay-webhook", (req, res) => {
  res.send("Webhook OK");
});

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

client.once("clientReady", () => {
  console.log(`✅ ${client.user.tag} đang trực tuyến`);
});

// =========================
// MESSAGE COMMAND
// =========================

client.on("messageCreate", async (message) => {

  if (message.author.bot) return;

  if (message.content === "!shop") {

    const embed = new EmbedBuilder()
      .setTitle("🛒 KENIOS SHOP")
      .setDescription(
        "✨ Chào mừng đến shop tự động\n\n📂 Chọn danh mục bên dưới"
      )
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
// BUTTON INTERACTION
// =========================

client.on("interactionCreate", async (interaction) => {

  if (!interaction.isButton()) return;

  try {

    // PUBG
    if (interaction.customId === "pubg") {

      await interaction.deferReply({
        ephemeral: true
      });

      await interaction.editReply({
        content: "📦 Danh mục PUBG"
      });

    }

    // ADMIN
    if (interaction.customId === "admin") {

      await interaction.deferReply({
        ephemeral: true
      });

      await interaction.editReply({
        content: "🛠️ Khu ADMIN"
      });

    }

  } catch (err) {

    console.log("BUTTON ERROR:", err);

  }

});

// =========================
// LOGIN
// =========================

client.login(process.env.TOKEN);

// =========================
// PORT
// =========================

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`✅ Webhook trực tuyến ${PORT}`);
});
