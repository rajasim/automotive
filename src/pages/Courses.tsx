import React from 'react';
import CourseCard from '@/components/CourseCard';
import { courses } from '@/data/courses';

const Courses: React.FC = () => {
  return (
    <div className="min-h-screen py-16 xl:py-24">
      <div className="max-w-7xl mx-auto px-4 xl:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl xl:text-5xl font-bold mb-6 text-primary">Our Courses</h1>
          <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive training programs designed to equip you with the knowledge and skills needed to excel in the automotive industry.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
