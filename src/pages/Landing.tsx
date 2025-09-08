import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  ChefHat,
  Target,
  BarChart3,
  Utensils,
  Sparkles,
  Heart,
} from "lucide-react";
import Iridescence from "@/components/Iridescence";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Landing = () => {
  const features = [
    {
      icon: ChefHat,
      title: "Personalized Meal Plans",
      description:
        "AI-powered meal planning based on your dietary preferences, goals, and restrictions.",
    },
    {
      icon: Utensils,
      title: "Recipe Discovery",
      description:
        "Explore thousands of healthy recipes with detailed nutritional information.",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description:
        "Monitor your nutrition goals with comprehensive analytics and insights.",
    },
    {
      icon: Target,
      title: "Goal Achievement",
      description:
        "Set and achieve your health goals with personalized recommendations.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      content:
        "NutriPlan revolutionized my meal planning. I've never felt healthier!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Busy Professional",
      content:
        "Finally, a meal planner that fits my hectic schedule. Love the convenience!",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Health Coach",
      content:
        "I recommend NutriPlan to all my clients. The results speak for themselves.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
    nodes.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 8) * 80}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex flex-col">
        {/* Iridescent WebGL Background */}
        <div className="absolute inset-0">
          <Iridescence
            color={[0.2, 0.8, 0.4]}
            speed={0.15}
            amplitude={0.02}
            mouseReact={true}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-8 pt-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="overflow-hidden mb-8">
              <div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm animate-slide-up"
                style={{ animationDelay: "0.2s", animationFillMode: "both" }}
              >
                <Sparkles className="w-4 h-4" />
                AI-Powered Nutrition
              </div>
            </div>

            {/* Main Heading */}
            <div className="overflow-hidden mb-8">
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight animate-slide-up"
                style={{ animationDelay: "0.4s", animationFillMode: "both" }}
              >
                Smart nutrition with
                <br />
                <span className="bg-gradient-to-r from-white/90 via-white to-white/90 bg-clip-text text-transparent">
                  personalized plans
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden mb-12">
              <p
                className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-slide-up"
                style={{ animationDelay: "0.6s", animationFillMode: "both" }}
              >
                Transform your health with AI-powered meal planning, recipe
                discovery, and progress tracking.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="overflow-hidden">
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
                style={{ animationDelay: "0.8s", animationFillMode: "both" }}
              >
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-full min-w-[180px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link to="/recipes">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full min-w-[180px] backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  >
                    Browse Recipes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Feature → CTA → Footer Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
        {/* Animated Background Elements (mirrors CTA styling) */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-6 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-16 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: "0.8s" }} />
          <div className="absolute bottom-8 left-1/4 w-40 h-40 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: "1.6s" }} />
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: "2.2s" }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 reveal" data-reveal>
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm shadow-sm">
              <Sparkles className="w-4 h-4" />
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Everything You Need for Healthy Living
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to
              achieve your nutrition goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                data-reveal
                className="shadow-card hover:shadow-glow transition-all duration-500 bg-teal-900/50 backdrop-blur-sm border border-teal-700/30 group hover:-translate-y-2 relative overflow-hidden reveal"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: "fade-in 0.6s ease-out forwards",
                }}
              >
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <CardHeader className="text-center relative z-10">
                  <div className="mx-auto bg-gradient-primary p-3 rounded-xl mb-4 w-fit group-hover:scale-110 transition-transform duration-300 shadow-glow">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-center text-white/70 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - now merged into Features gradient for continuity */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-6 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10" data-reveal>
          <div className="animate-fade-in reveal -from-top">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Start Your Transformation
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join NutriPlan today and start your journey to a healthier,
              happier you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button
                  variant="hero"
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 hover-scale shadow-glow min-w-[200px]"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Get Started Free
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[200px] bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700">
        <Footer />
      </section>
    </div>
  );
};

export default Landing;