import { createSignal, onMount } from "solid-js";
import { A, useLocation, useRouteData } from "solid-start";
import server$ from "solid-start/server";
import { getCategories } from "~/data/categories";

export default function TopAppBar() {
  const [categories, setCategories] = createSignal<string[]>([])

  onMount(async () => {
    const fetchedCategories = server$(() => {
      return getCategories()
    })

    console.log("fetched Categories")
    console.log([...await fetchedCategories()])

    setCategories(
      await fetchedCategories()
    )
  })

  return (
    <nav class="w-full bg-background flex h-12 px-2">
      {/* left */}
      <div class="flex grow flex-row items-center">
        <div class="hover:text-white">
          <A href="/" class="px-4 py-2 rounded hover:bg-hover-overlay transition-all">
            <span class="text-main font-medium">冰轩</span>'s blog
          </A>
        </div>
      </div>

      {/* right */}
      <div class="flex flex-row center items-center">
        <div class="hover:text-white group relative cursor-default">
          <div class="px-4 py-2 rounded hover:bg-hover-overlay transition-all">
            分类
            {/* hover on category button */}
            <CategoryList categories={categories()} />
          </div>
        </div>
        <div class="hover:text-white">
          <A href="/archive" class="px-4 py-2 rounded hover:bg-hover-overlay transition-all">
            归档
          </A>
        </div>
      </div>
    </nav>
  );
}

function CategoryList(props: { categories: string[] }) {
  const [focus, setFocus] = createSignal(false);
  return (
    <div class={`
        ${!focus() && "opacity-0 pointer-events-none"} 
        group-hover:opacity-100 group-hover:pointer-events-auto 
        absolute left-1/2 -translate-x-1/2 z-10
        flex-col pt-4 bg-transparent rounded transition-all
        `}>
      <div class="p-2 bg-container rounded">
        {[...props.categories].map((value) =>
          <A class="whitespace-nowrap p-4 py-3 block hover:bg-hover-overlay transition-all rounded"
            href={`/category/${value}/`}
            onclick={(el) => { setFocus(false) }}
            onblur={() => setFocus(false)}
            onfocus={() => { setFocus(true) }}>
            {value}
          </A>
        )}
      </div>
    </div>
  )
}