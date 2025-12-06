import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Shield, BookOpen, Users, ArrowRight } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import BlogCarousel from '@/components/BlogCarousel';

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
              Excellence in <span className="text-accent">Autointellects </span> Engineering Education
            </h1>
            <p className="text-xl xl:text-2xl mb-8 text-primary-foreground/90 leading-relaxed">
              Empowering students and professionals with cutting-edge knowledge in Autointellects, Functional Safety  and ISO 26262, FMEA , Automotive Cybersecurity  and ISO 21434
            </p>
            <div className="flex flex-col xl:flex-row gap-4">
              <Link to="/courses">
                <Button size="lg" className="w-full xl:w-auto text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary animate-scale-in">
                  Explore Programs
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
                  Learn from industry professionals with years of practical experience in Autointellects.
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
                  Weekend Programs designed for students and working professionals.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

     <section className="py-16 xl:py-24">
  <div className="max-w-7xl mx-auto px-4 xl:px-8">
    <div className="text-center mb-12 animate-fade-in">
      <h2 className="text-3xl xl:text-4xl font-bold mb-4 text-primary">Our Programs</h2>
      <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto">
        Specialized training programs designed for different career stages and professional needs.
      </p>
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
      {courses.slice(0, 4).map((course, index) => (
        <div key={course.id} style={{ animationDelay: `${index * 0.1}s` }}>
          <CourseCard course={course} />
        </div>
      ))}
    </div>

    <div className="text-center">
      <Link to="/courses">
        <Button size="lg" variant="outline">
          View All Programs
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
              Stay updated with the latest trends and knowledge in Autointellects.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <BlogCarousel posts={latestBlogs} autoPlayInterval={6000} />
          </div>

          <div className="text-center">
            <Link to="/blog">
              <Button size="lg" variant="outline">
                View All Blogs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

     <section className="py-16 xl:py-24 bg-gray-50">
  <div className="max-w-4xl mx-auto px-4 xl:px-8">
    <div className="text-center mb-12 animate-fade-in">
      <h2 className="text-3xl xl:text-4xl font-bold mb-4 text-primary">Why Choose Auto Intellects?</h2>
      <p className="text-lg xl:text-xl text-muted-foreground">
        Discover the core strengths that set us apart in delivering top tier automotive cybersecurity and functional safety training.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Unmatched Expertise and Comprehensive Curriculum */}
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-semibold text-primary mb-3">Unmatched Expertise and Comprehensive Curriculum</h3>
        <p className="text-muted-foreground">
          Our meticulously designed curriculum covers every essential aspect of automotive cybersecurity and functional safety. From theoretical foundations to practical applications, we explore cutting-edge topics like V2X, autonomous vehicles, and AI.
        </p>
      </div>

      {/* Strategic Industry Collaborations */}
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-semibold text-primary mb-3">Strategic Industry Collaborations</h3>
        <p className="text-muted-foreground">
          We connect deeply with industry needs through collaborations with top OEMs and cybersecurity firms. Our curriculum includes regular guest lectures, workshops, and panel discussions, offering real world insights and networking opportunities.
        </p>
      </div>

      {/* Agile Learning Methodologies */}
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-semibold text-primary mb-3">Agile Learning Methodologies</h3>
        <p className="text-muted-foreground">
          We provide modern, well-equipped training spaces with interactive and immersive learning experiences, leveraging technology-enhanced training tools for maximum engagement and practical skills development.
        </p>
      </div>

      {/* Tailored Training Programs */}
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-semibold text-primary mb-3">Tailored Training Programs</h3>
        <p className="text-muted-foreground">
          We offer customized training solutions to meet your organization’s specific needs, with flexible in person and online learning options that can be adapted for different levels and roles.
        </p>
      </div>

      {/* Continuous Professional Development */}
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-semibold text-primary mb-3">Continuous Professional Development</h3>
        <p className="text-muted-foreground">
          Our certification programs not only enhance your credibility but also address key industry skill gaps. As part of our robust alumni network, you’ll have ongoing access to mentorship and valuable industry resources.
        </p>
      </div>

      {/* Research and Knowledge Sharing */}
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-semibold text-primary mb-3">Research and Knowledge Sharing</h3>
        <p className="text-muted-foreground">
          We foster a culture of research, innovation, and knowledge sharing, contributing to industry advancements through white papers, case studies, and other valuable insights.
        </p>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;
