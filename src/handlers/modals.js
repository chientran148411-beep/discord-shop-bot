const Category =
require("../models/Category");

module.exports = async (
  interaction
) => {

  // =====================
  // ADD CATEGORY
  // =====================

  if (
    interaction.customId ===
    "add_category_modal"
  ) {

    const name =
    interaction.fields
    .getTextInputValue(
      "category_name"
    );

    const exists =
    await Category.findOne({

      name

    });

    if (exists) {

      return interaction.reply({

        content:
        "❌ Danh mục đã tồn tại",

        ephemeral: true

      });

    }

    await Category.create({

      name

    });

    return interaction.reply({

      content:
      `✅ Đã thêm danh mục ${name}`,

      ephemeral: true

    });

  }

};
