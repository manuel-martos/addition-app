import { Start } from "../views/Start/Start";
import { Additions } from "../views/Additions/Additions";

const indexRoutes = [
  { 
    path: '/', 
    Component: Start 
  },
  { 
    path: '/additions', 
    Component: Additions 
  }
];

export default indexRoutes;
