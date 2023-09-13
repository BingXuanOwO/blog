import { A } from "solid-start";

export default function NotFound() {
  return (
    <main class="text-center gap-6 flex flex-col justify-self-center">
      <div class="flex gap-4 text-center justify-center">
        <span>错误码：404 </span><A href="/" class="underline">回到主页</A>
      </div>
    </main>
  );
}
