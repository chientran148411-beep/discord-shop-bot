const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const {
  categories
} = require("../config/database");

module.exports = async (client, message) => {

  if (message.author.bot) return;

  if (message.content !== "!shop") return;

  // AUTO CATEGORY DEMO

  if (categories.length === 0) {

    categories.push({
      id: "pubg",
      name: "PUBG",
      desc: "Danh mục PUBG"
    });

  }

  const embed = new EmbedBuilder()
    .setTitle("🛒 KENIOS SHOP")
    .setDescription(
      "✨ Chào mừng đến shop tự động\n\n📂 Chọn danh mục bên dưới"
    )
    .setColor("Blue");

  const row = new ActionRowBuilder();

  // CATEGORY BUTTONS

  categories.slice(0, 3).forEach((cat) => {

    row.addComponents(

      new ButtonBuilder()
        .setCustomId(`category_${cat.id}`)
        .setLabel(cat.name)
        .setStyle(ButtonStyle.Primary)

    );

  });

  // ADD CATEGORY

  row.addComponents(

    new ButtonBuilder()
      .setCustomId("add_category")
      .setLabel("➕ DANH MỤC")
      .setStyle(ButtonStyle.Success)

  );

  // ADD PRODUCT

  row.addComponents(

    new ButtonBuilder()
      .setCustomId("add_product")
      .setLabel("🛒 SẢN PHẨM")
      .setStyle(ButtonStyle.Danger)

  );

  await message.channel.send({
    embeds: [embed],
    components: [row]
  });

};
