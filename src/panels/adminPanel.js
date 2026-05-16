const Product =
require("../models/Product");

const Category =
require("../models/Category");

const Key =
require("../models/Key");

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
    interaction.fields.getTextInputValue(
      "category_name"
    );

    await Category.create({

      name

    });

    return interaction.reply({

      content:
      `✅ Đã thêm danh mục: ${name}`,

      ephemeral: true

    });

  }

  // =====================
  // ADD PRODUCT
  // =====================

  if (
    interaction.customId ===
    "add_product_modal"
  ) {

    const category =
    interaction.fields.getTextInputValue(
      "product_category"
    );

    const name =
    interaction.fields.getTextInputValue(
      "product_name"
    );

    const duration =
    interaction.fields.getTextInputValue(
      "product_duration"
    );

    const price =
    interaction.fields.getTextInputValue(
      "product_price"
    );

    // CREATE CATEGORY IF NOT EXISTS

    let findCategory =
    await Category.findOne({

      name: category

    });

    if (!findCategory) {

      findCategory =
      await Category.create({

        name: category

      });

    }

    // CREATE PRODUCT

    await Product.create({

      category:
      findCategory.name,

      name,

      duration,

      price,

      enabled: true,

      sold: 0

    });

    return interaction.reply({

      content:
`✅ Đã thêm sản phẩm

📂 ${category}
📦 ${name}
⏰ ${duration}
💰 ${price}đ`,

      ephemeral: true

    });

  }

  // =====================
  // EDIT PRICE
  // =====================

  if (
    interaction.customId ===
    "edit_price_modal"
  ) {

    const name =
    interaction.fields.getTextInputValue(
      "product_name"
    );

    const newPrice =
    interaction.fields.getTextInputValue(
      "new_price"
    );

    const product =
    await Product.findOne({

      name

    });

    if (!product) {

      return interaction.reply({

        content:
        "❌ Không tìm thấy sản phẩm",

        ephemeral: true

      });

    }

    product.price =
    newPrice;

    await product.save();

    return interaction.reply({

      content:
      `✅ Đã sửa giá ${name}`,

      ephemeral: true

    });

  }

  // =====================
  // EDIT DURATION
  // =====================

  if (
    interaction.customId ===
    "edit_duration_modal"
  ) {

    const name =
    interaction.fields.getTextInputValue(
      "product_name"
    );

    const duration =
    interaction.fields.getTextInputValue(
      "new_duration"
    );

    const product =
    await Product.findOne({

      name

    });

    if (!product) {

      return interaction.reply({

        content:
        "❌ Không tìm thấy sản phẩm",

        ephemeral: true

      });

    }

    product.duration =
    duration;

    await product.save();

    return interaction.reply({

      content:
      `✅ Đã sửa thời gian ${name}`,

      ephemeral: true

    });

  }

  // =====================
  // ADD KEY
  // =====================

  if (
    interaction.customId ===
    "add_key_modal"
  ) {

    const productName =
    interaction.fields.getTextInputValue(
      "product_name"
    );

    const keyText =
    interaction.fields.getTextInputValue(
      "product_key"
    );

    const product =
    await Product.findOne({

      name: productName

    });

    if (!product) {

      return interaction.reply({

        content:
        "❌ Không tìm thấy sản phẩm",

        ephemeral: true

      });

    }

    const keys =
    keyText.split("\n");

    for (
      const k of keys
    ) {

      await Key.create({

        productId:
        product._id,

        key: k,

        sold: false

      });

    }

    return interaction.reply({

      content:
      `✅ Đã nhập ${keys.length} key`,

      ephemeral: true

    });

  }

};
