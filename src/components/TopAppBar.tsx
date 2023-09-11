import { createSignal } from "solid-js";
import { A, useLocation } from "solid-start";

export default function TopAppBar() {
  return (
    <nav class="w-full bg-background flex h-12 px-2">
      {/* left */}
      <ul class="flex grow flex-row items-center">
        <A href="/" class="hover:text-white">
          <li class="px-4 py-2 rounded hover:bg-hover-overlay transition-all">
            <span class="text-main font-medium">冰轩</span>'s blog
          </li>
        </A>
      </ul>

      {/* right */}
      <ul class="flex flex-row center items-center">
        <div class="hover:text-white group relative cursor-default">
          <li class="px-4 py-2 rounded hover:bg-hover-overlay transition-all">
            分类
            {/* hover on category button */}
            <CategoryList categories={["默认分类", "虚拟机", "简谈", "前端"]} />
          </li>
        </div>
        <A href="/archive" class="hover:text-white">
          <li class="px-4 py-2 rounded hover:bg-hover-overlay transition-all">
            归档
          </li>
        </A>
      </ul>
    </nav>
  );
}

function CategoryList(props: { categories: string[] }) {
  const [focus, setFocus] = createSignal(false);
  return (
    <div class={`
        ${!focus() && "opacity-0 pointer-events-none"} 
        group-hover:opacity-100 group-hover:pointer-events-auto 
        absolute left-1/2 -translate-x-1/2 
        flex-col pt-4 bg-transparent rounded transition-all
        `}>
      <ul class="p-2 bg-container rounded">
        {props.categories.map((value) =>
          <A class="whitespace-nowrap p-4 py-3 block hover:bg-hover-overlay transition-all rounded"
            href={`/category/${value}`} onclick={(el)=>{setFocus(false)}} 
            onblur={()=>setFocus(false)} onfocus={()=>{setFocus(true)}}>{value}</A>
        )}
      </ul>
    </div>
  )
}