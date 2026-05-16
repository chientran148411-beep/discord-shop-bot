const {
  Client,
  GatewayIntentBits,
  Partials
} = require("discord.js");

const mongoose = require("mongoose");

const express = require("express");

require("dotenv").config();

// =========================
// DISCORD CLIENT
// =========================

const client = new Client({

  intents: [

    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages

  ],

  partials: [

    Partials.Channel

  ]

});

// =========================
// MONGODB
// =========================

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("✅ Đã kết nối MongoDB");

})

.catch((err) => {

  console.log("❌ MongoDB Error");

  console.log(err);

});

// =========================
// READY
// =========================

client.once("ready", () => {

  console.log(`✅ ${client.user.tag} online`);

});

// =========================
// LOAD HANDLER
// =========================

require("./handlers/interactionCreate")(client);

// =========================
// EXPRESS WEBHOOK
// =========================

const app = express();

app.use(express.json());

// =========================
// TEST DOMAIN
// =========================

app.get("/", (req, res) => {

  res.send("KENIOS WEBHOOK ONLINE");

});

// =========================
// SEPAY WEBHOOK
// =========================

const Product = require("./models/Product");
const Key = require("./models/Key");
const Order = require("./models/Order");

app.post("/sepay-webhook", async (req, res) => {

  try {

    console.log("📩 WEBHOOK:", req.body);

    const data = req.body;

    const content = data.content || "";

    // =====================
    // CHECK ORDER CODE
    // =====================

    if (!content.startsWith("KENIOS_")) {

      return res.send({
        success: false
      });

    }

    // =====================
    // FIND ORDER
    // =====================

    const order = await Order.findOne({

      orderCode: content,
      status: "pending"

    });

    if (!order) {

      return res.send({

        success: false,
        message: "Không tìm thấy order"

      });

    }

    // =====================
    // FIND PRODUCT
    // =====================

    const product = await Product.findById(

      order.productId

    );

    if (!product) {

      return res.send({

        success: false,
        message: "Không tìm thấy sản phẩm"

      });

    }

    // =====================
    // GET KEY
    // =====================

    const key = await Key.findOne({

      productId: product._id,
      used: false

    });

    if (!key) {

      return res.send({

        success: false,
        message: "Hết key"

      });

    }

    // =====================
    // UPDATE ORDER
    // =====================

    order.status = "paid";

    await order.save();

    key.used = true;

    await key.save();

    // =====================
    // SEND KEY TO USER
    // =====================

    const user = await client.users.fetch(

      order.userId

    );

    await user.send({

      embeds: [

        {

          color: 0x2ecc71,

          title: "✅ THANH TOÁN THÀNH CÔNG",

          description:

`📦 Sản phẩm:
${product.name}

🔑 KEY:
${key.key}

⏰ Thời gian:
${product.duration}

💰 Giá:
${product.price}đ`

        }

      ]

    });

    console.log("✅ Đã giao key");

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

});

// =========================
// START WEBHOOK SERVER
// =========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`✅ Webhook online ${PORT}`);

});

// =========================
// LOGIN
// =========================

client.login(process.env.TOKEN);
