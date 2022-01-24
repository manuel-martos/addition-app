import Start from "../views/Start/Start";
import { Additions } from "../views/Additions/Additions";
import { Multiplications } from "../views/Multiplications/Multiplications";

const indexRoutes = [
  { 
    path: '/', 
    Component: Start 
  },
  { 
    path: '/additions', 
    Component: Additions 
  },
  { 
    path: '/multiplications', 
    Component: Multiplications 
  }
];

export default indexRoutes;
