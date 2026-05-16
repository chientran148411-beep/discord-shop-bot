const {

  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle

} = require('discord.js');

module.exports = async (
  interaction
) => {

  const embed =
  new EmbedBuilder()

  .setTitle(
    "🛠️ ADMIN PANEL"
  )

  .setDescription(
`
⚡ Quản lý shop bằng nút
`
  )

  .setColor("Purple");



  const row1 =
  new ActionRowBuilder()

  .addComponents(

    new ButtonBuilder()

    .setCustomId(
      "add_category"
    )

    .setLabel(
      "➕ Thêm Danh Mục"
    )

    .setStyle(
      ButtonStyle.Primary
    ),



    new ButtonBuilder()

    .setCustomId(
      "delete_category"
    )

    .setLabel(
      "🗑️ Xóa Danh Mục"
    )

    .setStyle(
      ButtonStyle.Danger
    )

  );



  return interaction.reply({

    embeds: [embed],

    components: [row1],

    flags: 64

  });

};
