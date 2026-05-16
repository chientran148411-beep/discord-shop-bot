const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const Product =
require("../models/Product");

const Category =
require("../models/Category");

const Key =
require("../models/Key");

const Order =
require("../models/Order");

module.exports = async (
  interaction
) => {

  // ======================
  // ADD CATEGORY
  // ======================

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
    );

    modal.addComponents(

      new ActionRowBuilder()

      .addComponents(input)

    );

    return interaction.showModal(
      modal
    );

  }

  // ======================
  // DELETE CATEGORY
  // ======================

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
        `delete_category_${cat._id}`
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

  // ======================
  // ADD PRODUCT
  // ======================

  if (
    interaction.customId ===
    "add_product"
  ) {

    const modal =
    new ModalBuilder()

    .setCustomId(
      "add_product_modal"
    )

    .setTitle(
      "📦 Thêm Sản Phẩm"
    );

    const category =
    new TextInputBuilder()

    .setCustomId(
      "product_category"
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
      "product_name"
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
      "product_duration"
    )

    .setLabel(
      "Thời gian"
    )

    .setPlaceholder(
      "30 ngày"
    )

    .setStyle(
      TextInputStyle.Short
    );

    const price =
    new TextInputBuilder()

    .setCustomId(
      "product_price"
    )

    .setLabel(
      "Giá sản phẩm"
    )

    .setPlaceholder(
      "50000"
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

    return interaction.showModal(
      modal
    );

  }

  // ======================
  // EDIT PRICE
  // ======================

  if (
    interaction.customId ===
    "edit_price"
  ) {

    const modal =
    new ModalBuilder()

    .setCustomId(
      "edit_price_modal"
    )

    .setTitle(
      "💰 Sửa Giá"
    );

    const product =
    new TextInputBuilder()

    .setCustomId(
      "product_name"
    )

    .setLabel(
      "Tên sản phẩm"
    )

    .setStyle(
      TextInputStyle.Short
    );

    const price =
    new TextInputBuilder()

    .setCustomId(
      "new_price"
    )

    .setLabel(
      "Giá mới"
    )

    .setStyle(
      TextInputStyle.Short
    );

    modal.addComponents(

      new ActionRowBuilder()
      .addComponents(product),

      new ActionRowBuilder()
      .addComponents(price)

    );

    return interaction.showModal(
      modal
    );

  }

  // ======================
  // EDIT DURATION
  // ======================

  if (
    interaction.customId ===
    "edit_duration"
  ) {

    const modal =
    new ModalBuilder()

    .setCustomId(
      "edit_duration_modal"
    )

    .setTitle(
      "⏰ Sửa Thời Gian"
    );

    const product =
    new TextInputBuilder()

    .setCustomId(
      "product_name"
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
      "new_duration"
    )

    .setLabel(
      "Thời gian mới"
    )

    .setPlaceholder(
      "60 ngày"
    )

    .setStyle(
      TextInputStyle.Short
    );

    modal.addComponents(

      new ActionRowBuilder()
      .addComponents(product),

      new ActionRowBuilder()
      .addComponents(duration)

    );

    return interaction.showModal(
      modal
    );

  }

  // ======================
  // ADD KEY
  // ======================

  if (
    interaction.customId ===
    "add_key"
  ) {

    const modal =
    new ModalBuilder()

    .setCustomId(
      "add_key_modal"
    )

    .setTitle(
      "🔑 Nhập Key"
    );

    const product =
    new TextInputBuilder()

    .setCustomId(
      "product_name"
    )

    .setLabel(
      "Tên sản phẩm"
    )

    .setStyle(
      TextInputStyle.Short
    );

    const key =
    new TextInputBuilder()

    .setCustomId(
      "product_key"
    )

    .setLabel(
      "Key"
    )

    .setStyle(
      TextInputStyle.Paragraph
    );

    modal.addComponents(

      new ActionRowBuilder()
      .addComponents(product),

      new ActionRowBuilder()
      .addComponents(key)

    );

    return interaction.showModal(
      modal
    );

  }

  // ======================
  // VIEW KEYS
  // ======================

  if (
    interaction.customId ===
    "view_keys"
  ) {

    const keys =
    await Key.find({
      sold: false
    });

    if (
      keys.length === 0
    ) {

      return interaction.reply({

        content:
        "❌ Không có key",

        ephemeral: true

      });

    }

    let text = "";

    for (
      const key of keys
    ) {

      const product =
      await Product.findById(
        key.productId
      );

      text += `

📦 ${product?.name}
🔑 ${key.key}

`;

    }

    return interaction.reply({

      content: text,

      ephemeral: true

    });

  }

  // ======================
  // STOCK
  // ======================

  if (
    interaction.customId ===
    "stock"
  ) {

    const products =
    await Product.find();

    let text = "";

    for (
      const product of products
    ) {

      const stock =
      await Key.countDocuments({

        productId:
        product._id,

        sold: false

      });

      text += `

📦 ${product.name}
⏰ ${product.duration}
💰 ${product.price}đ
📊 Kho: ${stock}

`;

    }

    return interaction.reply({

      content: text,

      ephemeral: true

    });

  }

  // ======================
  // BUYERS
  // ======================

  if (
    interaction.customId ===
    "buyers"
  ) {

    const orders =
    await Order.find();

    if (
      orders.length === 0
    ) {

      return interaction.reply({

        content:
        "❌ Chưa có người mua",

        ephemeral: true

      });

    }

    let text = "";

    for (
      const order of orders
    ) {

      const product =
      await Product.findById(
        order.productId
      );

      text += `

👤 ${order.userId}
📦 ${product?.name}

`;

    }

    return interaction.reply({

      content: text,

      ephemeral: true

    });

  }

  // ======================
  // SOLD PRODUCTS
  // ======================

  if (
    interaction.customId ===
    "sold_products"
  ) {

    const products =
    await Product.find();

    let text = "";

    products.forEach(p => {

      text += `

📦 ${p.name}
🛒 Đã bán:
${p.sold}

`;

    });

    return interaction.reply({

      content: text,

      ephemeral: true

    });

  }

};
