const {

ModalBuilder,
TextInputBuilder,
TextInputStyle,
ActionRowBuilder

} = require("discord.js");

module.exports = (client) => {

client.on(
"interactionCreate",
async interaction => {

if (!interaction.isButton())
return;

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
"📦 Thêm sản phẩm"
);

const category =
new TextInputBuilder()

.setCustomId(
"category"
)

.setLabel(
"Danh mục"
)

.setStyle(
TextInputStyle.Short
)

.setRequired(true);

const product =
new TextInputBuilder()

.setCustomId(
"product"
)

.setLabel(
"Tên sản phẩm"
)

.setStyle(
TextInputStyle.Short
)

.setRequired(true);

const duration =
new TextInputBuilder()

.setCustomId(
"duration"
)

.setLabel(
"Thời gian"
)

.setStyle(
TextInputStyle.Short
)

.setRequired(true);

const price =
new TextInputBuilder()

.setCustomId(
"price"
)

.setLabel(
"Giá sản phẩm"
)

.setStyle(
TextInputStyle.Short
)

.setRequired(true);

modal.addComponents(

new ActionRowBuilder()

.addComponents(category),

new ActionRowBuilder()

.addComponents(product),

new ActionRowBuilder()

.addComponents(duration),

new ActionRowBuilder()

.addComponents(price)

);

await interaction.showModal(
modal
);

}

}

);

};
