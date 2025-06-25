import React from 'react';

import BlogHero from '@/components/BlogHero';
import {loadBlogPost} from "@/helpers/file-helpers";

import styles from './postSlug.module.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import {BLOG_TITLE} from '@/constants';
import CodeSnippet from '@/components/CodeSnippet';
import DivisionGroupsDemo from '@/components/DivisionGroupsDemo';
import CircularColorsDemo from '@/components/CircularColorsDemo';
import {notFound} from 'next/navigation';

export async function generateMetadata({ params }) {
  const {postSlug} = await params;
  const post = await loadBlogPost(postSlug);
  return {
    title: `${post.frontmatter.title} | ${BLOG_TITLE}`,
    description: post.frontmatter.abstract
  };
}

async function BlogPost({ params }) {
  const {postSlug} = await params;
  try {
    const post = await loadBlogPost(postSlug);
    return (
      <article className={styles.wrapper}>
        <BlogHero
          title={post.frontmatter.title}
          publishedOn={post.frontmatter.publishedOn}
        />
        <div className={styles.page}>
          <MDXRemote source={post.content} components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo
          }} />
        </div>
      </article>
    );
  } catch (e) {
    if (`${e}`.includes("ENOENT")) notFound();
    else throw e;
  }
}

export default BlogPost;
