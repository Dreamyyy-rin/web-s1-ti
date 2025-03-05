import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../breadcrumb";
import { Link, useLocation, useRouterState } from "@tanstack/react-router";

const BaseSidebarBreadcrumb = () => {
  const matches = useRouterState({ select: (s) => s.matches });
  const { pathname } = useLocation();

  const breadcrumbs: { title: string; path: string }[] = [];
  for (const match of matches) {
    if (breadcrumbs.some((b) => b.title === match.context.title)) {
      continue;
    }
    breadcrumbs.push({
      title: match.context.title,
      path: match.pathname,
    });
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem >
              {breadcrumb.path === pathname ? (
                <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={breadcrumb.path}>{breadcrumb.title}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BaseSidebarBreadcrumb;
