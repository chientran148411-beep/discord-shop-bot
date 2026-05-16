const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

module.exports = {

  data: new SlashCommandBuilder()
    .setName('deposit')
    .setDescription('Nạp tiền')

    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Số tiền')
        .setRequired(true)
    ),

  async execute(interaction) {

    const amount = interaction.options.getInteger('amount');

    const code = `NAPTIEN_${interaction.user.id}`;

    const qr =
`https://img.vietqr.io/image/MB-${process.env.BANK_NUMBER}-compact2.png?amount=${amount}&addInfo=${code}`;

    const embed = new EmbedBuilder()
      .setTitle('NẠP TIỀN')
      .setDescription(`
Ngân hàng: ${process.env.BANK_NAME}

STK: ${process.env.BANK_NUMBER}

Số tiền:
${amount} VNĐ

Nội dung:
${code}
      `)
      .setImage(qr);

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`check_${amount}`)
          .setLabel('CHECK GIAO DỊCH')
          .setStyle(ButtonStyle.Success)
      );

    interaction.reply({
      embeds: [embed],
      components: [row]
    });

  }

};
