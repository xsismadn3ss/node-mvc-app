const Product = require("../../models/products");
const Category = require("../../models/category");

async function getProducts() {
  try {
    const productos = await Product.findAll({
      where: {
        active: true,
      },
    });
    if (productos.length >= 1) {
      return productos;
    }
    console.log("no hay productos registrados");
    return undefined;
  } catch (error) {
    console.error(error);
    console.log("Error al obtener los productos");
    return undefined;
  }
}

async function createProduct(
  nombre,
  descripcion,
  precio,
  cantidad,
  categoriaId
) {
  try {
    await Product.create({
      nombre,
      descripcion,
      precio,
      cantidad,
      categoriaId,
    });
    console.log("Producto creado con exito");
    return true;
  } catch (error) {
    console.error(error);
    console.error("Error creando el producto");
    return false;
  }
}

async function updateProduct(
  id,
  nombre,
  descripcion,
  precio,
  cantidad,
  categoriaId
) {
  try {
    const [rowsAffected] = await Product.update(
      {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        cantidad: cantidad,
        categoriaId: categoriaId,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (rowsAffected == 1) {
      console.log("Producto actualizado con exito");
      return true;
    }
    console.log("No hay cambios que realizar para este producto");
    return false;
  } catch (error) {
    console.error(error);
    console.log("Error actualizando el producto");
    return false;
  }
}

async function deactivateProduct(id) {
  try {
    const [rowsAffected] = await Product.update(
      { active: false },
      {
        where: {
          id: id,
          active: true
        },
      }
    );
    if (rowsAffected == 1) {
      console.log("Producto desactivado con exito");
      return true;
    }
    console.log("El producto ya esta desactivado");
    return false;
  } catch (error) {
    console.error(error);
    console.log("Error deshabilitando procutro");
    return false;
  }
}

async function getProductsWithCategory() {
  try {
    const products_n_categories = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["id", "nombre"],
          where: {
            active: true,
          },
        },
      ],
      attributes: ["id", "nombre", "descripcion", "precio", "cantidad"],
      where: {
        active: true,
      },
      raw: true,
      nest: true,
    });
    if (products_n_categories.length >= 1) {
      return products_n_categories;
    }
    console.log("no hay producto disponibles");
    return undefined;
  } catch (error) {
    console.error(error);
    console.log("Erro al obtener los producto");
    return undefined;
  }
}

async function getCategories() {
  try {
    const categories = await Category.findAll({
      where: {
        active: true,
      },
      attributes: ['id','nombre', 'active']
    });
    if (categories.length >= 1) {
      return categories;
    }
    console.log("no hay categorias registradas");
    return undefined;
  } catch (error) {
    // console.error(error);
    console.log("Error al obtener las categorias");
    return undefined;
  }
}

async function getCategory(name) {
  try {
    const category = await Category.findOne({
      where: {
        nombre: name,
      },
    });
    if (category) {
      return category;
    }
    return undefined;
  } catch (error) {
    console.error(error);
    console.log("Error al obtener la categoria");
    return undefined;
  }
}

async function activateCategory(nombre) {
  try {
    const [rowsAffected] = await Category.update(
      { active: true },
      {
        where: {
          nombre: nombre,
          active: false,
        },
      }
    );

    if (rowsAffected == 1) {
      console.log("Categoria activada con exito");
      return true;
    }
    console.log("La categoria ya esta activada");
    return false;
  } catch (error) {
    console.error(error);
    console.log("Error habilitando categoria");
    return false;
  }
}

async function deactivateCategory(id) {
  try {
    const [rowsAffected] = await Category.update(
      { active: false },
      {
        where: {
          id: id,
          active: true,
        },
      }
    );

    if (rowsAffected == 1) {
      console.log("Categoria desativada con exito");
      return true;
    }
    console.log("La categoria ya esta desactivada");
    return false;
  } catch (error) {
    console.error(error);
    console.log("Error deshabilitando categoria");
    return false;
  }
}

async function updateCategory(id, nombre) {
  try {
    const [rowsAffected] = await Category.update(
      { nombre: nombre },
      {
        where: {
          id: id,
        },
      }
    );

    if (rowsAffected == 1) {
      console.log("Categoria actualizada con exito");
      return true;
    }
    console.log("No hay cambios que hacer para esta categoria");
    return false;
  } catch (error) {
    console.error(error);
    console.log("Error actualizando categoria");
    return false;
  }
}

async function createCategory(nombre) {
  try {
    await Category.create({ nombre });
    console.log("categoria creada con exito");
    return true;
  } catch (error) {
    console.error(error);
    console.log("Error creando la categoria");
    return false;
  }
}

module.exports = {
  getProducts,
  getCategories,
  getProductsWithCategory,
  getCategory,
  createProduct,
  createCategory,
  activateCategory,
  deactivateCategory,
  deactivateProduct,
  updateCategory,
  updateProduct,
};
