import { defineField, defineType } from "sanity";

export const skill = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Production", value: "Production" },
          { title: "Editing", value: "Editing" },
          { title: "Strategy", value: "Strategy" },
          { title: "Design", value: "Design" },
          { title: "Other", value: "Other" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      category: "category",
    },
    prepare({ title, category }) {
      return {
        title,
        subtitle: category,
      };
    },
  },
});
