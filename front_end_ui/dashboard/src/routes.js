// Viện Dưỡng Lão An Nghỉ MUI layouts
import Landing from "layouts/dashboards/landing";
import Default from "layouts/dashboards/default";
import Automotive from "layouts/dashboards/automotive";
import SmartHome from "layouts/dashboards/smart-home";
import VRDefault from "layouts/dashboards/virtual-reality/vr-default";
import VRInfo from "layouts/dashboards/virtual-reality/vr-info";
import CRM from "layouts/dashboards/crm";
import ProfileOverview from "layouts/pages/profile/profile-overview";
import Teams from "layouts/pages/profile/teams";
import AllProjects from "layouts/pages/profile/all-projects";
import Reports from "layouts/pages/users/reports";
import NewUser from "layouts/pages/users/new-user";
import RoomForm from "layouts/pages/users/room-form";
import Payment from "layouts/pages/payment";
import Camera from "layouts/pages/Camera";
import ViewCamera from "layouts/pages/viewcamera";
import Settings from "layouts/account/settings";
import Billing from "layouts/account/billing";
import Invoice from "layouts/account/invoice";
import Bill from "layouts/account/invoice/bill";
import Security from "layouts/account/security";
import General from "layouts/pages/projects/general";
import Timeline from "layouts/timeline";
import NewProject from "layouts/pages/projects/new-project";
import Widgets from "layouts/pages/widgets";
import Room from "layouts/room";
import Charts from "layouts/pages/charts";
import SweetAlerts from "layouts/pages/sweet-alerts";
import Notifications from "layouts/pages/notifications";
import PricingPage from "layouts/pages/pricing-page";
import RTL from "layouts/pages/rtl";
import Kanban from "layouts/applications/kanban";
import Wizard from "layouts/applications/wizard";
import DataTablesUser from "layouts/management/data-tables-user";
import DataTablesPharmacist from "layouts/management/data-tables-pharmacist";
import DataTablesNurse from "layouts/management/data-tables-nurse";
import DataTablesHR from "layouts/management/data-tables-hr";
import DataTablesDoctor from "layouts/management/data-tables-doctor";
import DataTablesAccountant from "layouts/management/data-tables-accountant";
import DataTablesMedicine from "layouts/management/data-tables-medicine";
import DataTablesElderly from "layouts/elderly/data-tables-elderly";
import DataTableArising from "layouts/management/data-tables-arising";
import Activity from "layouts/activity/data-tables-activity";
import NewElderly from "layouts/elderly/new-elderly";
import Calendar from "layouts/applications/calendar";
import Analytics from "layouts/applications/analytics";
import Overview from "layouts/statistical/overview";
import NewProduct from "layouts/statistical/products/new-product";
import EditProduct from "layouts/statistical/products/edit-product";
import ProductPage from "layouts/statistical/products/product-page";
import ProductsList from "layouts/statistical/products/products-list";
import OrderList from "layouts/statistical/orders/order-list";
import OrderDetails from "layouts/statistical/orders/order-details";
import Referral from "layouts/statistical/referral";
import SignInBasic from "layouts/authentication/sign-in/basic";
import SignInCover from "layouts/authentication/sign-in/cover";
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import SignUpBasic from "layouts/authentication/sign-up/basic";
import SignUpCover from "layouts/authentication/sign-up/cover";
import SignUpIllustration from "layouts/authentication/sign-up/illustration";
import ResetBasic from "layouts/authentication/reset-password/basic";
import ResetCover from "layouts/authentication/reset-password/cover";
import ResetIllustration from "layouts/authentication/reset-password/illustration";
import LockBasic from "layouts/authentication/lock/basic";
import LockCover from "layouts/authentication/lock/cover";
import LockIllustration from "layouts/authentication/lock/illustration";
import VerificationBasic from "layouts/authentication/2-step-verification/basic";
import VerificationCover from "layouts/authentication/2-step-verification/cover";
import VerificationIllustration from "layouts/authentication/2-step-verification/illustration";
import Error404 from "layouts/authentication/error/404";
import Error500 from "layouts/authentication/error/500";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import Cookies from "js-cookie";
import { Icon } from "@mui/material";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import MenuList from "layouts/management/data-tables-menu";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import MedicalTimeline from "layouts/management/MedicalExamination/timeline";
import MedicalTimelineForCertainElderly from "layouts/management/MedicalExamForCertainElderly/timeline";
import ElderlyInfo from "layouts/elderly/view-elderly/components/BasicInfo";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
const routes = [
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-shop" />,
    route: "/dashboards/landing",
    component: <SmartHome />,
  },
  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Account",
    key: "account",
    icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-circle-08" />,
    collapse: [
      {
        name: "Settings",
        key: "settings",
        route: "/account/settings",
        component: <Settings />,
      },
      // {
      //   name: "Billing",
      //   key: "billing",
      //   route: "/account/billing",
      //   component: <Billing />,
      // },
      // {
      //   name: "Security",
      //   key: "security",
      //   route: "/account/security",
      //   component: <Security />,
      // },
    ],
  },
  {
    type: "collapse",
    name: "Pages",
    key: "pages",
    role: true,
    roleShow: [1, 2, 5, 6],
    icon: <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-ungroup" />,
    collapse: [
      // {
      //   name: "Profile",
      //   key: "profile",
      //   collapse: [
      //     {
      //       name: "Profile Overview",
      //       key: "profile-overview",
      //       route: "/pages/profile/profile-overview",
      //       component: <ProfileOverview />,
      //     },
      //     {
      //       name: "Teams",
      //       key: "teams",
      //       route: "/pages/profile/teams",
      //       component: <Teams />,
      //     },
      //     {
      //       name: "All Projects",
      //       key: "all-projects",
      //       route: "/pages/profile/all-projects",
      //       component: <AllProjects />,
      //     },
      //   ],
      // },
      // {
      //   name: "Users",
      //   key: "users",
      //   collapse: [
      //     {
      //       name: "Reports",
      //       key: "reports",
      //       route: "/pages/users/reports",
      //       component: <Reports />,
      //     },
      //     {
      //       name: "New User",
      //       key: "new-user",
      //       route: "/pages/users/new-user",
      //       component: <NewUser />,
      //     },
      //   ],
      // },
      // {
      //   name: "Projects",
      //   key: "projects",
      //   collapse: [
      //     {
      //       name: "General",
      //       key: "general",
      //       route: "/pages/projects/general",
      //       component: <General />,
      //     },
      //     {
      //       name: "Timeline",
      //       key: "timeline",
      //       route: "/pages/projects/timeline/:id",
      //       component: <Timeline />,
      //     },
      //     {
      //       name: "New Project",
      //       key: "new-project",
      //       route: "/pages/projects/new-project",
      //       component: <NewProject />,
      //     },
      //   ],
      // },
      {
        name: "Pricing Page",
        key: "pricing-page",
        route: "/pages/pricing-page",
        role: true,
        roleShow: [1, 2, 5, 6],
        component: <PricingPage />,
      },
      // { name: "RTL", key: "rtl", route: "/pages/rtl", component: <RTL /> },
      // { name: "Widgets", key: "widgets", route: "/pages/widgets", component: <Widgets /> },
      // { name: "Charts", key: "charts", route: "/pages/charts", component: <Charts /> },
      // {
      //   name: "Sweet Alerts",
      //   key: "sweet-alerts",
      //   route: "/pages/sweet-alerts",
      //   component: <SweetAlerts />,
      // },
      // {
      //   name: "Notfications",
      //   key: "notifications",
      //   route: "/pages/notifications",
      //   component: <Notifications />,
      // },
      {
        name: "Payment",
        key: "payment",
        route: "/pages/payment",
        role: true,
        roleShow: [1, 2, 6],
        component: <Payment />,
      },
      // {
      //   name: "Camera",
      //   key: "Camera",
      //   route: "/pages/Camera",
      //   component: <Camera />,
      // },
      // {
      //   name: "ViewCamera",
      //   key: "viewcamera",
      //   route: "/pages/viewcamera",
      //   component: <ViewCamera />,
      // },
    ],
  },
  {
    type: "collapse",
    name: "Statistical",
    key: "statistical",
    role: true,
    roleShow: [1, 6],
    icon: <ArgonBox component="i" color="success" fontSize="14px" className="ni ni-archive-2" />,
    collapse: [
      {
        name: "Overview",
        key: "overview",
        route: "/statistical/overview",
        role: true,
        roleShow: [1, 6],
        component: <Overview />,
      },
    ],
  },
  // {
  //   type: "collapse",
  //   name: "Ecommerce",
  //   key: "ecommerce",
  //   icon: <ArgonBox component="i" color="success" fontSize="14px" className="ni ni-archive-2" />,
  //   collapse: [
  //     {
  //       name: "Overview",
  //       key: "overview",
  //       route: "/ecommerce/overview",
  //       component: <Overview />,
  //     },
  //     {
  //       name: "Products",
  //       key: "products",
  //       collapse: [
  //         {
  //           name: "New Product",
  //           key: "new-product",
  //           route: "/ecommerce/products/new-product",
  //           component: <NewProduct />,
  //         },
  //         {
  //           name: "Edit Product",
  //           key: "edit-product",
  //           route: "/ecommerce/products/edit-product",
  //           component: <EditProduct />,
  //         },
  //         {
  //           name: "Product Page",
  //           key: "product-page",
  //           route: "/ecommerce/products/product-page",
  //           component: <ProductPage />,
  //         },
  //         {
  //           name: "Products List",
  //           key: "products-list",
  //           route: "/ecommerce/products/products-list",
  //           component: <ProductsList />,
  //         },
  //       ],
  //     },
  //     {
  //       name: "Orders",
  //       key: "orders",
  //       collapse: [
  //         {
  //           name: "Order List",
  //           key: "order-list",
  //           route: "/ecommerce/orders/order-list",
  //           component: <OrderList />,
  //         },
  //         {
  //           name: "Order Details",
  //           key: "order-details",
  //           route: "/ecommerce/orders/order-details",
  //           component: <OrderDetails />,
  //         },
  //       ],
  //     },
  //     {
  //       name: "Referral",
  //       key: "referral",
  //       route: "/ecommerce/referral",
  //       component: <Referral />,
  //     },
  //   ],
  // },
  // {
  //   type: "collapse",
  //   name: "Authentication",
  //   key: "authentication",
  //   icon: <ArgonBox component="i" color="error" fontSize="14px" className="ni ni-single-copy-04" />,
  //   collapse: [
  //     {
  //       name: "Sign In",
  //       key: "sign-in",
  //       collapse: [
  //         {
  //           name: "Basic",
  //           key: "basic",
  //           route: "/authentication/sign-in/basic",
  //           component: <SignInBasic />,
  //         },
  //         {
  //           name: "Cover",
  //           key: "cover",
  //           route: "/authentication/sign-in/cover",
  //           component: <SignInCover />,
  //         },
  //         {
  //           name: "Illustration",
  //           key: "illustration",
  //           route: "/authentication/sign-in/illustration",
  //           component: <SignInIllustration />,
  //         },
  //       ],
  //     },
  //     {
  //       name: "Sign Up",
  //       key: "sign-up",
  //       collapse: [
  //         {
  //           name: "Basic",
  //           key: "basic",
  //           route: "/authentication/sign-up/basic",
  //           component: <SignUpBasic />,
  //         },
  //         {
  //           name: "Cover",
  //           key: "cover",
  //           route: "/authentication/sign-up/cover",
  //           component: <SignUpCover />,
  //         },
  //         {
  //           name: "Illustration",
  //           key: "illustration",
  //           route: "/authentication/sign-up/illustration",
  //           component: <SignUpIllustration />,
  //         },
  //       ],
  //     },
  //     {
  //       name: "Reset Password",
  //       key: "reset-password",
  //       collapse: [
  //         {
  //           name: "Basic",
  //           key: "basic",
  //           route: "/authentication/reset-password/basic",
  //           component: <ResetBasic />,
  //         },
  //         {
  //           name: "Cover",
  //           key: "cover",
  //           route: "/authentication/reset-password/cover",
  //           component: <ResetCover />,
  //         },
  //         {
  //           name: "Illustration",
  //           key: "illustration",
  //           route: "/authentication/reset-password/illustration",
  //           component: <ResetIllustration />,
  //         },
  //       ],
  //     },
  //     {
  //       name: "Lock",
  //       key: "lock",
  //       collapse: [
  //         {
  //           name: "Basic",
  //           key: "basic",
  //           route: "/authentication/lock/basic",
  //           component: <LockBasic />,
  //         },
  //         {
  //           name: "Cover",
  //           key: "cover",
  //           route: "/authentication/lock/cover",
  //           component: <LockCover />,
  //         },
  //         {
  //           name: "Illustration",
  //           key: "illustration",
  //           route: "/authentication/lock/illustration",
  //           component: <LockIllustration />,
  //         },
  //       ],
  //     },
  //     {
  //       name: "2-Step Verification",
  //       key: "2-step-verification",
  //       collapse: [
  //         {
  //           name: "Basic",
  //           key: "basic",
  //           route: "/authentication/verification/basic",
  //           component: <VerificationBasic />,
  //         },
  //         {
  //           name: "Cover",
  //           key: "cover",
  //           route: "/authentication/verification/cover",
  //           component: <VerificationCover />,
  //         },
  //         {
  //           name: "Illustration",
  //           key: "illustration",
  //           route: "/authentication/verification/illustration",
  //           component: <VerificationIllustration />,
  //         },
  //       ],
  //     },
  //     {
  //       name: "Error",
  //       key: "error",
  //       collapse: [
  //         {
  //           name: "Error 404",
  //           key: "error-404",
  //           route: "/authentication/error/404",
  //           component: <Error404 />,
  //         },
  //         {
  //           name: "Error 500",
  //           key: "error-500",
  //           route: "/authentication/error/500",
  //           component: <Error500 />,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   type: "collapse",
  //   name: "Applications",
  //   key: "applications",
  //   icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-ui-04" />,
  //   collapse: [
  //     {
  //       name: "Kanban",
  //       key: "kanban",
  //       route: "/applications/kanban",
  //       component: <Kanban />,
  //     },
  //     {
  //       name: "Wizard",
  //       key: "wizard",
  //       route: "/applications/wizard",
  //       component: <Wizard />,
  //     },
  //     {
  //       name: "Calendar",
  //       key: "calendar",
  //       route: "/applications/calendar",
  //       component: <Calendar />,
  //     },
  //     {
  //       name: "Analytics",
  //       key: "analytics",
  //       route: "/applications/analytics",
  //       component: <Analytics />,
  //     },
  //   ],
  // },
  {
    type: "collapse",
    name: "Elderly",
    key: "elderly",
    role: true,
    roleShow: [1, 2, 3, 4, 5],
    icon: <Icon>elderly</Icon>,
    collapse: [
      {
        name: "Data tables Elderly",
        key: "date-tables-elderly",
        route: "/elderly/date-tables-elderly",
        role: true,
        roleShow: [1, 2, 3, 4, 5],
        component: <DataTablesElderly />,
      },
      {
        name: "New Ederly",
        key: "new-ederly",
        route: "/elderly/new-ederly",
        role: true,
        roleShow: [2],
        component: <NewElderly />,
      },
    ],
  },
];

routes.push({
  type: "collapse",
  name: "Management",
  key: "management",
  icon: <Icon color="warning">group</Icon>,
  role: true,
  roleShow: [1, 3, 5, 6, 7],
  collapse: [
    {
      name: "Data tables User",
      key: "data-tables-user",
      route: "/management/data-tables-user",
      role: true,
      roleShow: [1, 5],
      component: <DataTablesUser />,
    },
    {
      name: "Data tables Pharmacist",
      key: "data-tables-pharmacist",
      route: "/management/data-tables-pharmacist",
      role: true,
      roleShow: [1, 5],
      component: <DataTablesPharmacist />,
    },
    {
      name: "Data tables Accountant",
      key: "data-tables-accountant",
      route: "/management/data-tables-accountant",
      role: true,
      roleShow: [1, 5],
      component: <DataTablesAccountant />,
    },
    {
      name: "Data tables HR",
      key: "data-tables-hr",
      route: "/management/data-tables-hr",
      role: true,
      roleShow: [1, 5],
      component: <DataTablesHR />,
    },
    {
      name: "Data tables Nurse",
      key: "data-tables-nurse",
      route: "/management/data-tables-nurse",
      role: true,
      roleShow: [1, 3, 5],
      component: <DataTablesNurse />,
    },
    {
      name: "Data tables Doctor",
      key: "data-tables-doctor",
      route: "/management/data-tables-doctor",
      role: true,
      roleShow: [1, 5],
      component: <DataTablesDoctor />,
    },
    {
      name: "Data tables Medicine",
      key: "data-tables-medicine",
      route: "/management/data-tables-medicine",
      role: true,
      roleShow: [1, 3, 7],
      component: <DataTablesMedicine />,
    },
    // {
    //   name: "Data tables Menu",
    //   key: "data-tables-menu",
    //   route: "/management/data-tables-menu",
    //   role: true,
    //   roleShow: [1, 5],
    //   component: <MenuList />,
    // },
    {
      name: "Data tables Arising",
      key: "data-tables-arising",
      route: "/management/data-tables-arising",
      role: true,
      roleShow: [1, 6],
      component: <DataTableArising />,
    },
  ],
});
// routes.push({
//   type: "collapse",
//   name: "Timeline",
//   key: "timeline",
//   icon: <ViewTimelineIcon color="success" />,
//   role: true,
//   roleShow: [1, 2, 5],
//   collapse: [
//     {
//       name: "Timeline",
//       key: "timeline",
//       route: "/timeline/list",
//       component: <Timeline />,
//     },
//   ],
// });

routes.push({
  type: "collapse",
  name: "Activity",
  key: "Activity",
  icon: <MedicalInformationIcon color="error" />,
  role: true,
  roleShow: [1, 5],
  collapse: [
    {
      name: "Data tables Activity",
      key: "data-tables-activity",
      route: "/layouts/activity/data-tables-activity",
      role: true,
      roleShow: [1, 3, 4, 5],
      component: <Activity />,
    },
  ],
});
routes.push({
  type: "collapse",
  name: "Room",
  key: "Room",
  icon: <NightShelterIcon color="info" />,
  role: true,
  roleShow: [1, 5],
  icon: <NightShelterIcon />,
  collapse: [
    {
      name: "Room",
      key: "Room",
      route: "/room/list",
      role: true,
      roleShow: [1, 5],
      component: <Room />,
    },
    {
      name: "New Room",
      key: "newRoom",
      route: "/room/new",
      role: true,
      roleShow: [1, 5],
      component: <RoomForm />,
    },
  ],
});
routes.push({
  type: "collapse",
  name: "Camera",
  key: "Camera",
  icon: <CameraIndoorIcon color="primary" />,
  role: true,
  roleShow: [1, 2],
  collapse: [
    {
      name: "Camera",
      key: "Camera",
      route: "/pages/camera",
      role: true,
      roleShow: [1],
      component: <Camera />,
    },
    {
      name: "View Camera",
      key: "View_Camera",
      route: "/pages/viewcamera",
      role: true,
      roleShow: [1, 2],
      component: <ViewCamera />,
    },
  ],
});
routes.push({
  type: "hide",
  name: "hide",
  key: "hide",
  icon: <Icon>group</Icon>,
  role: true,
  roleShow: [1, 2, 3, 4, 5, 6, 7],
  collapse: [
    {
      route: "/account/invoice/:id",
      component: <Invoice />,
    },
    {
      route: "/account/bill/:id",
      component: <Bill />,
    },
    {
      name: "Certain elderly",
      key: "certain",
      route: "/examinationHistory/elderly/:id",
      component: <MedicalTimelineForCertainElderly />,
    },
    {
      route: "/view/elderly/:id",
      component: <ElderlyInfo />,
    },
    {
      name: "Sign In",
      key: "sign-in",
      collapse: [
        {
          name: "Basic",
          key: "basic",
          route: "/authentication/sign-in/basic",
          component: <SignInBasic />,
        },
        {
          name: "Cover",
          key: "cover",
          route: "/authentication/sign-in/cover",
          component: <SignInCover />,
        },
        {
          name: "Illustration",
          key: "illustration",
          route: "/authentication/sign-in/illustration",
          component: <SignInIllustration />,
        },
      ],
    },
    {
      name: "Sign Up",
      key: "sign-up",
      collapse: [
        {
          name: "Basic",
          key: "basic",
          route: "/authentication/sign-up/basic",
          component: <SignUpBasic />,
        },
        {
          name: "Cover",
          key: "cover",
          route: "/authentication/sign-up/cover",
          component: <SignUpCover />,
        },
        {
          name: "Illustration",
          key: "illustration",
          route: "/authentication/sign-up/illustration",
          component: <SignUpIllustration />,
        },
      ],
    },
    {
      name: "Reset Password",
      key: "reset-password",
      collapse: [
        {
          name: "Basic",
          key: "basic",
          route: "/authentication/reset-password/basic",
          component: <ResetBasic />,
        },
        {
          name: "Cover",
          key: "cover",
          route: "/authentication/reset-password/cover",
          component: <ResetCover />,
        },
        {
          name: "Illustration",
          key: "illustration",
          route: "/authentication/reset-password/illustration",
          component: <ResetIllustration />,
        },
      ],
    },
    {
      name: "Lock",
      key: "lock",
      collapse: [
        {
          name: "Basic",
          key: "basic",
          route: "/authentication/lock/basic",
          component: <LockBasic />,
        },
        {
          name: "Cover",
          key: "cover",
          route: "/authentication/lock/cover",
          component: <LockCover />,
        },
        {
          name: "Illustration",
          key: "illustration",
          route: "/authentication/lock/illustration",
          component: <LockIllustration />,
        },
      ],
    },
    {
      name: "2-Step Verification",
      key: "2-step-verification",
      collapse: [
        {
          name: "Basic",
          key: "basic",
          route: "/authentication/verification/basic",
          component: <VerificationBasic />,
        },
        {
          name: "Cover",
          key: "cover",
          route: "/authentication/verification/cover",
          component: <VerificationCover />,
        },
        {
          name: "Illustration",
          key: "illustration",
          route: "/authentication/verification/illustration",
          component: <VerificationIllustration />,
        },
      ],
    },
    {
      name: "Error",
      key: "error",
      collapse: [
        {
          name: "Error 404",
          key: "error-404",
          route: "/authentication/error/404",
          component: <Error404 />,
        },
        {
          name: "Error 500",
          key: "error-500",
          route: "/authentication/error/500",
          component: <Error500 />,
        },
      ],
    },
    {
      name: "Data tables Activity",
      key: "data-tables-activity",
      route: "/layouts/activity/data-tables-activity",
      role: true,
      roleShow: [1, 3, 4, 5],
      component: <Activity />,
    },
    {
      name: "Data tables Menu",
      key: "data-tables-menu",
      route: "/management/data-tables-menu",
      role: true,
      roleShow: [1, 5],
      component: <MenuList />,
    },
    {
      name: "Timeline",
      key: "timeline",
      route: "/timeline/:id",
      role: true,
      roleShow: [1, 3, 4, 5],
      component: <Timeline />,
    },
    {
      name: "Time line",
      key: "EH-timeline",
      route: "/examinationHistory/timeline",
      component: <MedicalTimeline />,
    },
  ],
});
export default routes;
