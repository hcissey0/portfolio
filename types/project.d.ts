declare module "@/types/project" {
    export type Project = {
        url?: string;
        title: string;
        description: string;
        repository?: string;
        views: number;
        slug: string;
        date?: string;
        published?: boolean;
    };
}