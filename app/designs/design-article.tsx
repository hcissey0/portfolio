import type { Design } from "@/.contentlayer/generated";
import Link from "next/link";


type Props = {
    design: Design;
};

export const DesignArticle: React.FC<Props> = ({ design }) => {
    return (
        <Link href={`/designs/${design.slug}`}>
            <article className="p-4 md:p-8">
                <div className="flex justify-between gap-2 items-center">
                    <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
                        {design.date ? (
                            <time dateTime={new Date(design.date).toISOString()}>
                                {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                                    new Date(design.date),
                                )}
                            </time>
                        ) : (
                            <span>SOON</span>
                        )}
                    </span>
                </div>
                <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
                    {design.title}
                </h2>
                <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
                    {design.description}
                </p>
            </article>
        </Link>
    );
};
