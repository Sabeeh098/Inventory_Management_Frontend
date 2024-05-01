import Dashboard from "../MainPage/Dashboard";
import Activities from "../MainPage/Activities";
import Product from "../MainPage/Product/index";
import Quotation from "../MainPage/Quotation/index";
import Components from "../MainPage/Components/index";
import Elements from "../MainPage/elements";
import Charts from "../MainPage/charts";
import Icons from "../MainPage/icons";
import Forms from "../MainPage/forms";
import Tables from "../MainPage/tables";
import Application from "../MainPage/application";
import Settings from "../MainPage/settings";
import BlankPage from "../MainPage/BlankPage";
import HomeThree from "../MainPage/Home/home3";
import HomeFoure from "../MainPage/Home/home4";
import HomeTwo from "../MainPage/Home/home2";
import IndexOne from "../MainPage/Home/home1";

export default [
  {
    path: "dashboard",
    component: Dashboard,
  },
  {
    path: "activities",
    component: Activities,
  },
  {
    path: "product",
    component: Product,
  },
  {
    path: "quotation",
    component: Quotation,
  },
 
  {
    path: "components",
    component: Components,
  },
  {
    path: "blankpage",
    component: BlankPage,
  },
  {
    path: "elements",
    component: Elements,
  },
  {
    path: "charts",
    component: Charts,
  },
  {
    path: "icons",
    component: Icons,
  },
  {
    path: "forms",
    component: Forms,
  },
  {
    path: "table",
    component: Tables,
  },
  {
    path: "application",
    component: Application,
  },
  {
    path: "settings",
    component: Settings,
  },
  
  {
    path: "index-three",
    component: HomeThree,
  },
  {
    path: "index-four",
    component: HomeFoure,
  },
  {
    path: "index-two",
    component: HomeTwo,
  },
  {
    path: "index-one",
    component: IndexOne,
  },
];
