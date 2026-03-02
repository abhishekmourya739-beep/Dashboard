import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaHome, FaBox } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Topbar from "./Topbar";
import { FaUserShield } from "react-icons/fa";

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* TOP NAVBAR */}
      <Topbar onToggle={() => setCollapsed(!collapsed)} />

      {/* BODY */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* SIDEBAR */}
        <Sidebar
          width="220px"
          collapsedWidth="70px"
          collapsed={collapsed}
          transitionDuration={300}
          style={{ backgroundColor: "#bcf3ff" }}
        >
          {/* LOGO / BRAND */}
          <div
            style={{
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <FaUserShield size={28} color="#6366f1" />

            {!collapsed && (
              <div
                style={{
                  overflow: "hidden",
                  transition: "all 400ms ease",
                  opacity: collapsed ? 0 : 1,
                  width: collapsed ? 0 : "auto",
                  whiteSpace: "nowrap",
                }}
              >
                <h3 style={{ fontWeight: 700, fontSize: "16px" }}>
                  Admin Dashboard
                </h3>
                <p style={{ fontSize: "12px", color: "#6b7280" }}>
                  Administrator
                </p>
              </div>
            )}
          </div>
          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                color: active ? "#7b1fa2" : "#4a148c",
                backgroundColor: active ? "#e1bee7" : "transparent",
                "&:hover": {
                  backgroundColor: "#f3e5f5",
                },
              }),
            }}
          >
            {/* Dashboard */}
            <MenuItem
              icon={<FaHome />}
              component={<NavLink to="/dashboard" />}
              active={location.pathname === "/dashboard"}
            >
              Dashboard
            </MenuItem>

            {/* Category */}
            <SubMenu label="Category" icon={<MdCategory />}>
              <MenuItem
                icon={<MdCategory />}
                component={<NavLink to="/categoryList" />}
                active={location.pathname === "/categoryList"}
              >
                Category List
              </MenuItem>

              <MenuItem
                icon={<IoMdAdd />}
                component={<NavLink to="/addCategory" />}
                active={location.pathname === "/addCategory"}
              >
                Add Category
              </MenuItem>
            </SubMenu>

            {/* Product */}
            <SubMenu label="Product" icon={<FaBox />}>
              <MenuItem
                icon={<FaBox />}
                component={<NavLink to="/productList" />}
                active={location.pathname === "/productList"}
              >
                Product List
              </MenuItem>

              <MenuItem
                icon={<IoMdAdd />}
                component={<NavLink to="/addProduct" />}
                active={location.pathname === "/addProduct"}
              >
                Add Product
              </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>

        <main
          style={{
            flex: 1,
            width: "100%",
            overflowX: "hidden",
            // overflowY: "auto",
          }}
        >
          <Outlet /> {/* 👈 THIS IS REQUIRED */}
        </main>
      </div>
    </div>
  );
};

export default AppSidebar;
