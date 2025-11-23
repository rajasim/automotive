import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Card className="shadow-card hover:shadow-elegant transition-smooth border-border h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
            {post.category}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            {post.readTime}
          </div>
        </div>
        <CardTitle className="text-2xl text-primary hover:text-accent transition-smooth">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
        <CardDescription className="text-base">{post.excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2 text-accent" />
          <span>{formatDate(post.date)}</span>
          <span className="mx-2">•</span>
          <span>{post.author}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/blog/${post.slug}`} className="w-full">
          <Button variant="outline" className="w-full group">
            Read More
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
