import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { readJsonFile } from '../../../util/fileOperations';
import path from 'path';
import fs from 'fs';

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const dataDir = path.join(process.cwd(), 'data');

export async function generateStaticParams(): Promise<Props["params"][]> {
  const filePath = path.join(dataDir, 'projects.json');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const projects = JSON.parse(fileContents);
  return projects
    .filter((p: any) => p.published)
    .map((p: any) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const filePath = path.join(dataDir, 'projects.json');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const projects = JSON.parse(fileContents);
  const project = projects.find((p: any) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const pageviewsFilePath = path.join(dataDir, `pageviews_projects_${params.slug}.json`);
  let views = 0;
  try {
    views = (await readJsonFile<number>(pageviewsFilePath)) ?? 0;
  } catch (error) {
    console.warn(`Pageviews file not found for slug: ${params.slug}`);
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} views={views} />
      <Mdx code={project.body.code} />
      <ReportView slug={project.slug} />
    </div>
  );
}
