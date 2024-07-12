import { FunctionComponent } from "react";
import { Route } from "react-router-dom";

type Props = {
  component: FunctionComponent;
  path: string;
};

const PublicRoutes: FunctionComponent<Props> = (prop: Props) => {
  return <Route {...prop} />;
};
export default PublicRoutes;
