import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Shield, BookOpen, Users, ArrowRight } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import BlogCard from '@/components/BlogCard';
import ContactForm from '@/components/ContactForm';
import { courses } from '@/data/courses';
import { blogPosts } from '@/data/blogs';

const Home: React.FC = () => {
  const latestBlogs = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen">
      <section 
        className="relative bg-primary text-primary-foreground py-20 xl:py-32 overflow-hidden"
        style={{
          backgroundImage: 'url(https://miaoda-site-img.s3cdn.medo.dev/images/bad90c66-c7e0-4685-b18a-396058d59a24.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-primary/90"></div>
        <div className="max-w-7xl mx-auto px-4 xl:px-8 relative z-10">
          <div className="max-w-3xl animate-slide-in-left">
            <h1 className="text-4xl xl:text-6xl font-bold mb-6 leading-tight">
              Excellence in <span className="text-accent">Automotive</span> Engineering Education
            </h1>
            <p className="text-xl xl:text-2xl mb-8 text-primary-foreground/90 leading-relaxed">
              Empowering students and professionals with cutting-edge knowledge in vehicle systems and ISO 26262 functional safety standards.
            </p>
            <div className="flex flex-col xl:flex-row gap-4">
              <Link to="/courses">
                <Button size="lg" className="w-full xl:w-auto text-lg px-8 animate-scale-in">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full xl:w-auto text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary animate-scale-in">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 xl:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl xl:text-4xl font-bold mb-4 text-primary">Our Vision</h2>
            <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto">
              To be the leading institute in automotive engineering education, bridging the gap between academic knowledge and industry requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <Card className="shadow-card border-border hover:shadow-elegant transition-smooth animate-slide-up">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-xl">Expert Training</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Learn from industry professionals with years of practical experience in automotive engineering.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border hover:shadow-elegant transition-smooth animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <Shield className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-xl">Safety Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Comprehensive training in ISO 26262 functional safety for automotive systems.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border hover:shadow-elegant transition-smooth animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-xl">Practical Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Hands-on learning approach with real-world case studies and applications.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border hover:shadow-elegant transition-smooth animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <Users className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-xl">Flexible Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Weekend courses designed for students and working professionals.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24">
        <div className="max-w-7xl mx-auto px-4 xl:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl xl:text-4xl font-bold mb-4 text-primary">Our Courses</h2>
            <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto">
              Specialized training programs designed for different career stages and professional needs.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            {courses.map((course, index) => (
              <div key={course.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/courses">
              <Button size="lg" variant="outline">
                View All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 xl:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl xl:text-4xl font-bold mb-4 text-primary">Latest Insights</h2>
            <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest trends and knowledge in automotive engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {latestBlogs.map((post, index) => (
              <div key={post.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/blog">
              <Button size="lg" variant="outline">
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24">
        <div className="max-w-4xl mx-auto px-4 xl:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl xl:text-4xl font-bold mb-4 text-primary">Get in Touch</h2>
            <p className="text-lg xl:text-xl text-muted-foreground">
              Have questions about our courses? We're here to help you get started.
            </p>
          </div>

          <Card className="shadow-elegant border-border animate-scale-in">
            <CardContent className="p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
