import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./component/home";
import UserLayout from "./layout";
import Order from "./component/order";
import Statistics from "./component/statistics/Statistics";
import ProductAdd from "./component/home/product/ProductAdd";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<UserLayout />}>
      <Route path="home">
        <Route index element={<Home />} />
        <Route path="add" element={<ProductAdd />} />
      </Route>
      <Route path="order" element={<Order />} />
      <Route path="statistics" element={<Statistics />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
