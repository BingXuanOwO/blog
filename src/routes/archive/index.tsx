import { A, cache, createAsync } from "@solidjs/router";
import { HeadingTitle } from "~/components/HeadingTitle";
import { getPosts } from "~/data/post";

const getPostsDates = cache(async () => {
  "use server";

  const posts = await getPosts();
  const years = new Set(posts.map((post) => new Date(post.date).getFullYear()));

  const result = new Map<number, Set<number>>();

  years.forEach((value) => {
    result.set(
      value,
      new Set(
        posts
          .filter((e) => new Date(e.date).getFullYear() == value)
          .map((e) => new Date(e.date).getMonth() + 1)
      )
    );
  });

  return [...result.entries()].map((it) => {
    return { year: it[0], availableMonths: [...it[1]] };
  });
}, "archive_post_dates");

export default function Archive() {
  const dates = createAsync(getPostsDates);

  return (
    <main class="gap-8 flex flex-col">
      <HeadingTitle title="归档" />
      <div
        class="flex flex-wrap justify-between gap-12
        max-sm:flex-col"
      >
        {dates()?.map((element) => (
          <WTFElement
            year={element.year}
            availableMonths={element.availableMonths}
          />
        ))}
      </div>
    </main>
  );
}

function WTFElement(props: { year: number; availableMonths: number[] }) {
  return (
    <div class="flex flex-col gap-6 w-max max-sm:w-full">
      <h2>{props.year}</h2>
      <div
        class="grid grid-cols-4 gap-3 w-max
        max-sm:w-full max-sm:gap-6"
      >
        {[...Array(12).keys()].map((month) => {
          const active = new Set(props.availableMonths).has(month + 1);
          return active ? (
            <A href={`/archive/${props.year}/${month + 1}`}>
              <h3
                class="w-10 cursor-pointer text-center 
              max-sm:w-full max-sm:leading-loose"
              >
                {month + 1}
              </h3>
            </A>
          ) : (
            <h3
              class="w-10 text-center opacity-60 
              cursor-not-allowed font-extralight
              max-sm:leading-loose max-sm:w-full"
            >
              {month + 1}
            </h3>
          );
        })}
      </div>
    </div>
  );
}
