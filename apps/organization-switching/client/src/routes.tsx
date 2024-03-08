import { RouteObject } from "react-router-dom";
import { Content } from './Content'

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Content />,
    children: [
      {
        path: ":orgId",
        element: <Content />
      }
    ]
  },
]