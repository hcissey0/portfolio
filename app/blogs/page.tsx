import Link from "next/link";
import React from "react";
import { allBlogs } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { BlogArticle } from "./blog-article";



export const revalidate = 60;
export default async function BlogsPage() {

    const featured = allBlogs.find((blog) => blog.slug === "ghanaian-politics")!;
    const top2 = allBlogs.find((blog) => blog.slug === "planetfall")!;
    const top3 = allBlogs.find((blog) => blog.slug === "highstorm")!;
    const sorted = allBlogs
        .filter((p) => p.published)
        .filter(
            (blog) =>
                blog.slug !== featured?.slug &&
                blog.slug !== top2?.slug &&
                blog.slug !== top3?.slug,
        )
        .sort(
            (a, b) =>
                new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
                new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
        );

    return (
        <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 ">
            <div className="relative pb-16">
                <Navigation />
                <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
                    <div className="max-w-2xl mx-auto lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                            Blogs
                        </h2>
                        <p className="mt-4 text-zinc-400">
                            Some of the blogs I've written.
                        </p>
                    </div>
                    <div className="w-full h-px bg-zinc-800" />

                    <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
                        {featured && 
                        <Card>
                            <Link href={`/blogs/${featured.slug}`}>
                                <article className="relative w-full h-full p-4 md:p-8">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-xs text-zinc-100">
                                            {featured.date ? (
                                                <time dateTime={new Date(featured.date).toISOString()}>
                                                    {Intl.DateTimeFormat(undefined, {
                                                        dateStyle: "medium",
                                                    }).format(new Date(featured.date))}
                                                </time>
                                            ) : (
                                                <span>SOON</span>
                                            )}
                                        </div>
                                    </div>

                                    <h2
                                        id="featured-post"
                                        className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                                    >
                                        {featured.title}
                                    </h2>
                                    <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                                        {featured.description}
                                    </p>
                                </article>
                            </Link>
                        </Card>
                        }

                        {top2 && top3 && 
                        <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
                            {[top2, top3].map((blog) => (
                                <Card key={blog.slug}>
                                    <BlogArticle blog={blog} />
                                </Card>
                            ))}
                        </div>
                        }

                    </div>
                    <div className="hidden w-full h-px md:block bg-zinc-800" />

                    <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
                        <div className="grid grid-cols-1 gap-4">
                            {sorted
                                .filter((_, i) => i % 3 === 0)
                                .map((blog) => (
                                    <Card key={blog.slug}>
                                        <BlogArticle blog={blog} />
                                    </Card>
                                ))}
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {sorted
                                .filter((_, i) => i % 3 === 1)
                                .map((blog) => (
                                    <Card key={blog.slug}>
                                        <BlogArticle blog={blog} />
                                    </Card>
                                ))}
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {sorted
                                .filter((_, i) => i % 3 === 2)
                                .map((blog) => (
                                    <Card key={blog.slug}>
                                        <BlogArticle blog={blog} />
                                    </Card>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
