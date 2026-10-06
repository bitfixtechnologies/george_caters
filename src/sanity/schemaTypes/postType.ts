import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug (URL identifier)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle / Deck",
      type: "string",
    }),

    defineField({
      name: "excerpt",
      title: "Short Excerpt (For Card Summaries)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Wedding Catering", value: "Wedding Catering" },
          { title: "Corporate Events", value: "Corporate Events" },
          { title: "Culinary Secrets", value: "Culinary Secrets" },
          { title: "Party Planning", value: "Party Planning" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "featured",
      title: "Featured Article",
      type: "boolean",
      description:
        "Check if this article should be highlighted as the main hero article.",
      initialValue: false,
    }),

    defineField({
      name: "mainImage",
      title: "Main Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: "e.g. 5 min read",
      initialValue: "5 min read",
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),

    // =========================================
    // SEO SETTINGS
    // =========================================
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      description: "SEO settings for this blog post.",

      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description:
            "Title shown in Google search results and browser page title. Recommended: 50–60 characters.",
          validation: (Rule) => Rule.max(60),
        }),

        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          description:
            "Description shown in Google search results. Recommended: 140–160 characters.",
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),

    defineField({
      name: "content",
      title: "Article Content (Rich Text)",
      type: "blockContent",
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      category: "category",
    },

    prepare(selection) {
      const { author, category } = selection;

      return {
        ...selection,
        subtitle: `${category || "Uncategorized"} | By ${
          author || "Anonymous"
        }`,
      };
    },
  },
});