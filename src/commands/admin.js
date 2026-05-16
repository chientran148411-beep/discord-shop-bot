const {

  SlashCommandBuilder,

  EmbedBuilder,

  ActionRowBuilder,

  ButtonBuilder,

  ButtonStyle

} = require("discord.js");

module.exports = {

  data:
  new SlashCommandBuilder()

  .setName("admin")

  .setDescription(
    "Bảng admin shop"
  ),

  async execute(interaction) {

    // CHECK ADMIN

    if (
      interaction.user.id !==
      process.env.ADMIN_ID
    ) {

      return interaction.reply({

        content:
        "❌ Bạn không phải admin",

        ephemeral: true

      });

    }

    // EMBED

    const embed =
    new EmbedBuilder()

    .setColor("#8e44ad")

    .setTitle(
      "⚙️ ADMIN PANEL"
    )

    .setDescription(

`📂 DANH MỤC
• Thêm / Xóa

📦 SẢN PHẨM
• Thêm / Sửa / Bật-Tắt

💰 GIÁ & THỜI GIAN
• Giá và thời gian nằm chung sản phẩm

🔑 KEY
• Nhập / Xem / Xóa

📊 QUẢN LÝ
• Người mua
• Đã bán
• Tồn kho
• Broadcast
• Thống kê`

    );

    // =====================
    // ROW 1
    // =====================

    const row1 =
    new ActionRowBuilder()

    .addComponents(

      new ButtonBuilder()

      .setCustomId(
        "add_category"
      )

      .setLabel(
        "📂 Thêm DM"
      )

      .setStyle(
        ButtonStyle.Success
      ),



      new ButtonBuilder()

      .setCustomId(
        "delete_category"
      )

      .setLabel(
        "🗑️ Xóa DM"
      )

      .setStyle(
        ButtonStyle.Danger
      ),



      new ButtonBuilder()

      .setCustomId(
        "add_product"
      )

      .setLabel(
        "📦 Thêm SP"
      )

      .setStyle(
        ButtonStyle.Primary
      )

    );

    // =====================
    // ROW 2
    // =====================

    const row2 =
    new ActionRowBuilder()

    .addComponents(

      new ButtonBuilder()

      .setCustomId(
        "edit_product"
      )

      .setLabel(
        "✏️ Sửa SP"
      )

      .setStyle(
        ButtonStyle.Secondary
      ),



      new ButtonBuilder()

      .setCustomId(
        "toggle_product"
      )

      .setLabel(
        "🔄 Bật/Tắt"
      )

      .setStyle(
        ButtonStyle.Secondary
      ),



      new ButtonBuilder()

      .setCustomId(
        "edit_price"
      )

      .setLabel(
        "💰 Sửa Giá"
      )

      .setStyle(
        ButtonStyle.Success
      )

    );

    // =====================
    // ROW 3
    // =====================

    const row3 =
    new ActionRowBuilder()

    .addComponents(

      new ButtonBuilder()

      .setCustomId(
        "edit_duration"
      )

      .setLabel(
        "⏰ Sửa TG"
      )

      .setStyle(
        ButtonStyle.Primary
      ),



      new ButtonBuilder()

      .setCustomId(
        "add_key"
      )

      .setLabel(
        "🔑 Nhập Key"
      )

      .setStyle(
        ButtonStyle.Success
      ),



      new ButtonBuilder()

      .setCustomId(
        "view_keys"
      )

      .setLabel(
        "📋 Xem Key"
      )

      .setStyle(
        ButtonStyle.Primary
      )

    );

    // =====================
    // ROW 4
    // =====================

    const row4 =
    new ActionRowBuilder()

    .addComponents(

      new ButtonBuilder()

      .setCustomId(
        "delete_key"
      )

      .setLabel(
        "🗑️ Xóa Key"
      )

      .setStyle(
        ButtonStyle.Danger
      ),



      new ButtonBuilder()

      .setCustomId(
        "stock"
      )

      .setLabel(
        "📦 Tồn Kho"
      )

      .setStyle(
        ButtonStyle.Secondary
      ),



      new ButtonBuilder()

      .setCustomId(
        "buyers"
      )

      .setLabel(
        "👤 Người Mua"
      )

      .setStyle(
        ButtonStyle.Primary
      )

    );

    // =====================
    // ROW 5
    // =====================

    const row5 =
    new ActionRowBuilder()

    .addComponents(

      new ButtonBuilder()

      .setCustomId(
        "sold_products"
      )

      .setLabel(
        "🛒 Đã Bán"
      )

      .setStyle(
        ButtonStyle.Secondary
      ),



      new ButtonBuilder()

      .setCustomId(
        "broadcast"
      )

      .setLabel(
        "📢 Broadcast"
      )

      .setStyle(
        ButtonStyle.Primary
      ),



      new ButtonBuilder()

      .setCustomId(
        "statistics"
      )

      .setLabel(
        "📊 Thống Kê"
      )

      .setStyle(
        ButtonStyle.Success
      )

    );

    // SEND

    await interaction.reply({

      embeds: [embed],

      components: [

        row1,
        row2,
        row3,
        row4,
        row5

      ]

    });

  }

};
