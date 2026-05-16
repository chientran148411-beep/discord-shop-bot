require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Collection,
  Events,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} = require("discord.js");

const mongoose = require("mongoose");

const Category = require("./models/category");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Đã kết nối MongoDB"))
.catch(console.error);

client.once(Events.ClientReady, async () => {
  console.log(`✅ ${client.user.tag} Đang trực tuyến`);
});

client.on(Events.InteractionCreate, async interaction => {

  // =========================
  // /shop
  // =========================

  if (interaction.isChatInputCommand()) {

    if (interaction.commandName === "shop") {

      const categories = await Category.find();

      const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("🛒 KENIOS SHOP")
      .setDescription(`
✨ Chào mừng bạn đến với shop tự động

📂 Chọn danh mục bên dưới
      `);

      let rows = [];

      if (categories.length > 0) {

        const buttons = categories.map(cat =>
          new ButtonBuilder()
          .setCustomId(`category_${cat._id}`)
          .setLabel(cat.name)
          .setStyle(ButtonStyle.Primary)
        );

        for (let i = 0; i < buttons.length; i += 5) {
          rows.push(
            new ActionRowBuilder().addComponents(
              buttons.slice(i, i + 5)
            )
          );
        }

      }

      return interaction.reply({
        embeds: [embed],
        components: rows
      });

    }

    // =========================
    // /admin
    // =========================

    if (interaction.commandName === "admin") {

      if (interaction.user.id !== process.env.ADMIN_ID) {
        return interaction.reply({
          content: "❌ Bạn không phải admin",
          ephemeral: true
        });
      }

      const embed = new EmbedBuilder()
      .setColor("Purple")
      .setTitle("⚙️ ADMIN PANEL")
      .setDescription(`
📦 Sản phẩm
🔑 Kho hàng
👤 User
📊 Thống kê
📂 Danh mục
      `);

      const row1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId("add_category")
        .setLabel("➕ Thêm Danh Mục")
        .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
        .setCustomId("delete_category")
        .setLabel("🗑️ Xóa Danh Mục")
        .setStyle(ButtonStyle.Danger)
      );

      const row2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId("sold_products")
        .setLabel("📦 Đã bán")
        .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
        .setCustomId("buyers")
        .setLabel("👤 Người mua")
        .setStyle(ButtonStyle.Secondary)
      );

      return interaction.reply({
        embeds: [embed],
        components: [row1, row2]
      });

    }

  }

  // =========================
  // BUTTONS
  // =========================

  if (interaction.isButton()) {

    // =========================
    // ADD CATEGORY
    // =========================

    if (interaction.customId === "add_category") {

      const modal = new ModalBuilder()
      .setCustomId("modal_add_category")
      .setTitle("Thêm danh mục");

      const input = new TextInputBuilder()
      .setCustomId("category_name")
      .setLabel("Tên danh mục")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

      const row = new ActionRowBuilder().addComponents(input);

      modal.addComponents(row);

      return interaction.showModal(modal);

    }

    // =========================
    // DELETE CATEGORY
    // =========================

    if (interaction.customId === "delete_category") {

      const categories = await Category.find();

      if (categories.length === 0) {
        return interaction.reply({
          content: "❌ Không có danh mục",
          ephemeral: true
        });
      }

      const buttons = categories.map(cat =>
        new ButtonBuilder()
        .setCustomId(`delete_${cat._id}`)
        .setLabel(cat.name)
        .setStyle(ButtonStyle.Danger)
      );

      const rows = [];

      for (let i = 0; i < buttons.length; i += 5) {
        rows.push(
          new ActionRowBuilder().addComponents(
            buttons.slice(i, i + 5)
          )
        );
      }

      return interaction.reply({
        content: "🗑️ Chọn danh mục cần xóa",
        components: rows,
        ephemeral: true
      });

    }

    // =========================
    // OPEN CATEGORY
    // =========================

    if (interaction.customId.startsWith("category_")) {

      const id = interaction.customId.split("_")[1];

      const category = await Category.findById(id);

      if (!category) {
        return interaction.reply({
          content: "❌ Không tìm thấy danh mục",
          ephemeral: true
        });
      }

      return interaction.reply({
        content: `📂 Bạn đã chọn danh mục: ${category.name}`,
        ephemeral: true
      });

    }

    // =========================
    // DELETE SELECTED
    // =========================

    if (interaction.customId.startsWith("delete_")) {

      const id = interaction.customId.split("_")[1];

      await Category.findByIdAndDelete(id);

      return interaction.update({
        content: "✅ Đã xóa danh mục",
        components: []
      });

    }

    // =========================
    // SOLD PRODUCTS
    // =========================

    if (interaction.customId === "sold_products") {

      return interaction.reply({
        content: "📦 Chưa có sản phẩm bán",
        ephemeral: true
      });

    }

    // =========================
    // BUYERS
    // =========================

    if (interaction.customId === "buyers") {

      return interaction.reply({
        content: "👤 Chưa có người mua",
        ephemeral: true
      });

    }

  }

  // =========================
  // MODAL SUBMIT
  // =========================

  if (interaction.isModalSubmit()) {

    if (interaction.customId === "modal_add_category") {

      const name = interaction.fields.getTextInputValue("category_name");

      const check = await Category.findOne({ name });

      if (check) {
        return interaction.reply({
          content: "❌ Danh mục đã tồn tại",
          ephemeral: true
        });
      }

      await Category.create({
        name
      });

      return interaction.reply({
        content: `✅ Đã thêm danh mục: ${name}`,
        ephemeral: true
      });

    }

  }

});

// =========================
// REGISTER COMMANDS
// =========================

client.on("ready", async () => {

  const guild = client.guilds.cache.get(process.env.GUILD_ID);

  if (!guild) return;

  await guild.commands.create({
    name: "shop",
    description: "Mở shop"
  });

  await guild.commands.create({
    name: "admin",
    description: "Admin panel"
  });

  console.log("✅ Đã tải lệnh");
});

client.login(process.env.TOKEN);
