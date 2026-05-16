const Order =
require("../models/Order");

module.exports =
async (interaction) => {

  if (
    !interaction.customId.startsWith(
      "checkpay_"
    )
  ) return;

  const orderCode =
  interaction.customId.replace(
    "checkpay_",
    ""
  );

  const order =
  await Order.findOne({

    orderCode

  });

  if (!order) {

    return interaction.reply({

      content:
      "❌ Không tìm thấy đơn",

      ephemeral: true

    });

  }

  // =========================
  // DEMO
  // =========================

  if (
    order.status !== "paid"
  ) {

    return interaction.reply({

      content:
      "❌ Chưa thanh toán",

      ephemeral: true

    });

  }

  return interaction.reply({

    content:
    "✅ Đã thanh toán",

    ephemeral: true

  });

};
