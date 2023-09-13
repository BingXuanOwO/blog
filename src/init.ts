import { setCategories } from "./store/categories";
import { postList, setPostList } from "./store/postList";

export function init() {
    setPostList([
        {
            title: "test1",
            date: new Date(1672506061000),
            category: "default",
            slug: "test1"
        },
        {
            title: "test2",
            date: new Date(1682506061000),
            category: "default",
            slug: "test2"
        },
        {
            title: "test3",
            date: new Date(1692506061000),
            category: "default",
            slug: "test3"
        },
        {
            title: "test4",
            date: new Date(1683506061000),
            category: "default",
            slug: "test4"
        },
        {
            title: "test5",
            date: new Date(1684506061000),
            category: "default",
            slug: "test5"
        },
        {
            title: "test6",
            date: new Date(1685506061000),
            category: "default",
            slug: "test6"
        },
        {
            title: "test7",
            date: new Date(1686506061000),
            category: "default",
            slug: "test7"
        },
        {
            title: "test8",
            date: new Date(1687506061000),
            category: "default",
            slug: "test8"
        },
        {
            title: "test9",
            date: new Date(1688506061000),
            category: "default",
            slug: "test9"
        },
        {
            title: "test10",
            date: new Date(1689506061000),
            category: "default",
            slug: "test10"
        },
        {
            title: "test11",
            date: new Date(1682566061000),
            category: "default",
            slug: "test11"
        },
        {
            title: "test12",
            date: new Date(1682576061000),
            category: "测试",
            slug: "test12"
        },
        {
            title: "test13",
            date: new Date(1682596061000),
            category: "default",
            slug: "test13"
        }
    ].sort((a, b) => b.date.getTime() - a.date.getTime()))

    setCategories(
        new Set(postList().map(e => e.category))
    )
}