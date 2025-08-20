import { Start } from "../views/Start/Start";
import { Additions } from "../views/Additions/Additions";
import type { PageProps } from "../components/Page/Page";

type RouteConfig = {
  path: string;
  Component: React.ComponentType<PageProps>;
};

const indexRoutes: RouteConfig[] = [
  { path: "/", Component: Start },
  { path: "/additions", Component: Additions },
];

export default indexRoutes;