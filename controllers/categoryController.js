const {
  getCategories,
  getCategory,
  activateCategory,
  createCategory,
  updateCategory,
  deactivateCategory
} = require("./modules/queries");

module.exports = {
  categoryView: async (req, res) => {
    const categories = await getCategories();
    if (categories) {
      res.render("categories", { categories });
    } else {
      const message = "No hay categorias registradas";
      res.render("categories", { message });
    }
  },

  registerCategory: async (req, res) => {
    const { nombre } = req.body;
    const categories = await getCategories();
    if (!nombre) {
      let message = "El nombre es requerido";
      if (categories) {
        return res.render("categories", { message, categories });
      } else {
        return res.render("categories", { message });
      }
    }

    const category = await getCategory(nombre);
    if (category) {
      const activated = await activateCategory(nombre);
      if (activated) {
        return res.redirect("/categorias?created");
      } else {
        return res.render("categories", {
          message: "Esta categoria ya existe",
          categories,
        });
      }
    } else {
      const created = await createCategory(nombre);
      if (created) {
        console.log("Categoria creada con exito");
        return res.redirect("/categorias?created");
      }
    }
  },

  editCategory: async (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;
    if (!nombre) {
      return res.redirect("/categorias?name_required");
    }

    const updated = await updateCategory(id, nombre);
    if (updated) {
      return res.redirect("/categorias?updated");
    } else {
      return res.redirect("/categorias");
    }
  },

  deleteCategory: async (req, res) => {
    const id = req.params.id;
    const done = await deactivateCategory(id)
    if (done){
      return res.redirect('/categorias?deleted')
    }else{
      return res.redirect('/categorias')
    }
  },
};
