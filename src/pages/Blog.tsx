import React from 'react';
import BlogCard from '@/components/BlogCard';
import { blogPosts } from '@/data/blogs';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen py-16 xl:py-24">
      <div className="max-w-7xl mx-auto px-4 xl:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl xl:text-5xl font-bold mb-6 text-primary">Blog & Insights</h1>
          <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore the latest trends, insights, and knowledge in automotive engineering and functional safety.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
