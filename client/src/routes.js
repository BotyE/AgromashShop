import Admin from "./pages/Admin";
import {ACCOUNT_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, CATALOG_ROUTE, FOLLOW_ROUTE, RECOVERY_ROUTE, SEARCH_ROUTE, ABOUT_ROUTE, CONTACTS_ROUTE, CONDITIONS_ROUTE, DELIVERY_ROUTE, PAY_ROUTE, PPO_ROUTE, USER_AGREEMENT_ROUTE, FEEDBACK_ROUTE} from "./utils/consts";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import Catalog from "./pages/Catalog";
import Follow from "./pages/Follow";
import Account from "./pages/Account";
import RecoveryPassword from "./pages/RecoveryPassword";
import ConfirmRecovery from "./pages/ConfirmRecovery";
import Search from "./pages/Search";
import About from "./components/information/About";
import Contacts from "./components/information/Contacts";
import Delivery from "./components/information/Delivery";
import Pay from "./components/information/Pay";
import PrivacyPolicyAndOffer from "./components/information/PrivacyPolicyAndOffer";
import UserAgreement from "./components/information/UserAgreement";
import Feedback from "./components/information/FeedBack";


export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: <Basket />
    },

    {
        path: ACCOUNT_ROUTE,
        Component: <Account />
    },
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin />
    },
]


export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: <Shop />
    },
    {
        path: RECOVERY_ROUTE,
        Component: <RecoveryPassword />
    },
    {
        path: RECOVERY_ROUTE + '/:id',
        Component: <ConfirmRecovery />
    },
    {
        path: SEARCH_ROUTE + '/:id',
        Component: <Search />
    },
    {
        path: LOGIN_ROUTE,
        Component: <Auth />
    },
    {
        path: ACCOUNT_ROUTE,
        Component: <Auth />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth />
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: <DevicePage />
    },

    {
        path: CATALOG_ROUTE + '/:id',
        Component: <Catalog />
    },
    {
        path: BASKET_ROUTE,
        Component: <Basket />
    },
    {
        path: CATALOG_ROUTE,
        Component: <Catalog />
    },
    {
        path: FOLLOW_ROUTE,
        Component: <Follow />
    },
    {
        path: ABOUT_ROUTE,
        Component: <About />
    },

    {
        path: CONTACTS_ROUTE,
        Component: <Contacts />
    },

    {
        path: DELIVERY_ROUTE,
        Component: <Delivery />
    },

    {
        path: PAY_ROUTE,
        Component: <Pay />
    },

    {
        path: PPO_ROUTE,
        Component: <PrivacyPolicyAndOffer />
    },

    {
        path: USER_AGREEMENT_ROUTE,
        Component: <UserAgreement />
    },

    {
        path: FEEDBACK_ROUTE,
        Component: <Feedback />
    },


]