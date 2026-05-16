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

// =====================
// EXPRESS
// =====================

app.get("/", (req, res) => {
  res.send("KENIOS ONLINE");
});

// =====================
// CLIENT
// =====================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// =====================
// READY
// =====================

client.once("clientReady", () => {

  console.log(`✅ ${client.user.tag} ONLINE`);

});

// =====================
// DATABASE TẠM
// =====================

const categories = [
  {
    id: "pubg",
    name: "PUBG",
    desc: "Danh mục PUBG"
  }
];

const products = [
  {
    id: "uc60",
    category: "PUBG",
    name: "60 UC",
    price: "20.000đ",
    desc: "Nạp UC PUBG"
  }
];

// =====================
// COMMAND
// =====================

client.on("messageCreate", async (message) => {

  if (message.author.bot) return;

  if (message.content === "!shop") {

    const embed = new EmbedBuilder()
      .setTitle("🛒 KENIOS SHOP")
      .setDescription(
        "✨ Chào mừng đến shop tự động\n\n📂 Chọn danh mục bên dưới"
      )
      .setColor("Blue");

    const row = new ActionRowBuilder();

    categories.forEach((cat) => {

      row.addComponents(

        new ButtonBuilder()
          .setCustomId(`category_${cat.id}`)
          .setLabel(cat.name)
          .setStyle(ButtonStyle.Primary)

      );

    });

    await message.channel.send({
      embeds: [embed],
      components: [row]
    });

  }

});

// =====================
// BUTTON
// =====================

client.on("interactionCreate", async (interaction) => {

  try {

    if (!interaction.isButton()) return;

    // =====================
    // CATEGORY
    // =====================

    if (interaction.customId.startsWith("category_")) {

      const id =
        interaction.customId.replace("category_", "");

      const category =
        categories.find(x => x.id === id);

      if (!category) {

        return interaction.reply({
          content: "❌ Không tìm thấy danh mục",
          ephemeral: true
        });

      }

      const embed = new EmbedBuilder()
        .setTitle(`📂 ${category.name}`)
        .setDescription(category.desc)
        .setColor("Blue");

      const row = new ActionRowBuilder();

      const categoryProducts =
        products.filter(
          x => x.category === category.name
        );

      categoryProducts.forEach((p) => {

        row.addComponents(

          new ButtonBuilder()
            .setCustomId(`product_${p.id}`)
            .setLabel(p.name)
            .setStyle(ButtonStyle.Secondary)

        );

      });

      await interaction.reply({
        embeds: [embed],
        components: [row],
        ephemeral: true
      });

    }

    // =====================
    // PRODUCT
    // =====================

    if (interaction.customId.startsWith("product_")) {

      const id =
        interaction.customId.replace("product_", "");

      const product =
        products.find(x => x.id === id);

      if (!product) {

        return interaction.reply({
          content: "❌ Không tìm thấy sản phẩm",
          ephemeral: true
        });

      }

      const embed = new EmbedBuilder()
        .setTitle(product.name)
        .addFields(
          {
            name: "💰 Giá",
            value: product.price
          },
          {
            name: "📝 Mô tả",
            value: product.desc
          }
        )
        .setColor("Green");

      await interaction.reply({
        embeds: [embed],
        ephemeral: true
      });

    }

  }

  catch (err) {

    console.log("BUTTON ERROR:");
    console.log(err);

  }

});

// =====================
// LOGIN
// =====================

client.login(process.env.TOKEN);

// =====================
// PORT
// =====================

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

  console.log(`✅ WEB ONLINE ${PORT}`);

});
