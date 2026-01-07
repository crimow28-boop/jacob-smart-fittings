import About from './pages/About';
import Category from './pages/Category';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Product from './pages/Product';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Accessibility from './pages/Accessibility';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Category": Category,
    "Contact": Contact,
    "Home": Home,
    "Product": Product,
    "Terms": Terms,
    "Privacy": Privacy,
    "Accessibility": Accessibility,
}

export const pagesConfig = {
    mainPage: "Product",
    Pages: PAGES,
    Layout: __Layout,
};