import { notFound } from "next/navigation";
import { allDesigns } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { DesignHeader } from "./design-header";
import "./mdx.css";

export const revalidate = 60;

type Props = {
    params: {
        slug: string;
    };
};


export async function generateStaticParams(): Promise<Props["params"][]> {
    return allDesigns
        .filter((p) => p.published)
        .map((p) => ({
            slug: p.slug,
        }));
}

export default async function PostPage({ params }: Props) {
    const slug = params?.slug;
    const design = allDesigns.find((design) => design.slug === slug);

    if (!design) {
        notFound();
    }

    return (
        <div className="bg-zinc-50 min-h-screen">
            <DesignHeader design={design} />

            <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
                <Mdx code={design.body.code} />
            </article>
        </div>
    );
}
