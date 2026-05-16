const {

  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder

} = require('discord.js');

const Category =
require('../models/Category');



// ========================
// ADD CATEGORY BUTTON
// ========================

async function addCategoryButton(
  interaction
) {

  const modal = new ModalBuilder()

  .setCustomId(
    "modal_add_category"
  )

  .setTitle(
    "➕ Thêm Danh Mục"
  );



  const input =
  new TextInputBuilder()

  .setCustomId(
    "category_name"
  )

  .setLabel(
    "Tên danh mục"
  )

  .setStyle(
    TextInputStyle.Short
  )

  .setRequired(true);



  modal.addComponents(

    new ActionRowBuilder()

    .addComponents(input)

  );



  return interaction.showModal(
    modal
  );

}



// ========================
// SUBMIT CATEGORY
// ========================

async function submitCategory(
  interaction
) {

  const name =
  interaction.fields
  .getTextInputValue(
    "category_name"
  );



  await Category.create({

    name

  });



  return interaction.reply({

    content:
`✅ Đã tạo danh mục ${name}`,

    flags: 64

  });

}



// ========================
// DELETE CATEGORY BUTTON
// ========================

async function deleteCategoryButton(
  interaction
) {

  const categories =
  await Category.find();



  if (!categories.length) {

    return interaction.reply({

      content:
"❌ Không có danh mục",

      flags: 64

    });

  }



  const menu =
  new StringSelectMenuBuilder()

  .setCustomId(
    "select_delete_category"
  )

  .setPlaceholder(
    "🗑️ Chọn danh mục"
  );



  categories.forEach(c => {

    menu.addOptions(

      new StringSelectMenuOptionBuilder()

      .setLabel(c.name)

      .setValue(
        c._id.toString()
      )

    );

  });



  const row =
  new ActionRowBuilder()

  .addComponents(menu);



  return interaction.reply({

    content:
"🗑️ Chọn danh mục cần xóa",

    components: [row],

    flags: 64

  });

}



// ========================
// DELETE CATEGORY
// ========================

async function deleteCategory(
  interaction
) {

  const id =
  interaction.values[0];



  const category =
  await Category.findById(id);



  if (!category) {

    return interaction.reply({

      content:
"❌ Không tìm thấy",

      flags: 64

    });

  }



  await Category.findByIdAndDelete(id);



  return interaction.update({

    content:
`✅ Đã xóa ${category.name}`,

    embeds: [],

    components: []

  });

}



module.exports = {

  addCategoryButton,

  submitCategory,

  deleteCategoryButton,

  deleteCategory

};
``
