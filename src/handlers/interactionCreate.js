const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} = require("discord.js");

module.exports = async (interaction) => {

  try {

    // ======================
    // BUTTONS
    // ======================

    if (interaction.isButton()) {

      // ======================
      // ADD CATEGORY
      // ======================

      if (interaction.customId === "add_category") {

        const modal = new ModalBuilder()
          .setCustomId("modal_add_category")
          .setTitle("Thêm Danh Mục");

        const input = new TextInputBuilder()
          .setCustomId("category_name")
          .setLabel("Tên danh mục")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(input)
        );

        return await interaction.showModal(modal);

      }

      // ======================
      // DELETE CATEGORY
      // ======================

      if (interaction.customId === "delete_category") {

        const modal = new ModalBuilder()
          .setCustomId("modal_delete_category")
          .setTitle("Xóa Danh Mục");

        const input = new TextInputBuilder()
          .setCustomId("category_name")
          .setLabel("Tên danh mục")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(input)
        );

        return await interaction.showModal(modal);

      }

      // ======================
      // ADD PRODUCT
      // ======================

      if (interaction.customId === "add_product") {

        const modal = new ModalBuilder()
          .setCustomId("modal_add_product")
          .setTitle("Thêm Sản Phẩm");

        const category = new TextInputBuilder()
          .setCustomId("category")
          .setLabel("Danh mục")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const name = new TextInputBuilder()
          .setCustomId("name")
          .setLabel("Tên sản phẩm")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const duration = new TextInputBuilder()
          .setCustomId("duration")
          .setLabel("Thời gian")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const price = new TextInputBuilder()
          .setCustomId("price")
          .setLabel("Giá")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(category),
          new ActionRowBuilder().addComponents(name),
          new ActionRowBuilder().addComponents(duration),
          new ActionRowBuilder().addComponents(price)
        );

        return await interaction.showModal(modal);

      }

      // ======================
      // EDIT PRICE
      // ======================

      if (interaction.customId === "edit_price") {

        const modal = new ModalBuilder()
          .setCustomId("modal_edit_price")
          .setTitle("Sửa Giá");

        const product = new TextInputBuilder()
          .setCustomId("product")
          .setLabel("Tên sản phẩm")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const price = new TextInputBuilder()
          .setCustomId("price")
          .setLabel("Giá mới")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(product),
          new ActionRowBuilder().addComponents(price)
        );

        return await interaction.showModal(modal);

      }

      // ======================
      // EDIT TIME
      // ======================

      if (interaction.customId === "edit_duration") {

        const modal = new ModalBuilder()
          .setCustomId("modal_edit_duration")
          .setTitle("Sửa Thời Gian");

        const product = new TextInputBuilder()
          .setCustomId("product")
          .setLabel("Tên sản phẩm")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const duration = new TextInputBuilder()
          .setCustomId("duration")
          .setLabel("Thời gian mới")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(product),
          new ActionRowBuilder().addComponents(duration)
        );

        return await interaction.showModal(modal);

      }

      // ======================
      // DEFAULT
      // ======================

      return interaction.reply({
        content: "⚠️ Nút chưa được xử lý",
        ephemeral: true
      });

    }

    // ======================
    // MODAL SUBMIT
    // ======================

    if (interaction.isModalSubmit()) {

      return await interaction.reply({
        content: "✅ Đã nhận dữ liệu",
        ephemeral: true
      });

    }

  } catch (err) {

    console.log(err);

    if (!interaction.replied) {

      await interaction.reply({
        content: "❌ Có lỗi xảy ra",
        ephemeral: true
      });

    }

  }

};
