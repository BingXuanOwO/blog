import { A } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { Button } from "~/components/Button";
import { HeadingTitle } from "~/components/HeadingTitle";

export function InternalServerError() {
  return (
    <main class="gap-6 flex flex-col justify-center items-center
      fixed h-full w-full left-0 top-0 -z-10">
      <HeadingTitle title="抱歉，出了点问题" />
      <HttpStatusCode code={500} />
      
      <div class="flex gap-4 text-center justify-center">
        <span>服务器内部错误</span>
        <span>错误码：500</span>
      </div>

      <div class="flex gap-4 text-center justify-center">
        <A href="/"><Button>回到主页</Button></A>
        <Button onClick={() => { window.history.back() }} primary>回到上一页</Button>
      </div>

    </main>
  );
}
