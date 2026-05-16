const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const {
  categories
} = require("../config/database");

module.exports = async (message) => {

  const embed = new EmbedBuilder()

    .setTitle("🛒 KENIOS SHOP")

    .setDescription(
      "✨ Chào mừng đến shop tự động\n\n📂 Chọn danh mục bên dưới"
    )

    .setColor("Blue");

  const row =
    new ActionRowBuilder();

  categories.forEach((cat) => {

    row.addComponents(

      new ButtonBuilder()

        .setCustomId(
          `category_${cat.id}`
        )

        .setLabel(cat.name)

        .setStyle(
          ButtonStyle.Primary
        )

    );

  });

  row.addComponents(

    new ButtonBuilder()

      .setCustomId("admin_panel")

      .setLabel("ADMIN")

      .setStyle(ButtonStyle.Danger)

  );

  await message.channel.send({

    embeds: [embed],
    components: [row]

  });

};
