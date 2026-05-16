module.exports = (client) => {

client.on(
"interactionCreate",
async interaction => {

if (!interaction.isModalSubmit()) return;

if (
interaction.customId ===
"add_product_modal"
) {

const category =
interaction.fields.getTextInputValue("category");

const product =
interaction.fields.getTextInputValue("product");

const duration =
interaction.fields.getTextInputValue("duration");

const price =
interaction.fields.getTextInputValue("price");

await interaction.reply({

content:

`✅ Đã thêm sản phẩm

📂 ${category}

📦 ${product}

⏰ ${duration}

💰 ${price}`,

ephemeral: true

});

}

}

);

};
