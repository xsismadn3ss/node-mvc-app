const {
  getCategories,
  createProduct,
  getProductsWithCategory,
  updateProduct,
  deactivateProduct
} = require("./modules/queries");

async function productView(req, res) {
  const products = await getProductsWithCategory();
  const categories = await getCategories()
  if (products) {
    console.log("Productos encontrados con exito");
    return res.render("products", { products, categories });
  } else {
    const message = "No hay productos registrados";
    return res.render("products", { message, categories });
  }
}

async function registerProduct(req, res) {
  const { nombre, descripcion, precio, cantidad, categoria } = req.body;

  if (!nombre || !descripcion || !precio || !cantidad) {
    const categories = getCategories();
    const products = getProductsWithCategory();
    const message = "Por favor rellena todos los campose requeridos";
    if (products) {
      return res.render("products", { message, products, categories });
    } else {
      return res.render("products", { message, categories });
    }
  }
  const created = await createProduct(
    nombre,
    descripcion,
    precio,
    cantidad,
    categoria
  );

  if (created) {
    return res.redirect("/productos?created");
  } else {
    const categories = await getProductsWithCategory();
    res
      .status(500)
      .render("products", {
        message: "Error al crear un nuevo producto",
        categories,
      });
  }
}

async function editProduct(req, res){
  const id = req.params.id
  const {nombre, descripcion, precio, cantidad, categoriaId} = req.body
  console.log(req.body)
  if (!nombre | !descripcion | !precio, !cantidad, !categoriaId){
    return res.redirect('/productos?fileds_required')
  }

  const updated = await updateProduct(
    id, nombre, descripcion, precio, cantidad, categoriaId
  )
  if(updated){
    return res.redirect('/productos?updated')
  }else{
    return res.redirect('/productos')
  }
}

async function  deleteProduct(req, res) {
  const id = req.params.id;
  const done = await deactivateProduct(id)
  if(done){
    return res.redirect('/productos?deleted')
  }else{
    return res.redirect('/productos')
  }
}

module.exports = {
  productView,
  registerProduct,
  editProduct,
  deleteProduct
};
