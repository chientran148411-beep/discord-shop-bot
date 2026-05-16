const express =
require("express");

const Product =
require("./models/Product");

const Key =
require("./models/Key");

const Order =
require("./models/Order");

module.exports =
(client) => {

  const app =
  express();

  app.use(
    express.json()
  );

  // =========================
  // WEBHOOK SEPAY
  // =========================

  app.post(
    "/sepay-webhook",
    async (req, res) => {

      try {

        const data =
        req.body;

        const content =
        data.content || "";

        // =====================
        // CHECK ORDER CODE
        // =====================

        if (
          !content.startsWith(
            "KENIOS_"
          )
        ) {

          return res.send({
            success: false
          });

        }

        // =====================
        // FIND ORDER
        // =====================

        const order =
        await Order.findOne({

          orderCode: content,

          status: "pending"

        });

        if (!order) {

          return res.send({
            success: false
          });

        }

        // =====================
        // CHECK PRODUCT
        // =====================

        const product =
        await Product.findById(
          order.productId
        );

        if (!product) {

          return res.send({
            success: false
          });

        }

        // =====================
        // GET KEY
        // =====================

        const key =
        await Key.findOne({

          productId:
          product._id,

          used: false

        });

        if (!key) {

          return res.send({
            success: false,

            message:
            "Hết key"

          });

        }

        // =====================
        // UPDATE
        // =====================

        order.status =
        "paid";

        await order.save();

        key.used = true;

        await key.save();

        // =====================
        // SEND USER
        // =====================

        const user =
        await client.users.fetch(
          order.userId
        );

        await user.send({

          embeds: [

            {

              color: 0x2ecc71,

              title:
              "✅ THANH TOÁN THÀNH CÔNG",

              description:
`📦 Sản phẩm:
${product.name}

🔑 KEY:
${key.key}

⏰ Thời gian:
${product.duration}

💰 Giá:
${product.price}`

            }

          ]

        });

        // =====================
        // DONE
        // =====================

        return res.send({

          success: true

        });

      }

      catch (err) {

        console.log(err);

        return res.send({

          success: false

        });

      }

    }
  );

  // =========================
  // START SERVER
  // =========================

  app.listen(3000, () => {

    console.log(
      "✅ Webhook online"
    );

  });

};
