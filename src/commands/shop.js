const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = {
  name: "shop",

  async execute(interaction) {

    const embed = new EmbedBuilder()
      .setTitle("🛒 SHOP GAME KENIOS")
      .setDescription("Chào mừng bạn đến với cửa hàng tự động")
      .setColor("Blue")
      .addFields(
        {
          name: "📂 Danh mục",
          value: "• Free Fire\n• Liên Quân\n• Roblox"
        },
        {
          name: "📦 Sản phẩm",
          value: "Chọn danh mục bên dưới"
        }
      )
      .setFooter({
        text: "KENIOS SHOP BOT"
      });

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("ff")
          .setLabel("Free Fire")
          .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
          .setCustomId("lq")
          .setLabel("Liên Quân")
          .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
          .setCustomId("rb")
          .setLabel("Roblox")
          .setStyle(ButtonStyle.Secondary)
      );

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });

  }
};
