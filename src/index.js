require("dotenv").config();

const express = require("express");
const app = express();

const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} = require("discord.js");

// =====================
// EXPRESS
// =====================

app.use(express.json());

app.get("/", (req, res) => {
  res.send("KENIOS SHOP ONLINE");
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
// DATABASE TẠM
// =====================

const categories = [];
const products = [];

// =====================
// READY
// =====================

client.once("clientReady", () => {

  console.log(`✅ ${client.user.tag} ONLINE`);

});

// =====================
// COMMAND
// =====================

client.on("messageCreate", async (message) => {

  if (message.author.bot) return;

  if (message.content === "!shop") {

    const embed = new EmbedBuilder()
      .setTitle("🛒 KENIOS SHOP")
      .setDescription("✨ Shop tự động\n\n📂 Chọn danh mục bên dưới")
      .setColor("Blue");

    const row = new ActionRowBuilder();

    // CATEGORY BUTTONS

    categories.slice(0, 3).forEach((cat) => {

      row.addComponents(

        new ButtonBuilder()
          .setCustomId(`category_${cat.id}`)
          .setLabel(cat.name)
          .setStyle(ButtonStyle.Primary)

      );

    });

    // ADMIN BUTTONS

    row.addComponents(

      new ButtonBuilder()
        .setCustomId("add_category")
        .setLabel("➕ DANH MỤC")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId("add_product")
        .setLabel("🛒 SẢN PHẨM")
        .setStyle(ButtonStyle.Danger)

    );

    await message.channel.send({
      embeds: [embed],
      components: [row]
    });

  }

});

// =====================
// INTERACTION
// =====================

client.on("interactionCreate", async (interaction) => {

  try {

    // =====================
    // BUTTON
    // =====================

    if (interaction.isButton()) {

      // =====================
      // ADD CATEGORY
      // =====================

      if (interaction.customId === "add_category") {

        const modal = new ModalBuilder()
          .setCustomId("create_category")
          .setTitle("Tạo Danh Mục");

        const input = new TextInputBuilder()
          .setCustomId("category_name")
          .setLabel("Tên danh mục")
          .setStyle(TextInputStyle.Short);

        modal.addComponents(
          new ActionRowBuilder().addComponents(input)
        );

        await interaction.showModal(modal);

        return;
      }

      // =====================
      // ADD PRODUCT
      // =====================

      if (interaction.customId === "add_product") {

        const modal = new ModalBuilder()
          .setCustomId("create_product")
          .setTitle("Tạo Sản Phẩm");

        const name = new TextInputBuilder()
          .setCustomId("product_name")
          .setLabel("Tên sản phẩm")
          .setStyle(TextInputStyle.Short);

        const price = new TextInputBuilder()
          .setCustomId("product_price")
          .setLabel("Giá")
          .setStyle(TextInputStyle.Short);

        const desc = new TextInputBuilder()
          .setCustomId("product_desc")
          .setLabel("Mô tả")
          .setStyle(TextInputStyle.Paragraph);

        modal.addComponents(
          new ActionRowBuilder().addComponents(name),
          new ActionRowBuilder().addComponents(price),
          new ActionRowBuilder().addComponents(desc)
        );

        await interaction.showModal(modal);

        return;
      }

      // =====================
      // OPEN CATEGORY
      // =====================

      if (interaction.customId.startsWith("category_")) {

        const id = interaction.customId.replace("category_", "");

        const category = categories.find(
          x => x.id === id
        );

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

        const categoryProducts = products.filter(
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
          components: row.components.length ? [row] : [],
          ephemeral: true
        });

        return;
      }

      // =====================
      // OPEN PRODUCT
      // =====================

      if (interaction.customId.startsWith("product_")) {

        const id = interaction.customId.replace("product_", "");

        const product = products.find(
          x => x.id === id
        );

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

    // =====================
    // MODAL SUBMIT
    // =====================

    if (interaction.isModalSubmit()) {

      // =====================
      // CREATE CATEGORY
      // =====================

      if (interaction.customId === "create_category") {

        const name =
          interaction.fields.getTextInputValue(
            "category_name"
          );

        categories.push({
          id: Date.now().toString(),
          name,
          desc: "Danh mục mới"
        });

        await interaction.reply({
          content: `✅ Đã tạo danh mục ${name}`,
          ephemeral: true
        });

        return;
      }

      // =====================
      // CREATE PRODUCT
      // =====================

      if (interaction.customId === "create_product") {

        const name =
          interaction.fields.getTextInputValue(
            "product_name"
          );

        const price =
          interaction.fields.getTextInputValue(
            "product_price"
          );

        const desc =
          interaction.fields.getTextInputValue(
            "product_desc"
          );

        let categoryName = "Chưa phân loại";

        if (categories.length > 0) {
          categoryName = categories[0].name;
        }

        products.push({
          id: Date.now().toString(),
          name,
          price,
          desc,
          category: categoryName
        });

        await interaction.reply({
          content: `✅ Đã tạo sản phẩm ${name}`,
          ephemeral: true
        });

      }

    }

  }

  catch (err) {

    console.log("ERROR:", err);

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
