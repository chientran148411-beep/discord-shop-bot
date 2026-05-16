const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const Category =
require("../models/Category");

module.exports = async (
  interaction
) => {

  const categories =
  await Category.find();

  const embed =
  new EmbedBuilder()

  .setColor("Blue")

  .setTitle(
    "🛒 KENIOS SHOP"
  )

  .setDescription(`
✨ Chào mừng bạn đến với shop tự động

📂 Chọn danh mục bên dưới
  `);

  const rows = [];

  if (categories.length > 0) {

    const buttons =
    categories.map(cat =>

      new ButtonBuilder()

      .setCustomId(
        `category_${cat._id}`
      )

      .setLabel(cat.name)

      .setStyle(
        ButtonStyle.Primary
      )

    );

    for (
      let i = 0;
      i < buttons.length;
      i += 5
    ) {

      rows.push(

        new ActionRowBuilder()

        .addComponents(
          buttons.slice(i, i + 5)
        )

      );

    }

  }

  return interaction.reply({

    embeds: [embed],

    components: rows

  });

};
