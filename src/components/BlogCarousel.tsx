import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import type { BlogPost } from '@/types';

interface BlogCarouselProps {
  posts: BlogPost[];
  autoPlayInterval?: number;
}

const BlogCarousel: React.FC<BlogCarouselProps> = ({ posts, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, autoPlayInterval]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <div 
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {posts.map((post) => (
            <div
              key={post.id}
              className="w-full flex-shrink-0 px-2"
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>

     <Button
  variant="outline"
  size="icon"
  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background shadow-lg z-10 flex items-center justify-center" 
  onClick={prevSlide}
  aria-label="Previous slide"
>
  <ChevronLeft className="h-6 w-6 text-foreground" />
</Button>

<Button
  variant="outline"
  size="icon"
  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background shadow-lg z-10 flex items-center justify-center"
  onClick={nextSlide}
  aria-label="Next slide"
>
  <ChevronRight className="h-6 w-6 text-foreground" />
</Button>

      <div className="flex justify-center gap-2 mt-6">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-accent'
                : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogCarousel;
