import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Clock, Users, CheckCircle, ArrowLeft, IndianRupee, Sparkles } from 'lucide-react';
import { getCourseBySlug } from '@/data/courses';
import EnrollmentForm from '@/components/EnrollmentForm';

const CourseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const course = slug ? getCourseBySlug(slug) : undefined;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'INR') {
      return `₹${price.toLocaleString('en-IN')}`;
    }
    return `${currency} ${price}`;
  };

  return (
    <div className="min-h-screen">
      <div 
        className="relative bg-primary text-primary-foreground py-16 xl:py-24 overflow-hidden"
        style={{
          backgroundImage: `url(${course.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-primary/90"></div>
        <div className="max-w-7xl mx-auto px-4 xl:px-8 relative z-10">
          <Link to="/courses" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-smooth animate-slide-in-left">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Programs
          </Link>
          <div className="animate-fade-in">
            <Badge className="mb-4 bg-accent text-accent-foreground font-semibold px-4 py-2 text-lg">
              <IndianRupee className="h-5 w-5 inline mr-1" />
              {formatPrice(course.price, course.currency)}
            </Badge>
            <h1 className="text-4xl xl:text-5xl font-bold mb-6">{course.title}</h1>
            <p className="text-xl xl:text-2xl text-primary-foreground/90 mb-8 max-w-3xl">
              {course.description}
            </p>
            <div className="flex flex-col xl:flex-row gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-accent" />
                <div>
                  <div className="text-sm text-primary-foreground/70">Duration</div>
                  <div className="font-semibold">{course.duration}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-accent" />
                <div>
                  <div className="text-sm text-primary-foreground/70">Target Audience</div>
                  <div className="font-semibold">{course.targetAudience}</div>
                </div>
              </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="text-lg px-8 animate-bounce-subtle">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Enroll Now
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Enroll in {course.title}</DialogTitle>
                  <DialogDescription>
                    Fill in your details to proceed with enrollment and payment.
                  </DialogDescription>
                </DialogHeader>
                <EnrollmentForm course={course} onSuccess={() => setIsDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="py-16 xl:py-24">
        <div className="max-w-7xl mx-auto px-4 xl:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              <Card className="shadow-card border-border animate-slide-in-left">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Topics Covered</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {course.topics.map((topic, index) => (
                      <li key={index} className="flex items-start space-x-3 animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-base">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {course.learningOutcomes && (
                <Card className="shadow-card border-border animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Learning Outcomes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {course.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start space-x-3 animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                          <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-base">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-8">
              {course.eligibility && (
                <Card className="shadow-card border-border animate-slide-in-right">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Eligibility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.eligibility.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Badge variant="secondary" className="mt-0.5 bg-accent/10 text-accent">
                            ✓
                          </Badge>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {course.benefits && (
                <Card className="shadow-card border-border animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Badge variant="secondary" className="mt-0.5 bg-accent/10 text-accent">
                            ✓
                          </Badge>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card className="shadow-card border-border bg-accent/5 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Program Fee</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold text-accent">
                    {formatPrice(course.price, course.currency)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    For Professionals (Not a professional? If you're a student, contact us at info@autointelects.com for exclusive student pricing )
                  </p>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Enroll Now
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
