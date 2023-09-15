import { A } from "solid-start";
import { HttpStatusCode } from "solid-start/server";
import { Button } from "~/components/Button";
import { HeadingTitle } from "~/components/HeadingTitle";

export function NotFound() {
  return (
    <main class="gap-6 flex flex-col justify-center items-center
      fixed h-full w-full left-0 top-0 -z-10">
      <HeadingTitle title="页面不见了" />
      <HttpStatusCode code={404} />
      
      <div class="flex gap-4 text-center justify-center">
        <span>错误码：404 </span>
      </div>

      <div class="flex gap-4 text-center justify-center">
        <A href="/"><Button>回到主页</Button></A>
        <Button onClick={() => { window.history.back() }} primary>回到上一页</Button>
      </div>
    </main>
  );
}
