const {
SlashCommandBuilder,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");

module.exports = {

data:
new SlashCommandBuilder()

.setName("admin")

.setDescription(
"Mở admin panel"
),

async execute(interaction) {

if (
interaction.user.id !==
process.env.ADMIN_ID
) {

return interaction.reply({

content:
"❌ Bạn không phải admin",

ephemeral: true

});

}

const embed =
new EmbedBuilder()

.setColor("#8e44ad")

.setTitle(
"⚙️ ADMIN PANEL"
)

.setDescription(

`📂 DANH MỤC
• Thêm / Xóa

📦 SẢN PHẨM
• Tên + Giá + Thời gian

🔑 KEY
• Nhập / Xem / Xóa

📊 HỆ THỐNG
• Broadcast / Thống kê`

);

const row1 =
new ActionRowBuilder()

.addComponents(

new ButtonBuilder()

.setCustomId(
"add_category"
)

.setLabel(
"📂 Thêm DM"
)

.setStyle(
ButtonStyle.Success
),

new ButtonBuilder()

.setCustomId(
"delete_category"
)

.setLabel(
"🗑️ Xóa DM"
)

.setStyle(
ButtonStyle.Danger
),

new ButtonBuilder()

.setCustomId(
"add_product"
)

.setLabel(
"📦 Thêm SP"
)

.setStyle(
ButtonStyle.Primary
)

);

const row2 =
new ActionRowBuilder()

.addComponents(

new ButtonBuilder()

.setCustomId(
"edit_product"
)

.setLabel(
"✏️ Sửa SP"
)

.setStyle(
ButtonStyle.Secondary
),

new ButtonBuilder()

.setCustomId(
"edit_price"
)

.setLabel(
"💰 Sửa Giá"
)

.setStyle(
ButtonStyle.Success
),

new ButtonBuilder()

.setCustomId(
"edit_duration"
)

.setLabel(
"⏰ Sửa TG"
)

.setStyle(
ButtonStyle.Primary
)

);

const row3 =
new ActionRowBuilder()

.addComponents(

new ButtonBuilder()

.setCustomId(
"add_key"
)

.setLabel(
"🔑 Nhập Key"
)

.setStyle(
ButtonStyle.Success
),

new ButtonBuilder()

.setCustomId(
"view_keys"
)

.setLabel(
"📋 Xem Key"
)

.setStyle(
ButtonStyle.Primary
),

new ButtonBuilder()

.setCustomId(
"delete_key"
)

.setLabel(
"🗑️ Xóa Key"
)

.setStyle(
ButtonStyle.Danger
)

);

const row4 =
new ActionRowBuilder()

.addComponents(

new ButtonBuilder()

.setCustomId(
"buyers"
)

.setLabel(
"👤 Người Mua"
)

.setStyle(
ButtonStyle.Primary
),

new ButtonBuilder()

.setCustomId(
"sold_products"
)

.setLabel(
"🛒 Đã Bán"
)

.setStyle(
ButtonStyle.Secondary
),

new ButtonBuilder()

.setCustomId(
"statistics"
)

.setLabel(
"📊 Thống Kê"
)

.setStyle(
ButtonStyle.Success
)

);

await interaction.reply({

embeds: [embed],

components: [

row1,
row2,
row3,
row4

]

});

}

};
