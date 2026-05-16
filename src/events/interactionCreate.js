const axios = require('axios');
const User = require('../database/User');

module.exports = {

  name: 'interactionCreate',

  async execute(interaction, client) {

    if (interaction.isChatInputCommand()) {

      const command = client.commands.get(
        interaction.commandName
      );

      if (!command) return;

      await command.execute(interaction);

    }

    if (interaction.isButton()) {

      if (interaction.customId.startsWith('check_')) {

        const amount =
        parseInt(interaction.customId.split('_')[1]);

        const code =
        `NAPTIEN_${interaction.user.id}`;

        try {

          const response = await axios.get(
            'https://my.sepay.vn/userapi/transactions/list',
            {
              headers: {
                Authorization:
                `Bearer ${process.env.SEPAY_API_KEY}`
              }
            }
          );

          const transactions =
          response.data.transactions || [];

          const found = transactions.find(tx =>

            tx.transaction_content?.includes(code)
            &&
            tx.amount_in == amount

          );

          if (!found) {

            return interaction.reply({
              content: '❌ Chưa tìm thấy giao dịch',
              ephemeral: true
            });

          }

          let user = await User.findOne({
            userId: interaction.user.id
          });

          if (!user) {

            user = await User.create({
              userId: interaction.user.id,
              balance: 0
            });

          }

          user.balance += amount;

          await user.save();

          interaction.reply({
            content:
            `✅ Nạp thành công ${amount} VNĐ`,
            ephemeral: true
          });

        } catch (err) {

          console.log(err);

        }

      }

    }

  }

};
