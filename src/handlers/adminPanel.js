const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("admin")
    .setDescription("Bảng điều khiển admin"),

  async execute(interaction) {

    // CHECK ADMIN
    if (interaction.user.id !== process.env.ADMIN_ID) {
      return interaction.reply({
        content: "❌ Bạn không có quyền dùng lệnh này",
        ephemeral: true
      });
    }

    // EMBED
    const embed = new EmbedBuilder()
      .setColor("#2b2d31")
      .setTitle("⚙️ ADMIN PANEL")
      .setDescription(`
📦 **Sản phẩm**
• Thêm / sửa / bật-tắt sản phẩm

🔑 **Kho hàng**
• Nhập tài khoản / xem / xóa tài khoản

👤 **Người dùng**
• Kiểm tra người mua / đơn hàng

📢 **Tiện ích**
• Broadcast / thống kê / nội dung bot
      `);

    // HÀNG 1
    const row1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("add_product")
        .setLabel("➕ Thêm SP")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId("edit_product")
        .setLabel("✏️ Sửa SP")
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId("toggle_product")
        .setLabel("🔄 Bật/Tắt")
        .setStyle(ButtonStyle.Secondary)
    );

    // HÀNG 2
    const row2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("change_price")
        .setLabel("💰 Sửa Giá")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId("add_stock")
        .setLabel("🔑 Nhập TK")
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId("view_stock")
        .setLabel("📋 Xem Kho")
        .setStyle(ButtonStyle.Secondary)
    );

    // HÀNG 3
    const row3 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("delete_stock")
        .setLabel("🗑️ Xóa TK")
        .setStyle(ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId("orders")
        .setLabel("🧾 Đơn Hàng")
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId("statistics")
        .setLabel("📊 Thống Kê")
        .setStyle(ButtonStyle.Success)
    );

    // HÀNG 4
    const row4 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("add_category")
        .setLabel("📁 Thêm DM")
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId("delete_category")
        .setLabel("❌ Xóa DM")
        .setStyle(ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId("broadcast")
        .setLabel("📢 Broadcast")
        .setStyle(ButtonStyle.Secondary)
    );

    // HÀNG 5
    const row5 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("check_user")
        .setLabel("👤 Người Đã Mua")
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId("sold_products")
        .setLabel("📦 Đã Bán")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId("stock_count")
        .setLabel("📊 Tồn Kho")
        .setStyle(ButtonStyle.Secondary)
    );

    // HÀNG 6
    const row6 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("bot_message")
        .setLabel("⚙️ Nội Dung Bot")
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("reload_shop")
        .setLabel("🔄 Reload Shop")
        .setStyle(ButtonStyle.Primary)
    );

    // SEND
    await interaction.reply({
      embeds: [embed],
      components: [row1, row2, row3, row4, row5, row6]
    });

  }
};
