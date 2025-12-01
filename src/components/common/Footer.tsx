import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground border-t border-accent/20">
      <div className="max-w-7xl mx-auto py-12 px-4 xl:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-accent">Auto</span>
              <span>intelect</span>
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Empowering automotive professionals through comprehensive education in vehicle systems and functional safety standards.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-accent">Contact Information</h3>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-accent" />
                <p>Automotive Engineering Institute, 1170 15A 4th Floor City Vista
Fountain Road Kharadi Pune
Maharashtra 411014</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-accent" />
                <p>+91 94223 12280</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-accent" />
                <p>info@autointellects.com</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-accent">Training Hours</h3>
            <div className="space-y-2 text-primary-foreground/80">
              <p>Weekend Program: Saturday & Sunday</p>
              <p>Timing: 9:00 AM - 1:00 PM</p>
              <p>Corporate Training: Flexible scheduling available</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-accent/20 text-center text-primary-foreground/70">
          <p>{currentYear} Autointelect</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
