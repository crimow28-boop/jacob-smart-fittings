import Accessibility from './pages/Accessibility';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Product from './pages/Product';
import Terms from './pages/Terms';
import About from './pages/About';
import Contact from './pages/Contact';
import Category from './pages/Category';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Accessibility": Accessibility,
    "Home": Home,
    "Privacy": Privacy,
    "Product": Product,
    "Terms": Terms,
    "About": About,
    "Contact": Contact,
    "Category": Category,
}

export const pagesConfig = {
    mainPage: "Product",
    Pages: PAGES,
    Layout: __Layout,
};