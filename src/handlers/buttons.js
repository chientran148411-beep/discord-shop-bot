const {

  ModalBuilder,

  TextInputBuilder,

  TextInputStyle,

  ActionRowBuilder,

  EmbedBuilder

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

    return interaction.showModal(
      modal
    );

  }

  // =====================
  // ADD PRODUCT
  // =====================

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
      "Thêm Sản Phẩm"
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

  // =====================
  // EDIT PRICE
  // =====================

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
      "Sửa Giá"
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

  // =====================
  // EDIT DURATION
  // =====================

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
      "Sửa Thời Gian"
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

  // =====================
  // ADD KEY
  // =====================

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
      "Nhập Key"
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
      "Danh sách key"
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

  // =====================
  // STOCK
  // =====================

  if (
    interaction.customId ===
    "stock"
  ) {

    const keys =
    await Key.find({

      sold: false

    });

    return interaction.reply({

      content:
      `📦 Tồn kho: ${keys.length} key`,

      ephemeral: true

    });

  }

  // =====================
  // BUYERS
  // =====================

  if (
    interaction.customId ===
    "buyers"
  ) {

    const orders =
    await Order.find();

    const text =
    orders.map(x =>

      `👤 ${x.userId} → ${x.productName}`

    ).join("\n");

    return interaction.reply({

      content:
      text || "Không có dữ liệu",

      ephemeral: true

    });

  }

  // =====================
  // SOLD
  // =====================

  if (
    interaction.customId ===
    "sold_products"
  ) {

    const products =
    await Product.find();

    const text =
    products.map(x =>

      `${x.name} → ${x.sold}`

    ).join("\n");

    return interaction.reply({

      content:
      text || "Không có dữ liệu",

      ephemeral: true

    });

  }

  // =====================
  // STATISTICS
  // =====================

  if (
    interaction.customId ===
    "statistics"
  ) {

    const categories =
    await Category.countDocuments();

    const products =
    await Product.countDocuments();

    const keys =
    await Key.countDocuments();

    const orders =
    await Order.countDocuments();

    const embed =
    new EmbedBuilder()

    .setColor("#2ecc71")

    .setTitle(
      "📊 THỐNG KÊ"
    )

    .setDescription(

`📂 Danh mục: ${categories}
📦 Sản phẩm: ${products}
🔑 Key: ${keys}
🛒 Đơn hàng: ${orders}`

    );

    return interaction.reply({

      embeds: [embed],

      ephemeral: true

    });

  }

};
