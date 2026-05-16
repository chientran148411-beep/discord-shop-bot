require('dotenv').config();

const {

  Client,
  GatewayIntentBits,
  REST,
  Routes,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle

} = require('discord.js');



// DATABASE

const connectDB =
require('./config/database');



// HANDLERS

const welcomeSystem =
require('./handlers/welcomeSystem');

const adminPanel =
require('./handlers/adminPanel');

const {

  addCategoryButton,
  submitCategory,
  deleteCategoryButton,
  deleteCategory

} = require(
  './handlers/categoryHandler'
);



// CLIENT

const client = new Client({

  intents: [

    GatewayIntentBits.Guilds,

    GatewayIntentBits.GuildMembers

  ]

});



// CONNECT DATABASE

connectDB();



// READY

client.once('ready', async () => {

  console.log(
`✅ ${client.user.tag} Online`
  );



  const commands = [

    {

      name: "shop",

      description: "Mở shop"

    },

    {

      name: "admin",

      description: "Mở admin panel"

    }

  ];



  const rest = new REST({

    version: '10'

  }).setToken(process.env.TOKEN);



  try {

    await rest.put(

      Routes.applicationGuildCommands(

        process.env.CLIENT_ID,

        process.env.GUILD_ID

      ),

      {

        body: commands

      }

    );



    console.log(
"✅ Slash Commands Loaded"
    );

  } catch (err) {

    console.log(err);

  }

});



// MEMBER JOIN

client.on(
  'guildMemberAdd',
  welcomeSystem
);



// INTERACTION

client.on(

  'interactionCreate',

  async interaction => {

    try {



      // =====================
      // CHAT COMMANDS
      // =====================

      if (
        interaction.isChatInputCommand()
      ) {

        // ADMIN PANEL

        if (
          interaction.commandName ===
          "admin"
        ) {

          return adminPanel(
            interaction
          );

        }



        // SHOP

        if (
          interaction.commandName ===
          "shop"
        ) {

          const embed =
          new EmbedBuilder()

          .setTitle(
            "🛒 KENIOS SHOP"
          )

          .setDescription(

`✨ Chào mừng bạn đến với shop tự động

📂 Chọn danh mục bên dưới`

          )

          .setColor("Blue")

          .addFields(

            {

              name: "📦 Danh mục",

              value:
"• Free Fire\n• Roblox\n• Liên Quân"

            },

            {

              name: "🟢 Trạng thái",

              value:
"Đang hoạt động"

            }

          )

          .setFooter({

            text:
"KENIOS SHOP BOT"

          });



          const row =
          new ActionRowBuilder()

          .addComponents(

            new ButtonBuilder()

            .setCustomId("ff")

            .setLabel("Free Fire")

            .setStyle(
              ButtonStyle.Primary
            ),



            new ButtonBuilder()

            .setCustomId("rb")

            .setLabel("Roblox")

            .setStyle(
              ButtonStyle.Success
            ),



            new ButtonBuilder()

            .setCustomId("lq")

            .setLabel("Liên Quân")

            .setStyle(
              ButtonStyle.Secondary
            )

          );



          return interaction.reply({

            embeds: [embed],

            components: [row]

          });

        }

      }



      // =====================
      // BUTTONS
      // =====================

      if (
        interaction.isButton()
      ) {



        // ADD CATEGORY

        if (
          interaction.customId ===
          "add_category"
        ) {

          return addCategoryButton(
            interaction
          );

        }



        // DELETE CATEGORY

        if (
          interaction.customId ===
          "delete_category"
        ) {

          return deleteCategoryButton(
            interaction
          );

        }



        // FREE FIRE

        if (
          interaction.customId ===
          "ff"
        ) {

          const embed =
          new EmbedBuilder()

          .setTitle(
            "🔥 SHOP FREE FIRE"
          )

          .setDescription(
`
💎 Chọn gói bên dưới
`
          )

          .setColor("Orange");



          const row =
          new ActionRowBuilder()

          .addComponents(

            new ButtonBuilder()

            .setCustomId("ff_50k")

            .setLabel("Gói 50K")

            .setStyle(
              ButtonStyle.Success
            ),



            new ButtonBuilder()

            .setCustomId("ff_100k")

            .setLabel("Gói 100K")

            .setStyle(
              ButtonStyle.Primary
            )

          );



          return interaction.reply({

            embeds: [embed],

            components: [row],

            flags: 64

          });

        }



        // ROBLOX

        if (
          interaction.customId ===
          "rb"
        ) {

          return interaction.reply({

            content:
"🛒 Shop Roblox đang cập nhật",

            flags: 64

          });

        }



        // LIEN QUAN

        if (
          interaction.customId ===
          "lq"
        ) {

          return interaction.reply({

            content:
"🛒 Shop Liên Quân đang cập nhật",

            flags: 64

          });

        }



        // FF 50K

        if (
          interaction.customId ===
          "ff_50k"
        ) {

          const embed =
          new EmbedBuilder()

          .setTitle(
            "💳 THANH TOÁN"
          )

          .setDescription(

`📦 Gói:
Free Fire 50K

💵 Giá:
50.000đ

🏦 Ngân hàng:
${process.env.BANK_NAME}

👤 Chủ TK:
${process.env.BANK_OWNER}

🔢 STK:
${process.env.BANK_NUMBER}

📝 Nội dung:
FF50_${interaction.user.id}`

          )

          .setImage(

`https://img.vietqr.io/image/MB-${process.env.BANK_NUMBER}-compact2.png?amount=50000&addInfo=FF50_${interaction.user.id}`

          )

          .setColor("Green");



          const row =
          new ActionRowBuilder()

          .addComponents(

            new ButtonBuilder()

            .setCustomId(
              "check_ff50"
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

            flags: 64

          });

        }



        // CHECK PAYMENT

        if (
          interaction.customId ===
          "check_ff50"
        ) {

          return interaction.reply({

            content:

`✅ Thanh toán thành công

👤 Tài khoản:
kenios_ff_vip

🔑 Mật khẩu:
123456789`,

            flags: 64

          });

        }

      }



      // =====================
      // MODAL SUBMIT
      // =====================

      if (
        interaction.isModalSubmit()
      ) {

        if (
          interaction.customId ===
          "modal_add_category"
        ) {

          return submitCategory(
            interaction
          );

        }

      }



      // =====================
      // SELECT MENU
      // =====================

      if (
        interaction.isStringSelectMenu()
      ) {

        if (
          interaction.customId ===
          "select_delete_category"
        ) {

          return deleteCategory(
            interaction
          );

        }

      }

    } catch (err) {

      console.log(err);



      try {

        if (
          !interaction.replied
        ) {

          await interaction.reply({

            content:
"❌ Bot đang gặp lỗi",

            flags: 64

          });

        }

      } catch {}

    }

  }

);



// LOGIN

client.login(
  process.env.TOKEN
);
