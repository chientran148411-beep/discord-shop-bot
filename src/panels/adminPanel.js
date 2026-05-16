const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = async (
  interaction
) => {

  if (
    interaction.user.id !==
    process.env.ADMIN_ID
  ) {

    return interaction.reply({

      content:
      "❌ Không phải admin",

      ephemeral: true

    });

  }

  const embed =
  new EmbedBuilder()

  .setColor("#8e44ad")

  .setTitle(
    "⚙️ ADMIN PANEL"
  )

  .setDescription(`

📦 Sản phẩm:
• Thêm / Sửa / Bật-Tắt sản phẩm

🔑 Kho hàng:
• Nhập key / Xem & xóa key

👤 User:
• Nạp credit cho user

📢 Tiện ích:
• Broadcast / Thống kê

📂 Danh mục:
• Thêm / Xóa danh mục

🛒 Đơn hàng:
• Xem người mua
• Sản phẩm đã bán

  `);

  // ROW 1

  const row1 =
  new ActionRowBuilder()

  .addComponents(

    new ButtonBuilder()

    .setCustomId("add_product")

    .setLabel("➕ Thêm SP")

    .setStyle(
      ButtonStyle.Success
    ),



    new ButtonBuilder()

    .setCustomId("edit_product")

    .setLabel("✏️ Sửa SP")

    .setStyle(
      ButtonStyle.Primary
    ),



    new ButtonBuilder()

    .setCustomId("toggle_product")

    .setLabel("🔄 Bật/Tắt")

    .setStyle(
      ButtonStyle.Secondary
    )

  );

  // ROW 2

  const row2 =
  new ActionRowBuilder()

  .addComponents(

    new ButtonBuilder()

    .setCustomId("add_key")

    .setLabel("🔑 Nhập Key")

    .setStyle(
      ButtonStyle.Success
    ),



    new ButtonBuilder()

    .setCustomId("view_keys")

    .setLabel("📋 Xem Key")

    .setStyle(
      ButtonStyle.Primary
    ),



    new ButtonBuilder()

    .setCustomId("stock")

    .setLabel("📦 Tồn Kho")

    .setStyle(
      ButtonStyle.Secondary
    )

  );

  // ROW 3

  const row3 =
  new ActionRowBuilder()

  .addComponents(

    new ButtonBuilder()

    .setCustomId("add_category")

    .setLabel("📂 Thêm DM")

    .setStyle(
      ButtonStyle.Success
    ),



    new ButtonBuilder()

    .setCustomId("delete_category")

    .setLabel("🗑️ Xóa DM")

    .setStyle(
      ButtonStyle.Danger
    ),



    new ButtonBuilder()

    .setCustomId("buyers")

    .setLabel("👤 Người mua")

    .setStyle(
      ButtonStyle.Primary
    )

  );

  // ROW 4

  const row4 =
  new ActionRowBuilder()

  .addComponents(

    new ButtonBuilder()

    .setCustomId("sold_products")

    .setLabel("🛒 Đã bán")

    .setStyle(
      ButtonStyle.Secondary
    ),



    new ButtonBuilder()

    .setCustomId("broadcast")

    .setLabel("📢 Broadcast")

    .setStyle(
      ButtonStyle.Primary
    ),



    new ButtonBuilder()

    .setCustomId("stats")

    .setLabel("📊 Thống kê")

    .setStyle(
      ButtonStyle.Success
    )

  );

  return interaction.reply({

    embeds: [embed],

    components: [
      row1,
      row2,
      row3,
      row4
    ]

  });

};
