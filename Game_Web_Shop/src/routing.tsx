import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/partials/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./context/protected";
import GameDetail from "./components/partials/GameDetail";
import ProfilePage from "./pages/ProfilePage";
import Cart from "./components/partials/Cart";
import CheckoutForm from "./components/CheckoutForm";
import Receipt from "./components/Receipt";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderDetailsPage from "./components/partials/OrderDetailsPage";
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/PrivacyPolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/ProfilePage",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Checkout",
        element: <CheckoutForm />,
      },
      {
        path: "/receipt/:id",
        element: <Receipt />,
      },
      {
        path: "/Order_History",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <OrderHistoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Order_Details/:orderId",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <OrderDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/game/details/:id",
        element: <GameDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
