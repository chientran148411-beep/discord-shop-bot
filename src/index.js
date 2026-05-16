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

// ======================
// EXPRESS
// ======================

app.use(express.json());

app.get("/", (req, res) => {
  res.send("KENIOS SHOP ONLINE");
});

// ======================
// DISCORD CLIENT
// ======================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ======================
// DATABASE TẠM
// ======================

const categories = [];
const products = [];

// ======================
// READY
// ======================

client.once("clientReady", () => {

  console.log(`✅ ${client.user.tag} đang trực tuyến`);

});

// ======================
// COMMANDS
// ======================

client.on("messageCreate", async (message) => {

  if (message.author.bot) return;

  // ======================
  // !SHOP
  // ======================

  if (message.content === "!shop") {

    const embed = new EmbedBuilder()
      .setTitle("🛒 KENIOS SHOP")
      .setDescription(
        "📂 Chọn danh mục hoặc thêm mới bên dưới"
      )
      .setColor("Blue");

    const row = new ActionRowBuilder();

    // ======================
    // DANH MỤC
    // ======================

    categories.slice(0, 3).forEach((cat) => {

      row.addComponents(

        new ButtonBuilder()
          .setCustomId(`category_${cat.id}`)
          .setLabel(cat.name)
          .setStyle(ButtonStyle.Primary)

      );

    });

    // ======================
    // NÚT THÊM
    // ======================

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

// ======================
// INTERACTION
// ======================

client.on("interactionCreate", async (interaction) => {

  // ======================
  // BUTTON
  // ======================

  if (interaction.isButton()) {

    // ======================
    // THÊM DANH MỤC
    // ======================

    if (interaction.customId === "add_category") {

      const modal = new ModalBuilder()
        .setCustomId("create_category")
        .setTitle("Tạo Danh Mục");

      const nameInput = new TextInputBuilder()
        .setCustomId("category_name")
        .setLabel("Tên danh mục")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const descInput = new TextInputBuilder()
        .setCustomId("category_desc")
        .setLabel("Mô tả")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const row1 =
        new ActionRowBuilder().addComponents(nameInput);

      const row2 =
        new ActionRowBuilder().addComponents(descInput);

      modal.addComponents(row1, row2);

      await interaction.showModal(modal);

      return;

    }

    // ======================
    // THÊM SẢN PHẨM
    // ======================

    if (interaction.customId === "add_product") {

      const modal = new ModalBuilder()
        .setCustomId("create_product")
        .setTitle("Tạo Sản Phẩm");

      const nameInput = new TextInputBuilder()
        .setCustomId("product_name")
        .setLabel("Tên sản phẩm")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const priceInput = new TextInputBuilder()
        .setCustomId("product_price")
        .setLabel("Giá")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const descInput = new TextInputBuilder()
        .setCustomId("product_desc")
        .setLabel("Mô tả")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const row1 =
        new ActionRowBuilder().addComponents(nameInput);

      const row2 =
        new ActionRowBuilder().addComponents(priceInput);

      const row3 =
        new ActionRowBuilder().addComponents(descInput);

      modal.addComponents(row1, row2, row3);

      await interaction.showModal(modal);

      return;

    }

    // ======================
    // MỞ DANH MỤC
    // ======================

    if (interaction.customId.startsWith("category_")) {

      const id =
        interaction.customId.replace("category_", "");

      const category =
        categories.find(x => x.id === id);

      if (!category) return;

      const embed = new EmbedBuilder()
        .setTitle(`📂 ${category.name}`)
        .setDescription(category.desc)
        .setColor("Blue");

      const row = new ActionRowBuilder();

      const categoryProducts =
        products.filter(x => x.category === category.name);

      if (categoryProducts.length === 0) {

        embed.addFields({
          name: "❌ Trống",
          value: "Chưa có sản phẩm"
        });

      } else {

        categoryProducts.slice(0, 5).forEach((product) => {

          row.addComponents(

            new ButtonBuilder()
              .setCustomId(`product_${product.id}`)
              .setLabel(product.name)
              .setStyle(ButtonStyle.Secondary)

          );

        });

      }

      await interaction.reply({
        embeds: [embed],
        components: row.components.length ? [row] : [],
        ephemeral: true
      });

      return;

    }

    // ======================
    // MỞ SẢN PHẨM
    // ======================

    if (interaction.customId.startsWith("product_")) {

      const id =
        interaction.customId.replace("product_", "");

      const product =
        products.find(x => x.id === id);

      if (!product) return;

      const embed = new EmbedBuilder()
        .setTitle(`🛒 ${product.name}`)
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

  // ======================
  // MODAL SUBMIT
  // ======================

  if (interaction.isModalSubmit()) {

    // ======================
    // TẠO DANH MỤC
    // ======================

    if (interaction.customId === "create_category") {

      const name =
        interaction.fields.getTextInputValue("category_name");

      const desc =
        interaction.fields.getTextInputValue("category_desc");

      categories.push({
        id: Date.now().toString(),
        name,
        desc
      });

      await interaction.reply({
        content:
          `✅ Đã tạo danh mục: ${name}\n\n🔄 Gõ lại !shop để cập nhật`,
        ephemeral: true
      });

      return;

    }

    // ======================
    // TẠO SẢN PHẨM
    // ======================

    if (interaction.customId === "create_product") {

      const name =
        interaction.fields.getTextInputValue("product_name");

      const price =
        interaction.fields.getTextInputValue("product_price");

      const desc =
        interaction.fields.getTextInputValue("product_desc");

      // TỰ GÁN VÀO DANH MỤC ĐẦU TIÊN

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
        content:
          `✅ Đã thêm sản phẩm: ${name}\n📂 Danh mục: ${categoryName}`,
        ephemeral: true
      });

    }

  }

});

// ======================
// LOGIN
// ======================

client.login(process.env.TOKEN);

// ======================
// PORT
// ======================

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

  console.log(`✅ Webhook trực tuyến ${PORT}`);

});
