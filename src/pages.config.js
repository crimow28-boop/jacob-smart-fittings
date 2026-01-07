import Accessibility from './pages/Accessibility';
import Category from './pages/Category';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Product from './pages/Product';
import Terms from './pages/Terms';
import About from './pages/About';
import Contact from './pages/Contact';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Accessibility": Accessibility,
    "Category": Category,
    "Home": Home,
    "Privacy": Privacy,
    "Product": Product,
    "Terms": Terms,
    "About": About,
    "Contact": Contact,
}

export const pagesConfig = {
    mainPage: "Product",
    Pages: PAGES,
    Layout: __Layout,
};