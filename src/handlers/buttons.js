const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

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
    "add_category"
  ) {

    const modal =
    new ModalBuilder()

    .setCustomId(
      "add_category_modal"
    )

    .setTitle(
      "➕ Thêm Danh Mục"
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

    const row =
    new ActionRowBuilder()

    .addComponents(input);

    modal.addComponents(row);

    return interaction.showModal(
      modal
    );

  }

  // =====================
  // DELETE CATEGORY
  // =====================

  if (
    interaction.customId ===
    "delete_category"
  ) {

    const categories =
    await Category.find();

    if (
      categories.length === 0
    ) {

      return interaction.reply({

        content:
        "❌ Không có danh mục",

        ephemeral: true

      });

    }

    const buttons =
    categories.map(cat =>

      new ButtonBuilder()

      .setCustomId(
        `delete_${cat._id}`
      )

      .setLabel(cat.name)

      .setStyle(
        ButtonStyle.Danger
      )

    );

    const rows = [];

    for (
      let i = 0;
      i < buttons.length;
      i += 5
    ) {

      rows.push(

        new ActionRowBuilder()

        .addComponents(
          buttons.slice(i, i + 5)
        )

      );

    }

    return interaction.reply({

      content:
      "🗑️ Chọn danh mục cần xóa",

      components: rows,

      ephemeral: true

    });

  }

  // =====================
  // OPEN CATEGORY
  // =====================

  if (
    interaction.customId.startsWith(
      "category_"
    )
  ) {

    const id =
    interaction.customId.split("_")[1];

    const category =
    await Category.findById(id);

    if (!category) {

      return interaction.reply({

        content:
        "❌ Không tìm thấy",

        ephemeral: true

      });

    }

    return interaction.reply({

      content:
      `📂 Bạn đã chọn ${category.name}`,

      ephemeral: true

    });

  }

  // =====================
  // DELETE SELECTED
  // =====================

  if (
    interaction.customId.startsWith(
      "delete_"
    )
  ) {

    const id =
    interaction.customId.split("_")[1];

    await Category.findByIdAndDelete(
      id
    );

    return interaction.update({

      content:
      "✅ Đã xóa danh mục",

      components: []

    });

  }

  // =====================
  // BUYERS
  // =====================

  if (
    interaction.customId ===
    "buyers"
  ) {

    return interaction.reply({

      content:
      "👤 Chưa có người mua",

      ephemeral: true

    });

  }

  // =====================
  // SOLD PRODUCTS
  // =====================

  if (
    interaction.customId ===
    "sold_products"
  ) {

    return interaction.reply({

      content:
      "📦 Chưa có sản phẩm bán",

      ephemeral: true

    });

  }

};
