import { z, defineCollection } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string().or(z.date()),
    tags: z.array(z.string()).default([]),
    project: z.string().optional(), // Reference to project slug
    draft: z.boolean().default(false),
  }),
});

const project = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string().or(z.date()),
    url: z.string().url().optional(),
    repo: z.string().url().optional(),
    thumbnail: z.string().optional(), // Path to thumbnail image
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  project,
};
