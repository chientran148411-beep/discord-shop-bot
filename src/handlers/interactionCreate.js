const {
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder
} = require("discord.js");

const Category = require("../models/Category");
const Product = require("../models/Product");
const Key = require("../models/Key");
const User = require("../models/User");

module.exports = {
  name: Events.InteractionCreate,

  async execute(interaction) {

    // =====================================
    // BUTTONS
    // =====================================

    if (interaction.isButton()) {

      // =========================
      // THÊM DANH MỤC
      // =========================

      if (interaction.customId === "add_category") {

        const modal = new ModalBuilder()
          .setCustomId("addCategoryModal")
          .setTitle("📂 Thêm Danh Mục");

        const input = new TextInputBuilder()
          .setCustomId("category")
          .setLabel("Tên danh mục")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(input)
        );

        return interaction.showModal(modal);
      }

      // =========================
      // XÓA DANH MỤC
      // =========================

      if (interaction.customId === "delete_category") {

        const modal = new ModalBuilder()
          .setCustomId("deleteCategoryModal")
          .setTitle("🗑️ Xóa Danh Mục");

        const input = new TextInputBuilder()
          .setCustomId("category")
          .setLabel("Tên danh mục")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(input)
        );

        return interaction.showModal(modal);
      }

      // =========================
      // THÊM SẢN PHẨM
      // =========================

      if (interaction.customId === "add_product") {

        const modal = new ModalBuilder()
          .setCustomId("addProductModal")
          .setTitle("📦 Thêm Sản Phẩm");

        const category = new TextInputBuilder()
          .setCustomId("category")
          .setLabel("Danh mục")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const name = new TextInputBuilder()
          .setCustomId("name")
          .setLabel("Tên sản phẩm")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const duration = new TextInputBuilder()
          .setCustomId("duration")
          .setLabel("Thời gian")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const price = new TextInputBuilder()
          .setCustomId("price")
          .setLabel("Giá sản phẩm")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(category),
          new ActionRowBuilder().addComponents(name),
          new ActionRowBuilder().addComponents(duration),
          new ActionRowBuilder().addComponents(price)
        );

        return interaction.showModal(modal);
      }

      // =========================
      // SỬA TÊN SP
      // =========================

      if (interaction.customId === "edit_product") {

        const modal = new ModalBuilder()
          .setCustomId("editProductModal")
          .setTitle("✏️ Sửa Tên SP");

        const oldName = new TextInputBuilder()
          .setCustomId("oldName")
          .setLabel("Tên cũ")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const newName = new TextInputBuilder()
          .setCustomId("newName")
          .setLabel("Tên mới")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(oldName),
          new ActionRowBuilder().addComponents(newName)
        );

        return interaction.showModal(modal);
      }

      // =========================
      // BẬT / TẮT SP
      // =========================

      if (interaction.customId === "toggle_product") {

        const modal = new ModalBuilder()
          .setCustomId("toggleProductModal")
          .setTitle("🔄 Bật / Tắt SP");

        const product = new TextInputBuilder()
          .setCustomId("product")
          .setLabel("Tên sản phẩm")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(product)
        );

        return interaction.showModal(modal);
      }

      // =========================
      // SỬA GIÁ
      // =========================

      if (interaction.customId === "edit_price") {

        const modal = new ModalBuilder()
          .setCustomId("editPriceModal")
          .setTitle("💰 Sửa Giá");

        const product = new TextInputBuilder()
          .setCustomId("product")
          .setLabel("Tên sản phẩm")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const price = new TextInputBuilder()
          .setCustomId("price")
          .setLabel("Giá mới")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(product),
          new ActionRowBuilder().addComponents(price)
        );

        return interaction.showModal(modal);
      }

      // =========================
      // SỬA THỜI GIAN
      // =========================

      if (interaction.customId === "edit_duration") {

        const modal = new ModalBuilder()
          .setCustomId("editDurationModal")
          .setTitle("⏰ Sửa Thời Gian");

        const product = new TextInputBuilder()
          .setCustomId("product")
          .setLabel("Tên sản phẩm")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const duration = new TextInputBuilder()
          .setCustomId("duration")
          .setLabel("Thời gian mới")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(product),
          new ActionRowBuilder().addComponents(duration)
        );

        return interaction.showModal(modal);
      }

      // =========================
      // NHẬP KEY
      // =========================

      if (interaction.customId === "add_key") {

        const modal = new ModalBuilder()
          .setCustomId("addKeyModal")
          .setTitle("🔑 Nhập Key");

        const product = new TextInputBuilder()
          .setCustomId("product")
          .setLabel("Tên sản phẩm")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const key = new TextInputBuilder()
          .setCustomId("key")
          .setLabel("Key")
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(product),
          new ActionRowBuilder().addComponents(key)
        );

        return interaction.showModal(modal);
      }

      // =========================
      // XÓA KEY
      // =========================

      if (interaction.customId === "delete_key") {

        const modal = new ModalBuilder()
          .setCustomId("deleteKeyModal")
          .setTitle("🗑️ Xóa Key");

        const key = new TextInputBuilder()
          .setCustomId("key")
          .setLabel("Nhập key")
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(key)
        );

        return interaction.showModal(modal);
      }

      // =========================
      // XEM KEY
      // =========================

      if (interaction.customId === "view_keys") {

        const keys = await Key.find();

        if (!keys.length) {
          return interaction.reply({
            content: "❌ Không có key",
            ephemeral: true
          });
        }

        const text = keys
          .map(k => `📦 ${k.product}\n🔑 ${k.key}`)
          .join("\n\n");

        return interaction.reply({
          content: text,
          ephemeral: true
        });
      }

      // =========================
      // NGƯỜI MUA
      // =========================

      if (interaction.customId === "buyers") {

        const users = await User.find();

        if (!users.length) {
          return interaction.reply({
            content: "❌ Chưa có user",
            ephemeral: true
          });
        }

        const text = users
          .map(u => `👤 ${u.userId}`)
          .join("\n");

        return interaction.reply({
          content: text,
          ephemeral: true
        });
      }

      // =========================
      // ĐÃ BÁN
      // =========================

      if (interaction.customId === "sold_products") {

        const products = await Product.find();

        const text = products
          .map(p => `📦 ${p.name} | 🛒 ${p.sold || 0}`)
          .join("\n");

        return interaction.reply({
          content: text || "❌ Chưa có dữ liệu",
          ephemeral: true
        });
      }

      // =========================
      // THỐNG KÊ
      // =========================

      if (interaction.customId === "statistics") {

        const categories =
          await Category.countDocuments();

        const products =
          await Product.countDocuments();

        const keys =
          await Key.countDocuments();

        const users =
          await User.countDocuments();

        const embed = new EmbedBuilder()
          .setColor("#00ff99")
          .setTitle("📊 THỐNG KÊ")
          .setDescription(
`📂 Danh mục: ${categories}
📦 Sản phẩm: ${products}
🔑 Keys: ${keys}
👤 Users: ${users}`
          );

        return interaction.reply({
          embeds: [embed],
          ephemeral: true
        });
      }

      // =========================
      // BROADCAST
      // =========================

      if (interaction.customId === "broadcast") {

        const modal = new ModalBuilder()
          .setCustomId("broadcastModal")
          .setTitle("📢 Broadcast");

        const message = new TextInputBuilder()
          .setCustomId("message")
          .setLabel("Nội dung")
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(message)
        );

        return interaction.showModal(modal);
      }

    }

    // =====================================
    // MODAL SUBMIT
    // =====================================

    if (interaction.isModalSubmit()) {

      // =========================
      // ADD CATEGORY
      // =========================

      if (interaction.customId === "addCategoryModal") {

        const category =
          interaction.fields.getTextInputValue("category");

        await Category.create({
          name: category
        });

        return interaction.reply({
          content: `✅ Đã thêm ${category}`,
          ephemeral: true
        });
      }

      // =========================
      // DELETE CATEGORY
      // =========================

      if (interaction.customId === "deleteCategoryModal") {

        const category =
          interaction.fields.getTextInputValue("category");

        await Category.findOneAndDelete({
          name: category
        });

        return interaction.reply({
          content: `🗑️ Đã xóa ${category}`,
          ephemeral: true
        });
      }

      // =========================
      // ADD PRODUCT
      // =========================

      if (interaction.customId === "addProductModal") {

        const category =
          interaction.fields.getTextInputValue("category");

        const name =
          interaction.fields.getTextInputValue("name");

        const duration =
          interaction.fields.getTextInputValue("duration");

        const price =
          interaction.fields.getTextInputValue("price");

        await Product.create({
          category,
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
💰 ${price}`,
          ephemeral: true
        });
      }

      // =========================
      // EDIT PRODUCT
      // =========================

      if (interaction.customId === "editProductModal") {

        const oldName =
          interaction.fields.getTextInputValue("oldName");

        const newName =
          interaction.fields.getTextInputValue("newName");

        await Product.findOneAndUpdate(
          { name: oldName },
          { name: newName }
        );

        return interaction.reply({
          content: `✅ Đã sửa ${oldName} → ${newName}`,
          ephemeral: true
        });
      }

      // =========================
      // TOGGLE PRODUCT
      // =========================

      if (interaction.customId === "toggleProductModal") {

        const productName =
          interaction.fields.getTextInputValue("product");

        const product =
          await Product.findOne({
            name: productName
          });

        if (!product) {
          return interaction.reply({
            content: "❌ Không tìm thấy sản phẩm",
            ephemeral: true
          });
        }

        product.enabled = !product.enabled;

        await product.save();

        return interaction.reply({
          content:
            `✅ ${product.name} => ${
              product.enabled
                ? "ĐÃ BẬT"
                : "ĐÃ TẮT"
            }`,
          ephemeral: true
        });
      }

      // =========================
      // EDIT PRICE
      // =========================

      if (interaction.customId === "editPriceModal") {

        const product =
          interaction.fields.getTextInputValue("product");

        const price =
          interaction.fields.getTextInputValue("price");

        await Product.findOneAndUpdate(
          { name: product },
          { price }
        );

        return interaction.reply({
          content: `✅ Đã sửa giá ${product}`,
          ephemeral: true
        });
      }

      // =========================
      // EDIT DURATION
      // =========================

      if (interaction.customId === "editDurationModal") {

        const product =
          interaction.fields.getTextInputValue("product");

        const duration =
          interaction.fields.getTextInputValue("duration");

        await Product.findOneAndUpdate(
          { name: product },
          { duration }
        );

        return interaction.reply({
          content: `✅ Đã sửa thời gian ${product}`,
          ephemeral: true
        });
      }

      // =========================
      // ADD KEY
      // =========================

      if (interaction.customId === "addKeyModal") {

        const product =
          interaction.fields.getTextInputValue("product");

        const key =
          interaction.fields.getTextInputValue("key");

        await Key.create({
          product,
          key
        });

        return interaction.reply({
          content: "✅ Đã thêm key",
          ephemeral: true
        });
      }

      // =========================
      // DELETE KEY
      // =========================

      if (interaction.customId === "deleteKeyModal") {

        const key =
          interaction.fields.getTextInputValue("key");

        await Key.findOneAndDelete({
          key
        });

        return interaction.reply({
          content: "🗑️ Đã xóa key",
          ephemeral: true
        });
      }

      // =========================
      // BROADCAST
      // =========================

      if (interaction.customId === "broadcastModal") {

        const message =
          interaction.fields.getTextInputValue("message");

        const users = await User.find();

        let sent = 0;

        for (const user of users) {

          try {

            const member =
              await interaction.client.users.fetch(
                user.userId
              );

            await member.send(message);

            sent++;

          } catch (err) {}
        }

        return interaction.reply({
          content:
            `✅ Đã gửi broadcast tới ${sent} user`,
          ephemeral: true
        });
      }

    }

  }
};
