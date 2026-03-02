import { Route, Routes } from "react-router-dom";
import AppSidebar from "./components/pages/Sidebar";
import Login from "./components/pages/Login";
import PrivateRoute from "./components/pages/PrivateRoute";
import AddCategory from "./components/pages/AddCategory";
import CategoryList from "./components/pages/CategoryList";
import AddProduct from "./components/pages/AddProduct";
import ProductList from "./components/pages/ProductList";

function App() {
  return (
    <>
      <Routes>
        {/* public route */}
        <Route path="/login" element={<Login />} />

        {/* private Route */}
        <Route element={<PrivateRoute />}>
          <Route element={<AppSidebar />}>
            <Route index element={<h2>Dashboard</h2>} />

            <Route path="/dashboard" element={<h2>Dashboard</h2>} />
            <Route path="/addCategory" element={<AddCategory />} />
            <Route path="/categoryList" element={<CategoryList />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/productList" element={<ProductList />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
