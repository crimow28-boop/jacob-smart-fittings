import Product from './pages/Product';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Product": Product,
}

export const pagesConfig = {
    mainPage: "Product",
    Pages: PAGES,
    Layout: __Layout,
};