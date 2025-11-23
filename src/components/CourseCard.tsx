import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, ArrowRight } from 'lucide-react';
import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Card className="shadow-card hover:shadow-elegant transition-smooth border-border h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">{course.title}</CardTitle>
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
          <Button className="w-full group">
            View Details
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
