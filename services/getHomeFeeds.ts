import postsData from "@/data/home/main-content-data.json";

export async function getHomeFeeds() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return postsData;
}

export type PostsData = typeof postsData;
export type Post = (typeof postsData.posts)[0];
export type User = typeof postsData.user;
