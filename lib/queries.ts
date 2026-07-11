const projectFields = `
  _id,
  _type,
  title,
  slug,
  description,
  techStack,
  liveUrl,
  githubUrl,
  image,
  video{
    asset->{
      _id,
      url,
      mimeType,
      originalFilename
    }
  },
  videoUrl,
  featured,
  order
`;

export const projectsQuery = `*[_type == "project"] | order(order asc, title asc) {
  ${projectFields}
}`;

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(order asc, title asc) {
  ${projectFields}
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  ${projectFields}
}`;

export const blogsQuery = `*[_type == "blog"] | order(publishedAt desc) {
  _id,
  _type,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  tags
}`;

export const blogBySlugQuery = `*[_type == "blog" && slug.current == $slug][0] {
  _id,
  _type,
  title,
  slug,
  excerpt,
  body,
  coverImage,
  publishedAt,
  tags
}`;

export const skillsQuery = `*[_type == "skill"] | order(category asc, name asc) {
  _id,
  _type,
  name,
  category
}`;

export const teamQuery = `*[_type == "team"] {
  _id,
  _type,
  fullName,
  role,
  profileImage,
  "linkedIn": LinkedIn
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  _id,
  _type,
  heroTitle,
  heroSubtitle,
  bio,
  resumeUrl,
  socialLinks
}`;
