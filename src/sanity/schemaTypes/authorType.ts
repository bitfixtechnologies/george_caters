import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Author Role / Title",
      type: "string",
      description: "e.g. Executive Culinary Director",
    }),
    defineField({
      name: "avatar",
      title: "Author Avatar Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "Short Bio",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "avatar",
    },
  },
});
