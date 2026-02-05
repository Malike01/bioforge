import React, { Suspense } from "react";
import { PageLoader } from "@/components/ui/PageLoader";

export const Loadable =
  (Component: React.LazyExoticComponent<any>) => (props: any) => (
    <Suspense fallback={<PageLoader />}>
      <Component {...props} />
    </Suspense>
  );
