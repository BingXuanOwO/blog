import { createEffect, createSignal } from "solid-js";
import { Title, useParams } from "solid-start";
import PostItem from "~/components/PostItem";

export default function Category() {
  const params = useParams()
  
  return (
    <main>
      <Title>{decodeURI(params.name)}下的文章 - 冰轩's blog</Title>
      <h1 class="text-6xl font-medium pb-8">
        <span class="text-main">{decodeURI(params.name)}</span>下的文章
      </h1>
      <ul class="flex flex-col gap-8">
        <PostItem title="test" path="testtest" date="2000-01-01 00:01" content="testtesaifboadfaidbfoadbfojasdbfuasdiuvbsxiovbousdbaioudbvoiadbasdugbsos" />
        <PostItem title="test" path="testtest" date="2000-01-01 00:01" content="testtesaifboadfaidbfoadbfojasdbfuasdiuvbsxiovbousdbaioudbvoiadbasdugbsos" />
        <PostItem title="test" path="testtest" date="2000-01-01 00:01" content="testtesaifboadfaidbfoadbfojasdbfuasdiuvbsxiovbousdbaioudbvoiadbasdugbsos" />
        <PostItem title="test" path="testtest" date="2000-01-01 00:01" content="testtesaifboadfaidbfoadbfojasdbfuasdiuvbsxiovbousdbaioudbvoiadbasdugbsos" />
        <PostItem title="test" path="testtest" date="2000-01-01 00:01" content="testtesaifboadfaidbfoadbfojasdbfuasdiuvbsxiovbousdbaioudbvoiadbasdugbsos" />
        <PostItem title="test" path="testtest" date="2000-01-01 00:01" content="testtesaifboadfaidbfoadbfojasdbfuasdiuvbsxiovbousdbaioudbvoiadbasdugbsos" />
      </ul>
    </main>
  )
}