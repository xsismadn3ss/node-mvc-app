const {getProductsWithCategory} = require('./modules/queries')

async function dashboardView(req, res){
    const products = await getProductsWithCategory()
    if(products){
        return res.render('dashboard', {products})
    }else{
        return res.render('dashboard')
    }
}

module.exports = {
    dashboardView
}