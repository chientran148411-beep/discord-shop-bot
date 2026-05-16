const shopHandler =
  require("./shopHandler");

const buyHandler =
  require("./buyHandler");

const adminPanel =
  require("./adminPanel");

module.exports = async (
  interaction
) => {

  try {

    if (
      interaction.isButton()
    ) {

      // CATEGORY

      if (
        interaction.customId.startsWith(
          "category_"
        )
      ) {

        return shopHandler(
          interaction
        );

      }

      // PRODUCT

      if (
        interaction.customId.startsWith(
          "product_"
        )
      ) {

        return buyHandler(
          interaction
        );

      }

      // ADMIN

      if (
        interaction.customId ===
        "admin_panel"
      ) {

        return adminPanel(
          interaction
        );

      }

    }

  }

  catch (err) {

    console.log(err);

  }

};
