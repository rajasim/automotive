import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";  // Import Link here
import { Menu, X } from "lucide-react";
import routes from "@/routes";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = routes.filter((route) => route.visible !== false);

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-elegant">
      <nav className="max-w-7xl mx-auto px-4 xl:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            {/* Logo */}
            <img 
              src="/Screenshot 2025-12-03 205054.png" 
              alt="Auto Intelect Logo" 
              className="h-12 w-auto" 
            />
          </Link>

          <div className="hidden xl:flex items-center space-x-1">
            {/* Map over navigation routes */}
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-base font-medium rounded-md transition-smooth ${
                  location.pathname === item.path
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-primary/80"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="xl:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-base font-medium rounded-md transition-smooth ${
                    location.pathname === item.path
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-primary/80"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
