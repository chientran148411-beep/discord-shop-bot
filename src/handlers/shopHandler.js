const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const {
  categories,
  products
} = require("../config/database");

module.exports = async (
  interaction
) => {

  const id =
    interaction.customId.replace(
      "category_",
      ""
    );

  const category =
    categories.find(
      x => x.id === id
    );

  if (!category) return;

  const embed =
    new EmbedBuilder()

      .setTitle(
        `📂 ${category.name}`
      )

      .setDescription(
        category.desc
      )

      .setColor("Blue");

  const row =
    new ActionRowBuilder();

  const categoryProducts =
    products.filter(
      x =>
        x.category === category.name
    );

  categoryProducts.forEach((p) => {

    row.addComponents(

      new ButtonBuilder()

        .setCustomId(
          `product_${p.id}`
        )

        .setLabel(p.name)

        .setStyle(
          ButtonStyle.Secondary
        )

    );

  });

  await interaction.reply({

    embeds: [embed],

    components:
      row.components.length
        ? [row]
        : [],

    ephemeral: true

  });

};
