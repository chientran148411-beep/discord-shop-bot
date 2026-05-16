const {
  EmbedBuilder
} = require("discord.js");

const {
  products
} = require("../config/database");

module.exports = async (
  interaction
) => {

  const id =
    interaction.customId.replace(
      "product_",
      ""
    );

  const product =
    products.find(
      x => x.id === id
    );

  if (!product) return;

  const embed =
    new EmbedBuilder()

      .setTitle(
        `🛒 ${product.name}`
      )

      .addFields(

        {
          name: "💰 Giá",
          value: product.price
        },

        {
          name: "📝 Mô tả",
          value: product.desc
        }

      )

      .setColor("Green");

  await interaction.reply({

    embeds: [embed],
    ephemeral: true

  });

};
