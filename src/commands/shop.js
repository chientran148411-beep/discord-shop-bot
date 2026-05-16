const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Mở shop"),

  async execute(interaction) {

    const embed = new EmbedBuilder()

      .setColor("#5865F2")

      .setTitle("🛒 KENIOS SHOP")

      .setDescription(

`✨ Chào mừng đến shop tự động

📂 Chọn danh mục bên dưới

• Free Fire
• Roblox
• Liên Quân`

      );

    const row = new ActionRowBuilder()

      .addComponents(

        new ButtonBuilder()
          .setCustomId("shop_ff")
          .setLabel("Free Fire")
          .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
          .setCustomId("shop_roblox")
          .setLabel("Roblox")
          .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
          .setCustomId("shop_lq")
          .setLabel("Liên Quân")
          .setStyle(ButtonStyle.Secondary)

      );

    await interaction.reply({

      embeds: [embed],

      components: [row]

    });

  }

};
