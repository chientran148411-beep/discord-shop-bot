const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const Category =
require("../models/Category");

const Product =
require("../models/Product");

module.exports =
async (interaction) => {

  // =========================
  // SHOP
  // =========================

  if (
    interaction.customId ===
    "shop_menu"
  ) {

    const categories =
    await Category.find();

    const row =
    new ActionRowBuilder();

    categories.forEach(cat => {

      row.addComponents(

        new ButtonBuilder()

        .setCustomId(
          `category_${cat.name}`
        )

        .setLabel(cat.name)

        .setStyle(
          ButtonStyle.Primary
        )

      );

    });

    const embed =
    new EmbedBuilder()

    .setColor("#5865F2")

    .setTitle(
      "🛒 KENIOS SHOP"
    )

    .setDescription(
`✨ Chào mừng đến shop tự động

📂 Chọn danh mục bên dưới`
    );

    return interaction.reply({

      embeds: [embed],

      components: [row]

    });

  }

  // =========================
  // CATEGORY
  // =========================

  if (
    interaction.customId.startsWith(
      "category_"
    )
  ) {

    const category =
    interaction.customId.replace(
      "category_",
      ""
    );

    const products =
    await Product.find({
      category
    });

    if (!products.length) {

      return interaction.reply({

        content:
        "❌ Danh mục chưa có sản phẩm",

        ephemeral: true

      });

    }

    const rows = [];

    products.forEach(product => {

      const embed =
      new EmbedBuilder()

      .setColor("#2ecc71")

      .setTitle(
        `📦 ${product.name}`
      )

      .setDescription(
`💰 Giá:
${product.price}

⏰ Thời gian:
${product.duration}`
      );

      const row =
      new ActionRowBuilder()

      .addComponents(

        new ButtonBuilder()

        .setCustomId(
          `buy_${product._id}`
        )

        .setLabel(
          "💳 Mua Ngay"
        )

        .setStyle(
          ButtonStyle.Success
        )

      );

      rows.push({
        embeds: [embed],
        components: [row]
      });

    });

    for (const item of rows) {

      await interaction.channel.send(item);

    }

    return interaction.reply({

      content:
      "✅ Đã hiển thị sản phẩm",

      ephemeral: true

    });

  }

};
