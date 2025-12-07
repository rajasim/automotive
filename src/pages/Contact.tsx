import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-primary text-primary-foreground py-16 xl:py-24">
        <div className="max-w-7xl mx-auto px-4 xl:px-8 text-center">
          <h1 className="text-4xl xl:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl xl:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            Have questions about our courses or want to enroll? We're here to help you take the next step in your automotive engineering journey.
          </p>
        </div>
      </div>

      <div className="py-16 xl:py-24">
        <div className="max-w-7xl mx-auto px-4 xl:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-primary">Contact Information</h2>
              
              <div className="space-y-6 mb-12">
                <Card className="shadow-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-accent/10 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1 text-primary">Address</h3>
                        <p className="text-muted-foreground">
                          Automotive Engineering Institute, 1170 15A 4th Floor City Vista<br></br> Fountain Road Kharadi Pune Maharashtra 411014
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-accent/10 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1 text-primary">Phone</h3>
                        <p className="text-muted-foreground">+918888899999</p>
                        <p className="text-sm text-muted-foreground mt-1">Mon-Fri: 9:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-accent/10 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1 text-primary">Email</h3>
                        <a href="mailto:info@autointelect.com" className="text-muted-foreground">info@autointelect.com</a>

                        <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-accent/10 p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1 text-primary">Training Schedule</h3>
                        <p className="text-muted-foreground">
                          Weekend Courses: Saturday & Sunday<br />
                          Timing: 9:00 AM - 1:00 PM<br />
                          Corporate Training: Flexible scheduling
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card className="shadow-elegant border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
