import { Title } from "solid-start";
import PostItem from "~/components/PostItem";

export default function Archive() {
  return (
    <main class="gap-8 flex flex-col">
      <Title>归档 - 冰轩's blog</Title>
      <h1 class="text-6xl text-main font-medium">
        归档
      </h1>
      <div class="flex flex-col gap-8">
        <h2 class="text-4xl font-medium">2023.10</h2>
        <ul class="flex flex-col gap-8 pl-6">
          <PostItem title="test" path="testtest" category="默认分类" date="2000-01-01 00:01" content="testtesaifboadfaidbfoadbfojasdbfuasdiuvbsxiovbousdbaioudbvoiadbasdugbsos" />
          <PostItem title="test" path="testtest" category="默认分类" date="2000-01-01 00:01" content="testtesaifboadfaidbfoadbfojasdbfuasdiuvbsxiovbousdbaioudbvoiadbasdugbsos" />
          <PostItem title="test" path="testtest" category="默认分类" date="2000-01-01 00:01" content="testtesaifboadfaidbfoadbfojasdbfuasdiuvbsxiovbousdbaioudbvoiadbasdugbsos" />
          <PostItem title="test" path="testtest" category="默认分类" date="2000-01-01 00:01" content="testtesaifboadfaidbfoadbfojasdbfuasdiuvbsxiovbousdbaioudbvoiadbasdugbsos" />
          <PostItem title="test" path="testtest" category="默认分类" date="2000-01-01 00:01" content="testtesaifboadfaidbfoadbfojasdbfuasdiuvbsxiovbousdbaioudbvoiadbasdugbsos" />
          <PostItem title="test" path="testtest" category="默认分类" date="2000-01-01 00:01" content="testtesaifboadfaidbfoadbfojasdbfuasdiuvbsxiovbousdbaioudbvoiadbasdugbsos" />
        </ul>
      </div>
    </main>
  );
}
