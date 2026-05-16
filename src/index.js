require("dotenv").config();

const {
Client,
GatewayIntentBits,
Partials,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle,
EmbedBuilder,
ModalBuilder,
TextInputBuilder,
TextInputStyle
} = require("discord.js");

const express = require("express");

const app = express();

app.get("/", (req, res) => {
res.send("KENIOS SHOP ONLINE");
});

app.listen(process.env.PORT || 8080, () => {
console.log(`✅ WEB ONLINE ${process.env.PORT || 8080}`);
});

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
],
partials: [Partials.Channel]
});

const categories = [];
const products = [];

client.once("ready", () => {
console.log(`✅ ${client.user.tag} TRỰC TUYẾN`);
});

client.on("messageCreate", async (message) => {

if (message.author.bot) return;

if (message.content === "!shop") {

const embed = new EmbedBuilder()
.setTitle("🛒 KENIOS SHOP")
.setDescription(
"✨ Chào mừng đến shop tự động\n\n📂 Chọn danh mục bên dưới"
)
.setColor("Blue");

const row = new ActionRowBuilder();

categories.slice(0, 3).forEach((cat) => {

row.addComponents(
new ButtonBuilder()
.setCustomId(`category_${cat.id}`)
.setLabel(cat.name)
.setStyle(ButtonStyle.Primary)
);

});

row.addComponents(
new ButtonBuilder()
.setCustomId("add_category")
.setLabel("➕ DANH MỤC")
.setStyle(ButtonStyle.Success),

new ButtonBuilder()
.setCustomId("add_product")
.setLabel("🛒 SẢN PHẨM")
.setStyle(ButtonStyle.Danger)
);

await message.reply({
embeds: [embed],
components: [row]
});

}

});

client.on("interactionCreate", async (interaction) => {

try {

if (interaction.isButton()) {

console.log("BUTTON:", interaction.customId);

if (interaction.customId === "add_category") {

const modal = new ModalBuilder()
.setCustomId("create_category")
.setTitle("TẠO DANH MỤC");

const nameInput = new TextInputBuilder()
.setCustomId("category_name")
.setLabel("Tên danh mục")
.setStyle(TextInputStyle.Short)
.setRequired(true);

const descInput = new TextInputBuilder()
.setCustomId("category_desc")
.setLabel("Mô tả danh mục")
.setStyle(TextInputStyle.Paragraph)
.setRequired(true);

const row1 = new ActionRowBuilder().addComponents(nameInput);
const row2 = new ActionRowBuilder().addComponents(descInput);

modal.addComponents(row1, row2);

await interaction.showModal(modal);

return;
}

if (interaction.customId === "add_product") {

const modal = new ModalBuilder()
.setCustomId("create_product")
.setTitle("TẠO SẢN PHẨM");

const nameInput = new TextInputBuilder()
.setCustomId("product_name")
.setLabel("Tên sản phẩm")
.setStyle(TextInputStyle.Short)
.setRequired(true);

const priceInput = new TextInputBuilder()
.setCustomId("product_price")
.setLabel("Giá sản phẩm")
.setStyle(TextInputStyle.Short)
.setRequired(true);

const descInput = new TextInputBuilder()
.setCustomId("product_desc")
.setLabel("Mô tả sản phẩm")
.setStyle(TextInputStyle.Paragraph)
.setRequired(true);

const row1 = new ActionRowBuilder().addComponents(nameInput);
const row2 = new ActionRowBuilder().addComponents(priceInput);
const row3 = new ActionRowBuilder().addComponents(descInput);

modal.addComponents(row1, row2, row3);

await interaction.showModal(modal);

return;
}

if (interaction.customId.startsWith("category_")) {

const id = interaction.customId.replace("category_", "");

const category = categories.find(x => x.id === id);

if (!category) {

await interaction.reply({
content: "❌ Không tìm thấy danh mục",
ephemeral: true
});

return;
}

const embed = new EmbedBuilder()
.setTitle(`📂 ${category.name}`)
.setDescription(category.desc)
.setColor("Blue");

const row = new ActionRowBuilder();

const categoryProducts = products.filter(
x => x.category === category.name
);

categoryProducts.slice(0, 5).forEach((product) => {

row.addComponents(
new ButtonBuilder()
.setCustomId(`product_${product.id}`)
.setLabel(product.name)
.setStyle(ButtonStyle.Secondary)
);

});

await interaction.reply({
embeds: [embed],
components: row.components.length ? [row] : [],
ephemeral: true
});

return;
}

if (interaction.customId.startsWith("product_")) {

const id = interaction.customId.replace("product_", "");

const product = products.find(x => x.id === id);

if (!product) {

await interaction.reply({
content: "❌ Không tìm thấy sản phẩm",
ephemeral: true
});

return;
}

const embed = new EmbedBuilder()
.setTitle(`🛒 ${product.name}`)
.addFields(
{
name: "💵 Giá",
value: product.price
},
{
name: "📝 Mô tả",
value: product.desc
}
)
.setColor("Green");

await interaction.reply({
embeds: [embed],
ephemeral: true
});

return;
}

}

if (interaction.isModalSubmit()) {

console.log("MODAL:", interaction.customId);

if (interaction.customId === "create_category") {

const name =
interaction.fields.getTextInputValue("category_name");

const desc =
interaction.fields.getTextInputValue("category_desc");

categories.push({
id: Date.now().toString(),
name,
desc
});

await interaction.reply({
content: `✅ Đã tạo danh mục: ${name}`,
ephemeral: true
});

return;
}

if (interaction.customId === "create_product") {

const name =
interaction.fields.getTextInputValue("product_name");

const price =
interaction.fields.getTextInputValue("product_price");

const desc =
interaction.fields.getTextInputValue("product_desc");

let categoryName = "Chưa phân loại";

if (categories.length > 0) {
categoryName = categories[0].name;
}

products.push({
id: Date.now().toString(),
name,
price,
desc,
category: categoryName
});

await interaction.reply({
content: `✅ Đã tạo sản phẩm: ${name}`,
ephemeral: true
});

return;
}

}

} catch (err) {

console.log("ERROR:", err);

try {

if (!interaction.replied && !interaction.deferred) {

await interaction.reply({
content: "❌ Bot bị lỗi",
ephemeral: true
});

}

} catch (e) {
console.log(e);
}

}

});

client.login(process.env.TOKEN);
