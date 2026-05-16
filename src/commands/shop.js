const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const Category = require("../models/Category");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Mở shop"),

  async execute(interaction) {

    // =========================
    // GET CATEGORIES
    // =========================

    const categories =
      await Category.find();

    if (!categories.length) {

      return interaction.reply({

        content:
        "❌ Chưa có danh mục",

        ephemeral: true

      });

    }

    // =========================
    // EMBED
    // =========================

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

    // =========================
    // BUTTONS
    // =========================

    const row =
      new ActionRowBuilder();

    categories
      .slice(0, 5)
      .forEach(category => {

        row.addComponents(

          new ButtonBuilder()

          .setCustomId(
            `category_${category.name}`
          )

          .setLabel(
            category.name
          )

          .setStyle(
            ButtonStyle.Primary
          )

        );

      });

    // =========================
    // SEND
    // =========================

    await interaction.reply({

      embeds: [embed],

      components: [row]

    });

  }

};
