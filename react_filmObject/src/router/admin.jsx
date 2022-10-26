import React, { Suspense } from "react";
import routes from "./routes";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "@/component/loading";

const AdminRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {/* 重定向要放在前面,因为下面的配置路由中有一个notFound,它的匹配规则是* */}
        {/* 并且这个路由一定要使用精确匹配exact,因为不精确匹配就会导致下面的路由失效 */}
        <Redirect exact from="/" to="/dashboard" />
        {routes.map((item) => (
          <Route {...item} />
        ))}
      </Switch>
    </Suspense>
  );
};

export default AdminRoute;
