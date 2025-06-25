import {BLOG_TITLE, BLOG_URL} from "@/constants";
import {getBlogPostList} from "@/helpers/file-helpers";
import RSS from "rss";

export async function GET() {
  const feed = new RSS({
    feed_url: BLOG_URL + "/rss.xml",
    site_url: BLOG_URL,
    title: BLOG_TITLE
  });
  for (const post of await getBlogPostList()) {
    feed.item({
      title: post.title,
      description: post.abstract,
      url: BLOG_URL + "/" + post.slug,
    });
  }
  return new Response(feed.xml(), {
    headers: {"Content-Type": "application/xml"}
  });
}