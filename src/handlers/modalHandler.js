const Product =
require("../models/Product");

module.exports = (client) => {

client.on(
"interactionCreate",
async interaction => {

if (!interaction.isModalSubmit())
return;

// =====================
// ADD PRODUCT
// =====================

if (
interaction.customId ===
"add_product_modal"
) {

const category =
interaction.fields.getTextInputValue(
"category"
);

const name =
interaction.fields.getTextInputValue(
"product"
);

const duration =
interaction.fields.getTextInputValue(
"duration"
);

const price =
interaction.fields.getTextInputValue(
"price"
);

await Product.create({

category,

name,

duration,

price

});

await interaction.reply({

content:
"✅ Đã thêm sản phẩm",

ephemeral: true

});

}

}

);

};
