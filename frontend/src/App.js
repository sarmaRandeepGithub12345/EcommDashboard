import AddProduct from "./pages/AddProduct";
import {Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom';
import UpdateProduct from "./pages/UpdateProduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Layout } from "./components/Layout";
import "./App.css"
import useCommonItems from "./utils/useCommonItems";
import ProductList from "./pages/ProductList";
import Test from "./pages/Test";

function App() {
  const {obj} = useCommonItems();
  
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children : [
        {
          path:"/add_product",
          element: !obj.user? <Navigate to="/"/>: <AddProduct/>
        },
        {
          path:"/update_product/:id",
          element: !obj.user? <Navigate to="/"/>:<UpdateProduct/>
        },
        {
          path:"/all_products",
          element: !obj.user? <Navigate to="/"/>:<ProductList/>
        },
        {

          path:"/",
          element:obj.user?<Navigate to="/all_products"/>:<Login />
        },
        {
          path:"/register",
          element:obj.user?<Navigate to="/all_products"/>:<Register />
        },
        {
          path:"/test",
          element: <Test/>
        }

      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
