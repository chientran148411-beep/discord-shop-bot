// src/index.js

require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  REST,
  Routes
} = require('discord.js');

const mongoose = require('mongoose');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});



// =========================
// MONGODB
// =========================

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});



// =========================
// PRODUCT SCHEMA
// =========================

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Product = mongoose.model("Product", productSchema);



// =========================
// READY
// =========================

client.once('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const commands = [

    new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Kiểm tra bot'),

    new SlashCommandBuilder()
    .setName('addproduct')
    .setDescription('Thêm sản phẩm')
    .addStringOption(option =>
      option.setName('name')
      .setDescription('Tên sản phẩm')
      .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('price')
      .setDescription('Giá')
      .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('description')
      .setDescription('Mô tả')
      .setRequired(true)
    ),

    new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Xem cửa hàng')

  ].map(cmd => cmd.toJSON());



  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  try {

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("✅ Slash Commands Loaded");

  } catch (err) {
    console.log(err);
  }

});



// =========================
// INTERACTION
// =========================

client.on('interactionCreate', async (interaction) => {

  // ======================
  // PING
  // ======================

  if (interaction.commandName === 'ping') {

    return interaction.reply({
      content: '🏓 Pong!',
      ephemeral: true
    });

  }



  // ======================
  // ADD PRODUCT
  // ======================

  if (interaction.commandName === 'addproduct') {

    if (!interaction.member.permissions.has("Administrator")) {

      return interaction.reply({
        content: '❌ Bạn không phải admin',
        ephemeral: true
      });

    }

    const name = interaction.options.getString('name');
    const price = interaction.options.getInteger('price');
    const description = interaction.options.getString('description');

    await Product.create({
      name,
      price,
      description
    });

    return interaction.reply({
      content: `✅ Đã thêm sản phẩm: ${name}`
    });

  }



  // ======================
  // SHOP
  // ======================

  if (interaction.commandName === 'shop') {

    const products = await Product.find();

    if (!products.length) {

      return interaction.reply({
        content: '❌ Chưa có sản phẩm'
      });

    }

    for (const product of products) {

      const qrLink =
`https://qr.sepay.vn/img?acc=4441343888&bank=MB&amount=${product.price}&des=${product.name}`;

      const embed = new EmbedBuilder()
      .setTitle(product.name)
      .setDescription(product.description)
      .addFields(
        {
          name: '💰 Giá',
          value: `${product.price.toLocaleString()}đ`
        }
      )
      .setImage(qrLink)
      .setColor("Blue");



      const row = new ActionRowBuilder()
      .addComponents(

        new ButtonBuilder()
        .setCustomId(`check_${product.name}`)
        .setLabel('✅ Kiểm Tra Thanh Toán')
        .setStyle(ButtonStyle.Success)

      );



      await interaction.channel.send({
        embeds: [embed],
        components: [row]
      });

    }

    return interaction.reply({
      content: '✅ Đã mở shop',
      ephemeral: true
    });

  }



  // ======================
  // CHECK PAYMENT
  // ======================

  if (interaction.isButton()) {

    if (interaction.customId.startsWith("check_")) {

      const productName =
      interaction.customId.replace("check_", "");

      try {

        const response = await axios.get(
          'https://my.sepay.vn/userapi/transactions/list',
          {
            headers: {
              Authorization:
              `Bearer ${process.env.SEPAY_API_KEY}`
            }
          }
        );

        const transactions = response.data.transactions || [];

        const found = transactions.find(tx =>
          tx.transaction_content &&
          tx.transaction_content.includes(productName)
        );

        if (found) {

          return interaction.reply({
            content:
`✅ Thanh toán thành công cho sản phẩm ${productName}`,
            ephemeral: true
          });

        } else {

          return interaction.reply({
            content:
`❌ Chưa tìm thấy giao dịch`,
            ephemeral: true
          });

        }

      } catch (err) {

        console.log(err);

        return interaction.reply({
          content: '❌ Lỗi Sepay API',
          ephemeral: true
        });

      }

    }

  }

});



// =========================
// LOGIN
// =========================

client.login(process.env.TOKEN);
