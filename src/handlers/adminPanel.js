const {

  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle

} = require('discord.js');

module.exports = async (interaction) => {

  const embed = new EmbedBuilder()

  .setTitle("🛠️ ADMIN PANEL")

  .setDescription(
`⚡ Quản lý shop bằng nút`
  )

  .setColor("Purple");



  const row = new ActionRowBuilder()

  .addComponents(

    new ButtonBuilder()

    .setCustomId("add_category")

    .setLabel("➕ Thêm Thư Mục")

    .setStyle(ButtonStyle.Primary),



    new ButtonBuilder()

    .setCustomId("add_product")

    .setLabel("➕ Thêm Sản Phẩm")

    .setStyle(ButtonStyle.Success),



    new ButtonBuilder()

    .setCustomId("add_stock")

    .setLabel("➕ Thêm Tài Khoản")

    .setStyle(ButtonStyle.Secondary),



    new ButtonBuilder()

    .setCustomId("stats")

    .setLabel("📊 Thống Kê")

    .setStyle(ButtonStyle.Danger)

  );



  interaction.reply({

    embeds: [embed],

    components: [row],

    ephemeral: true

  });

};
