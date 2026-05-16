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

  .setColor("Purple")

  .setTitle(
    "⚙️ ADMIN PANEL"
  )

  .setDescription(`
📦 Quản lý sản phẩm
🔑 Quản lý tài khoản
📂 Quản lý danh mục
📊 Thống kê hệ thống
  `);

  const row1 =
  new ActionRowBuilder()

  .addComponents(

    new ButtonBuilder()

    .setCustomId(
      "add_category"
    )

    .setLabel(
      "➕ Thêm DM"
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
    )

  );

  const row2 =
  new ActionRowBuilder()

  .addComponents(

    new ButtonBuilder()

    .setCustomId(
      "buyers"
    )

    .setLabel(
      "👤 Người mua"
    )

    .setStyle(
      ButtonStyle.Primary
    ),



    new ButtonBuilder()

    .setCustomId(
      "sold_products"
    )

    .setLabel(
      "📦 Đã bán"
    )

    .setStyle(
      ButtonStyle.Secondary
    )

  );

  return interaction.reply({

    embeds: [embed],

    components: [
      row1,
      row2
    ]

  });

};
