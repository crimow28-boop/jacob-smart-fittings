import Product from './pages/Product';
import Home from './pages/Home';
import Category from './pages/Category';
import Contact from './pages/Contact';
import About from './pages/About';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Product": Product,
    "Home": Home,
    "Category": Category,
    "Contact": Contact,
    "About": About,
}

export const pagesConfig = {
    mainPage: "Product",
    Pages: PAGES,
    Layout: __Layout,
};