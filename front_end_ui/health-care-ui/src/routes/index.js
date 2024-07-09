import Home from "@/pages/Home/Home.js";
import {
  OurServicesLayout,
  AboutusLayout,
  DoctorLayout,
  ContactLayout,
} from "@/layouts";
import Product from "@/pages/Product/Product.js";
import AboutUs from "@/pages/AboutUs/AboutUs.js";
import Contact from "@/pages/Contact/Contact.js";
import Doctor from "@/pages/Doctors Page/doctor.js";
// Public routes
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/product", component: Product, layout: OurServicesLayout },
  { path: "/about", component: AboutUs, layout: AboutusLayout },
  { path: "/contact", component: Contact, layout: ContactLayout },
  { path: "/doctors", component: Doctor, layout: DoctorLayout },
];

export { publicRoutes };
