const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const Product =
require("../models/Product");

const Order =
require("../models/Order");

module.exports =
async (interaction) => {

  if (
    !interaction.customId.startsWith(
      "buy_"
    )
  ) return;

  const productId =
  interaction.customId.replace(
    "buy_",
    ""
  );

  const product =
  await Product.findById(
    productId
  );

  if (!product) {

    return interaction.reply({

      content:
      "❌ Không tìm thấy sản phẩm",

      ephemeral: true

    });

  }

  // ======================
  // TẠO MÃ ĐƠN
  // ======================

  const orderCode =
  `KENIOS_${interaction.user.id}_${Math.floor(Math.random()*9999)}`;

  // ======================
  // LƯU ĐƠN
  // ======================

  await Order.create({

    orderCode,

    userId:
    interaction.user.id,

    productId:
    product._id,

    price:
    product.price,

    status:
    "pending"

  });

  // ======================
  // QR
  // ======================

  const qr =
`https://img.vietqr.io/image/MB-123456789-compact2.png?amount=${product.price}&addInfo=${orderCode}`;

  const embed =
  new EmbedBuilder()

  .setColor("#f1c40f")

  .setTitle(
    "💳 THANH TOÁN"
  )

  .setImage(qr)

  .setDescription(
`📦 Sản phẩm:
${product.name}

💰 Giá:
${product.price}

⏰ Thời gian:
${product.duration}

🏦 BANK:
MB BANK

💳 STK:
123456789

📝 Nội dung:
${orderCode}

⚠️ Chuyển đúng nội dung`
  );

  const row =
  new ActionRowBuilder()

  .addComponents(

    new ButtonBuilder()

    .setCustomId(
      `checkpay_${orderCode}`
    )

    .setLabel(
      "✅ Kiểm Tra Thanh Toán"
    )

    .setStyle(
      ButtonStyle.Success
    )

  );

  return interaction.reply({

    embeds: [embed],

    components: [row],

    ephemeral: true

  });

};
