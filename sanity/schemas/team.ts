import { defineField, defineType } from "sanity";

export const team = defineType({
  name: "team",
  title: "Team",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
        { title: "Founder", value: "Founder" },
        { title: "Co-Founder", value: "Co-Founder" },
        { title: "Sales Manager", value: "Sales Manager" },
          { title: "Video Editor", value: "Video Editor" },
            { title: "Graphic Designer", value: "Graphic Designer" },
            { title: "Social Media Manager", value: "Social Media Manager" },
        ],
      },
    }),
    defineField({
      name: "profileImage",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "LinkedIn",
      title: "LinkedIn",
      type: "url",
    }),
  
  ],
  preview: {
    select: {
      title: "fullName",
      role: "role",
    },
    prepare({ title, role }) {
      return {
        title,
        subtitle: role,
      };
    },
  },
});
