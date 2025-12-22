import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import AddRequest from "../Pages/Dashboard/AddRequest/AddRequest";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "../provider/PrivateRoute";
import MyRequest from "../Pages/Dashboard/MyRequest/MyRequest";
import Donate from "../Pages/Donate/Donate";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import SearchRequest from "../Pages/SearchRequest/SearchRequest";
import AllRequest from "../Pages/AllRequest/AllRequest";
import RequestDetails from "../Pages/RequestDetails.jsx/RequestDetails";
import AllDonationRequests from "../Pages/AllDonationRequests/AllDonationRequests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/donate",
        element: (
          <PrivateRoute>
            <Donate></Donate>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "/search",
        element: <SearchRequest></SearchRequest>,
      },
      {
        path: "/all-request",
        element: <AllRequest></AllRequest>,
      },
      {
        path: "/request/:id",
        element: (
          <PrivateRoute>
            <RequestDetails></RequestDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        Component: MainDashboard,
      },
      {
        path: "add-request",
        Component: AddRequest,
      },
      {
        path: "all-users",
        Component: AllUsers,
      },
      {
        path: "my-request",
        Component: MyRequest,
      },
      {
        path: "all-blood-donation-request",
        element: <AllDonationRequests />,
      },
    ],
  },
]);

export default router;
