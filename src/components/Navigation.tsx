import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Utensils, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isLanding = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/meal-planner", label: "Meal Planner" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav
      className={
        isLanding
          ? `fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-500 ease-in-out ${
              isScrolled
                ? "backdrop-blur-xl bg-white/10 dark:bg-black/20 border-b border-white/20 dark:border-white/10 shadow-2xl shadow-black/20"
                : "bg-transparent border-b border-transparent"
            }`
          : `relative w-full z-[100] bg-white border-b border-black/10`
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              isLanding
                ? (isScrolled ? 'bg-black/5' : 'bg-white/10')
                : 'bg-black/5'
            }`}>
              <Utensils className={`h-6 w-6 ${isLanding ? (isScrolled ? 'text-gray-900' : 'text-white') : 'text-gray-900'}`} />
            </div>
            <span className={`${isLanding ? (isScrolled ? 'text-gray-900' : 'text-white') : 'text-gray-900'}`}>
              NutriPlan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isLanding
                    ? (isScrolled
                        ? (isActive(item.href)
                            ? 'text-gray-900 bg-black/5'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-black/5')
                        : (isActive(item.href)
                            ? 'text-white bg-white/10'
                            : 'text-white/80 hover:text-white hover:bg-white/10'))
                    : (isActive(item.href)
                        ? 'text-gray-900 bg-black/5'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-black/5')
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`flex items-center space-x-2 ${isLanding ? (isScrolled ? 'text-gray-900 hover:bg-black/5' : 'text-white hover:bg-white/10') : 'text-gray-900 hover:bg-black/5'}`}
                    >
                      <User className="h-4 w-4" />
                      <span>{user.user_metadata?.name || user.email?.split('@')[0]}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()} className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${isLanding ? (isScrolled ? 'border-black/20 text-gray-900 hover:bg-black/5' : 'border-white/30 text-gray-900 hover:text-white hover:bg-white/10') : 'border-black/20 text-gray-900 hover:bg-black/5'}`}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className={`${isLanding ? (isScrolled ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-white text-primary hover:bg-white/90') : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`${isLanding ? (isScrolled ? 'text-gray-900 hover:bg-black/5' : 'text-white hover:bg-white/10') : 'text-gray-900 hover:bg-black/5'}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 ${isLanding ? (isScrolled ? 'bg-white/60 backdrop-blur-md border-t border-black/10' : 'bg-white/10 border-t border-white/20') : 'bg-white/80 backdrop-blur-md border-t border-black/10'}`}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isLanding
                      ? (isScrolled
                          ? (isActive(item.href)
                              ? 'text-gray-900 bg-black/5'
                              : 'text-gray-700 hover:text-gray-900 hover:bg-black/5')
                          : (isActive(item.href)
                              ? 'text-white bg-white/10'
                              : 'text-white/80 hover:text-white hover:bg-white/10'))
                      : (isActive(item.href)
                          ? 'text-gray-900 bg-black/5'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-black/5')
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className={`pt-4 pb-2 mt-4 space-y-2 ${isLanding ? (isScrolled ? 'border-t border-black/10' : 'border-t border-white/20') : 'border-t border-black/10'}`}>
                {user ? (
                  <>
                    <div className={`px-3 py-2 text-sm ${isLanding ? (isScrolled ? 'text-gray-600' : 'text-white/70') : 'text-gray-600'}`}>
                      Signed in as {user.user_metadata?.name || user.email?.split('@')[0]}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`w-full ${isLanding ? (isScrolled ? 'border-black/20 text-gray-900 hover:bg-black/5' : 'border-white/30 text-white hover:bg-white/10') : 'border-black/20 text-gray-900 hover:bg-black/5'}`} 
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className={`w-full ${isLanding ? (isScrolled ? 'border-black/20 text-gray-900 hover:bg-black/5' : 'border-white/30 text-gray-900 hover:text-white hover:bg-white/10') : 'border-black/20 text-gray-900 hover:bg-black/5'}`}>
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      <Button size="sm" className={`w-full ${isLanding ? (isScrolled ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-white text-primary hover:bg-white/90') : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;