import { Title } from "solid-start";
import PostItem from "~/components/PostItem";

export default function Home() {
  return (
    <main>
      <Title>冰轩's blog</Title>
      <ul class="flex flex-col gap-12">
        <PostItem title="test" path="testtest" category="默认分类" date="2000-01-01 00:01" content="testtesaifboadfaidbfoadbfojasdbfuasdiuvbsxiovbousdbaioudbvoiadbasdugbsos" />
        <PostItem title="test" path="testtest" category="默认分类" date="2000-01-01 00:01" content="testtesaifboadfaidbfoadbfojasdbfuasdiuvbsxiovbousdbaioudbvoiadbasdugbsos" />
        <PostItem title="test" path="testtest" category="默认分类" date="2000-01-01 00:01" content="testtesaifboadfaidbfoadbfojasdbfuasdiuvbsxiovbousdbaioudbvoiadbasdugbsos" />
        <PostItem title="test" path="testtest" category="默认分类" date="2000-01-01 00:01" content="testtesaifboadfaidbfoadbfojasdbfuasdiuvbsxiovbousdbaioudbvoiadbasdugbsos" />
      </ul>
    </main>
  );
}