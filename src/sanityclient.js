import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Get a pre-configured url-builder from your sanity client

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:

// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: "1f128ns8",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "v1", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
export async function getCategories() {
  const category = await client.fetch(`*[_type == "category"]{
    "imageSrc": image.asset->url,
    title,
    _id
  }`);
  return category;
}
export async function getPosts(catid = null, id = null) {
  let query = `*[_type == "post"`;

  // Проверка на наличие id и catid
  if (id) {
    query += ` && _id != "${id}"`; // Если указан id, ищем пост по id
  }

  if (catid) {
    query += ` && references("${catid}")`; // Если указан catid, добавляем условие по категории
  }

  query += `] {
    _id,
    title,
    "mainImageSrc": mainImage[0].asset->url,
    description,
    price,
    per,
    categories[]-> {
        title
    }
  }`;

  const post = await client.fetch(query);

  // Если передан id, проверяем найден ли пост
  if (id && post.length === 0) {
    throw new Error(`Пост с id ${id} не найден.`);
  }

  return post;
}

export async function searchPosts(search) {
  const post = await client.fetch(
    `*[_type == "post" && title match $search + "*"] {
      _id,
      title,
      "mainImageSrc": mainImage[0].asset->url,
      description,
      price,
      per,
      categories
    }`,
    { search }
  );
  return post;
}

export async function getPost(id) {
  const post = await client.fetch(`*[_id == "${id}"][0] {
    title,
    "mainImageSrc": mainImage[].asset->url,
    description,
    price,
    per,
    categories[]-> {
        title,
        _id
    },
}
`);
  return post;
}
export async function getBanner() {
  const banner = await client.fetch(`*[_type == "banner"][0] {
    title,
    undertitle,
}
`);
  return banner;
}

export async function getFAQ() {
  const faq = await client.fetch('*[_type == "faq"]');
  return faq;
}

export async function getAboutus() {
  const query = `*[_type == "aboutus"][0]{
    "image": image.asset->url,
    title,
    text,
  }`;
  const aboutus = await client.fetch(query);
  return aboutus;
}
