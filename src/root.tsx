// @refresh reload
import { Suspense } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import TopAppBar from "./components/TopAppBar";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>冰轩's blog</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class="bg-background text-neutral-200 flex-col">
        <Suspense>
          <ErrorBoundary>
            <TopAppBar />
            <div class="max-w-screen-lg p-6 mx-auto w-full">
              <Routes>
                <FileRoutes />
              </Routes>
            </div>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
