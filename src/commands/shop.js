const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const Category = require("../models/category");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Mở shop"),

  async execute(interaction) {

    // LẤY DANH MỤC TỪ DATABASE
    const categories = await Category.find();

    // NẾU KHÔNG CÓ
    if (categories.length === 0) {
      return interaction.reply({
        content: "❌ Chưa có danh mục nào",
        ephemeral: true
      });
    }

    // EMBED
    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("🛒 KENIOS SHOP")
      .setDescription(`
✨ Chào mừng bạn đến với shop tự động

📂 Chọn danh mục bên dưới
      `);

    // TẠO NÚT TỰ ĐỘNG
    const buttons = [];

    categories.forEach((cat) => {

      buttons.push(
        new ButtonBuilder()
          .setCustomId(`category_${cat._id}`)
          .setLabel(cat.name)
          .setStyle(ButtonStyle.Primary)
      );

    });

    // CHIA HÀNG
    const rows = [];

    for (let i = 0; i < buttons.length; i += 5) {

      rows.push(
        new ActionRowBuilder().addComponents(
          buttons.slice(i, i + 5)
        )
      );

    }

    // GỬI
    await interaction.reply({
      embeds: [embed],
      components: rows
    });

  }
};
