import { createElement, Suspense } from "react";
import PageSkeleton from "./LoadingSkeleton/PageSkeleton";

export default function LazyRoute({ element: Component }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {createElement(Component)}
    </Suspense>
  );
}
