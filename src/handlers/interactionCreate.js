const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} = require("discord.js");

const Category = require("../models/Category");
const Product = require("../models/Product");

module.exports = async (interaction) => {

  try {

    // =====================================
    // BUTTONS
    // =====================================

    if (interaction.isButton()) {

      // =====================================
      // CATEGORY BUTTON
      // =====================================

      if (
        interaction.customId.startsWith(
          "category_"
        )
      ) {

        const categoryName =
          interaction.customId.replace(
            "category_",
            ""
          );

        const products =
          await Product.find({

            category: categoryName

          });

        if (!products.length) {

          return interaction.reply({

            content:
            "❌ Danh mục chưa có sản phẩm",

            ephemeral: true

          });

        }

        let msg = "";

        products.forEach(product => {

          msg +=

`📦 ${product.name}
💰 ${product.price}
⏰ ${product.duration}

`;

        });

        return interaction.reply({

          content: msg,

          ephemeral: true

        });

      }

      // =====================================
      // ADD CATEGORY
      // =====================================

      if (
        interaction.customId ===
        "add_category"
      ) {

        const modal =
          new ModalBuilder()

          .setCustomId(
            "modal_add_category"
          )

          .setTitle(
            "Thêm Danh Mục"
          );

        const input =
          new TextInputBuilder()

          .setCustomId(
            "category_name"
          )

          .setLabel(
            "Tên danh mục"
          )

          .setStyle(
            TextInputStyle.Short
          )

          .setRequired(true);

        modal.addComponents(

          new ActionRowBuilder()
          .addComponents(input)

        );

        return await interaction.showModal(
          modal
        );

      }

      // =====================================
      // ADD PRODUCT
      // =====================================

      if (
        interaction.customId ===
        "add_product"
      ) {

        const modal =
          new ModalBuilder()

          .setCustomId(
            "modal_add_product"
          )

          .setTitle(
            "Thêm Sản Phẩm"
          );

        const category =
          new TextInputBuilder()

          .setCustomId(
            "category"
          )

          .setLabel(
            "Danh mục"
          )

          .setStyle(
            TextInputStyle.Short
          );

        const name =
          new TextInputBuilder()

          .setCustomId(
            "name"
          )

          .setLabel(
            "Tên sản phẩm"
          )

          .setStyle(
            TextInputStyle.Short
          );

        const duration =
          new TextInputBuilder()

          .setCustomId(
            "duration"
          )

          .setLabel(
            "Thời gian"
          )

          .setStyle(
            TextInputStyle.Short
          );

        const price =
          new TextInputBuilder()

          .setCustomId(
            "price"
          )

          .setLabel(
            "Giá"
          )

          .setStyle(
            TextInputStyle.Short
          );

        modal.addComponents(

          new ActionRowBuilder()
          .addComponents(category),

          new ActionRowBuilder()
          .addComponents(name),

          new ActionRowBuilder()
          .addComponents(duration),

          new ActionRowBuilder()
          .addComponents(price)

        );

        return await interaction.showModal(
          modal
        );

      }

      // =====================================
      // DEFAULT
      // =====================================

      return interaction.reply({

        content:
        "⚠️ Nút chưa được xử lý",

        ephemeral: true

      });

    }

    // =====================================
    // MODAL SUBMIT
    // =====================================

    if (interaction.isModalSubmit()) {

      // =====================================
      // SAVE CATEGORY
      // =====================================

      if (
        interaction.customId ===
        "modal_add_category"
      ) {

        const name =
          interaction.fields.getTextInputValue(
            "category_name"
          );

        await Category.create({

          name

        });

        return interaction.reply({

          content:
          `✅ Đã thêm danh mục ${name}`,

          ephemeral: true

        });

      }

      // =====================================
      // SAVE PRODUCT
      // =====================================

      if (
        interaction.customId ===
        "modal_add_product"
      ) {

        const category =
          interaction.fields.getTextInputValue(
            "category"
          );

        const name =
          interaction.fields.getTextInputValue(
            "name"
          );

        const duration =
          interaction.fields.getTextInputValue(
            "duration"
          );

        const price =
          interaction.fields.getTextInputValue(
            "price"
          );

        await Product.create({

          category,
          name,
          duration,
          price

        });

        return interaction.reply({

          content:
          `✅ Đã thêm sản phẩm ${name}`,

          ephemeral: true

        });

      }

    }

  } catch (err) {

    console.log(err);

    if (!interaction.replied) {

      await interaction.reply({

        content:
        "❌ Có lỗi xảy ra",

        ephemeral: true

      });

    }

  }

};
