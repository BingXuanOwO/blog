// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { ErrorBoundary, Suspense } from "solid-js";
import "./app.css";
import TopAppBar from "./components/TopAppBar";
import { InternalServerError } from "./errorPages/500";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <TopAppBar />
          <main class="max-w-screen-lg p-6 mx-auto w-full">
            <ErrorBoundary fallback={<InternalServerError />}>
              <Suspense>{props.children}</Suspense>
            </ErrorBoundary>
          </main>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
