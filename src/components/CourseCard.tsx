import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ArrowRight, IndianRupee } from 'lucide-react';
import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const formatPrice = (price: number, currency: string) => {
    if (currency === 'INR') {
      return `₹${price.toLocaleString('en-IN')}`;
    }
    return `${currency} ${price}`;
  };

  return (
    <Card className="shadow-card hover:shadow-elegant transition-smooth border-border h-full flex flex-col overflow-hidden group animate-fade-in">
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-accent text-accent-foreground font-semibold px-3 py-1 text-base">
            <IndianRupee className="h-4 w-4 inline mr-1" />
            {formatPrice(course.price, course.currency)}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-2xl text-primary group-hover:text-accent transition-smooth">
          {course.title}
        </CardTitle>
        <CardDescription className="text-base">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Clock className="h-5 w-5 text-accent" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Users className="h-5 w-5 text-accent" />
          <span>For {course.targetAudience}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/courses/${course.slug}`} className="w-full">
          <Button className="w-full group/btn">
            View Details
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-smooth" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
