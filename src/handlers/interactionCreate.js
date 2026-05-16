const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const {
  categories,
  products
} = require("../config/database");

module.exports = async (client, interaction) => {

  try {

    // =========================
    // BUTTON
    // =========================

    if (interaction.isButton()) {

      // =========================
      // ADD CATEGORY
      // =========================

      if (interaction.customId === "add_category") {

        const modal = new ModalBuilder()
          .setCustomId("create_category")
          .setTitle("Tạo Danh Mục");

        const input = new TextInputBuilder()
          .setCustomId("category_name")
          .setLabel("Tên danh mục")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const row = new ActionRowBuilder()
          .addComponents(input);

        modal.addComponents(row);

        return await interaction.showModal(modal);

      }

      // =========================
      // ADD PRODUCT
      // =========================

      if (interaction.customId === "add_product") {

        const modal = new ModalBuilder()
          .setCustomId("create_product")
          .setTitle("Tạo Sản Phẩm");

        const name = new TextInputBuilder()
          .setCustomId("product_name")
          .setLabel("Tên sản phẩm")
          .setStyle(TextInputStyle.Short);

        const price = new TextInputBuilder()
          .setCustomId("product_price")
          .setLabel("Giá")
          .setStyle(TextInputStyle.Short);

        const desc = new TextInputBuilder()
          .setCustomId("product_desc")
          .setLabel("Mô tả")
          .setStyle(TextInputStyle.Paragraph);

        modal.addComponents(
          new ActionRowBuilder().addComponents(name),
          new ActionRowBuilder().addComponents(price),
          new ActionRowBuilder().addComponents(desc)
        );

        return await interaction.showModal(modal);

      }

      // =========================
      // CATEGORY BUTTON
      // =========================

      if (interaction.customId.startsWith("category_")) {

        const id = interaction.customId.replace("category_", "");

        const category = categories.find(
          x => x.id === id
        );

        if (!category) {

          return interaction.reply({
            content: "❌ Không tìm thấy danh mục",
            ephemeral: true
          });

        }

        const embed = new EmbedBuilder()
          .setTitle(`📂 ${category.name}`)
          .setDescription(category.desc || "Không có mô tả")
          .setColor("Blue");

        const row = new ActionRowBuilder();

        const list = products.filter(
          x => x.category === category.name
        );

        list.slice(0, 5).forEach(product => {

          row.addComponents(

            new ButtonBuilder()
              .setCustomId(`product_${product.id}`)
              .setLabel(product.name)
              .setStyle(ButtonStyle.Secondary)

          );

        });

        return interaction.reply({
          embeds: [embed],
          components: row.components.length ? [row] : [],
          ephemeral: true
        });

      }

      // =========================
      // PRODUCT BUTTON
      // =========================

      if (interaction.customId.startsWith("product_")) {

        const id = interaction.customId.replace("product_", "");

        const product = products.find(
          x => x.id === id
        );

        if (!product) {

          return interaction.reply({
            content: "❌ Không tìm thấy sản phẩm",
            ephemeral: true
          });

        }

        const embed = new EmbedBuilder()
          .setTitle(product.name)
          .addFields(
            {
              name: "💵 Giá",
              value: product.price
            },
            {
              name: "📝 Mô tả",
              value: product.desc
            }
          )
          .setColor("Green");

        return interaction.reply({
          embeds: [embed],
          ephemeral: true
        });

      }

    }

    // =========================
    // MODAL SUBMIT
    // =========================

    if (interaction.isModalSubmit()) {

      // =========================
      // CREATE CATEGORY
      // =========================

      if (interaction.customId === "create_category") {

        const name =
          interaction.fields.getTextInputValue("category_name");

        categories.push({
          id: Date.now().toString(),
          name,
          desc: "Danh mục mới"
        });

        return interaction.reply({
          content: `✅ Đã tạo danh mục ${name}`,
          ephemeral: true
        });

      }

      // =========================
      // CREATE PRODUCT
      // =========================

      if (interaction.customId === "create_product") {

        const name =
          interaction.fields.getTextInputValue("product_name");

        const price =
          interaction.fields.getTextInputValue("product_price");

        const desc =
          interaction.fields.getTextInputValue("product_desc");

        let categoryName = "Chưa phân loại";

        if (categories.length > 0) {
          categoryName = categories[0].name;
        }

        products.push({
          id: Date.now().toString(),
          name,
          price,
          desc,
          category: categoryName
        });

        return interaction.reply({
          content: `✅ Đã tạo sản phẩm ${name}`,
          ephemeral: true
        });

      }

    }

  } catch (err) {

    console.log("INTERACTION ERROR:");
    console.log(err);

    if (!interaction.replied) {

      return interaction.reply({
        content: "❌ Bot đang lỗi",
        ephemeral: true
      });

    }

  }

};
