const {
  EmbedBuilder
} = require('discord.js');

module.exports = async (member) => {

  const channel =
  member.guild.systemChannel;

  if (!channel) return;

  const embed = new EmbedBuilder()

  .setTitle("👋 Chào mừng")

  .setDescription(

`✨ Chào ${member}

🛒 Hãy dùng /shop để mua hàng`

  )

  .setColor("Purple");

  channel.send({
    embeds: [embed]
  });

};
