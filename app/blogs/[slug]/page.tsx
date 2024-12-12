import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { BlogHeader } from "./blog-header";
import "./mdx.css";

export const revalidate = 60;

type Props = {
    params: {
        slug: string;
    };
};


export async function generateStaticParams(): Promise<Props["params"][]> {
    return allBlogs
        .filter((p) => p.published)
        .map((p) => ({
            slug: p.slug,
        }));
}

export default async function PostPage({ params }: Props) {
    const slug = params?.slug;
    const blog = allBlogs.find((blog) => blog.slug === slug);

    if (!blog) {
        notFound();
    }

    return (
        <div className="bg-zinc-50 min-h-screen">
            <BlogHeader blog={blog} />

            <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
                <Mdx code={blog.body.code} />
            </article>
        </div>
    );
}
