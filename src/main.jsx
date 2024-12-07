import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

import DashboardLogin from "./pages/Dashboard/Login";
import Layout from "./pages/Dashboard/Layout";
import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/Dashboard/Users/Create";
import EditUser from "./pages/Dashboard/Users/Edit";
import Categories from "./pages/Dashboard/Categories";
import CreateCategory from "./pages/Dashboard/Categories/Create";
import EditCategory from "./pages/Dashboard/Categories/Edit";
import Products from "./pages/Dashboard/Products";
import CreateProduct from "./pages/Dashboard/Products/Create";
import EditProduct from "./pages/Dashboard/Products/Edit";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PageLayout from "./components/PageLayout";

import CartProvider from "./providers/CartProvider";
import AuthProvider from "./providers/AuthProvider";

const broswerRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="products/edit/:productId" element={<EditProduct />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/create" element={<CreateCategory />} />
        <Route path="categories/edit/:categoryId" element={<EditCategory />} />
        <Route path="users/create" element={<CreateUser />} />
        <Route path="users/edit/:userId" element={<EditUser />} />
      </Route>
      <Route path="/dashboard/login" index element={<DashboardLogin />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={broswerRouter} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
