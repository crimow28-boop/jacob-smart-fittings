import About from './pages/About';
import Category from './pages/Category';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Product from './pages/Product';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Category": Category,
    "Contact": Contact,
    "Home": Home,
    "Product": Product,
}

export const pagesConfig = {
    mainPage: "Product",
    Pages: PAGES,
    Layout: __Layout,
};