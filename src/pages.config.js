import About from './pages/About';
import Accessibility from './pages/Accessibility';
import Category from './pages/Category';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Product from './pages/Product';
import Terms from './pages/Terms';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Accessibility": Accessibility,
    "Category": Category,
    "Contact": Contact,
    "Home": Home,
    "Privacy": Privacy,
    "Product": Product,
    "Terms": Terms,
}

export const pagesConfig = {
    mainPage: "Product",
    Pages: PAGES,
    Layout: __Layout,
};