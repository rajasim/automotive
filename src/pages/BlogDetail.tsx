import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { getBlogBySlug, blogPosts } from '@/data/blogs';
import BlogCard from '@/components/BlogCard';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <div className="bg-primary text-primary-foreground py-16 xl:py-20">
        <div className="max-w-4xl mx-auto px-4 xl:px-8">
          <Link to="/blog" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-smooth">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
          <Badge variant="secondary" className="mb-4 bg-accent/20 text-accent hover:bg-accent/30">
            {post.category}
          </Badge>
          <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 xl:gap-6 text-primary-foreground/80">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 xl:py-24">
        <div className="max-w-4xl mx-auto px-4 xl:px-8">
          <Card className="shadow-elegant border-border mb-16">
            <CardContent className="p-8 xl:p-12">
              <div className="prose prose-lg max-w-none">
                {post.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h1 key={index} className="text-3xl xl:text-4xl font-bold mb-6 text-primary">
                        {paragraph.replace('# ', '')}
                      </h1>
                    );
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl xl:text-3xl font-bold mt-8 mb-4 text-primary">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl xl:text-2xl font-semibold mt-6 mb-3 text-primary">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.trim().startsWith('- ')) {
                    return (
                      <li key={index} className="ml-6 mb-2 text-foreground">
                        {paragraph.replace('- ', '')}
                      </li>
                    );
                  }
                  if (paragraph.trim().match(/^\d+\. /)) {
                    return (
                      <li key={index} className="ml-6 mb-2 text-foreground list-decimal">
                        {paragraph.replace(/^\d+\. /, '')}
                      </li>
                    );
                  }
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <p key={index} className="font-semibold mb-3 text-foreground">
                        {paragraph.replace(/\*\*/g, '')}
                      </p>
                    );
                  }
                  if (paragraph.trim() === '') {
                    return <br key={index} />;
                  }
                  return (
                    <p key={index} className="mb-4 text-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-8 text-primary">Related Articles</h2>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/blog">
              <Button size="lg" variant="outline">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
