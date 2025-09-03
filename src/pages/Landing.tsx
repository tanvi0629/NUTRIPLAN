import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChefHat, Target, BarChart3, Users, Star, Clock, Utensils, Sparkles, Heart, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-nutrition.jpg";

const Landing = () => {
  const features = [
    {
      icon: ChefHat,
      title: "Personalized Meal Plans",
      description: "AI-powered meal planning based on your dietary preferences, goals, and restrictions.",
    },
    {
      icon: Utensils,
      title: "Recipe Discovery",
      description: "Explore thousands of healthy recipes with detailed nutritional information.",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor your nutrition goals with comprehensive analytics and insights.",
    },
    {
      icon: Target,
      title: "Goal Achievement",
      description: "Set and achieve your health goals with personalized recommendations.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      content: "NutriPlan revolutionized my meal planning. I've never felt healthier!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Busy Professional",
      content: "Finally, a meal planner that fits my hectic schedule. Love the convenience!",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Health Coach",
      content: "I recommend NutriPlan to all my clients. The results speak for themselves.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-secondary/5 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-accent/10 rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero/90"></div>
        
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 animate-bounce" style={{ animationDelay: "0s", animationDuration: "3s" }}>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Leaf className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="absolute top-32 right-1/4 animate-bounce" style={{ animationDelay: "1s", animationDuration: "4s" }}>
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Heart className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="absolute bottom-40 left-1/6 animate-bounce" style={{ animationDelay: "2s", animationDuration: "3.5s" }}>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 z-10">
          <div className="text-center text-white">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Transform Your Health with
                <span className="block bg-gradient-to-r from-white via-secondary-glow to-white bg-clip-text text-transparent animate-pulse">
                  Smart Nutrition
                </span>
              </h1>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Create personalized meal plans, discover delicious recipes, and track your progress 
                with our AI-powered nutrition platform.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
              <Link to="/signup">
                <Button variant="hero" size="lg" className="min-w-[200px] hover-scale shadow-glow">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/recipes">
                <Button variant="outline" size="lg" className="min-w-[200px] bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary hover-scale backdrop-blur-sm">
                  <Utensils className="w-5 h-5 mr-2" />
                  Explore Recipes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Everything You Need for Healthy Living
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to achieve your nutrition goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="shadow-card hover:shadow-glow transition-all duration-500 border-0 bg-card group hover:-translate-y-2 relative overflow-hidden"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: "fade-in 0.6s ease-out forwards"
                }}
              >
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <CardHeader className="text-center relative z-10">
                  <div className="mx-auto bg-gradient-primary p-3 rounded-xl mb-4 w-fit group-hover:scale-110 transition-transform duration-300 shadow-glow">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-center text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, hsl(var(--primary) / 0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 group-hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">50K+</div>
                <div className="text-xl text-muted-foreground">Happy Users</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 group-hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-secondary bg-clip-text text-transparent mb-2">10M+</div>
                <div className="text-xl text-muted-foreground">Meals Planned</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 group-hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">5K+</div>
                <div className="text-xl text-muted-foreground">Healthy Recipes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Customer Love
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied users who transformed their health with NutriPlan.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="shadow-card bg-card border-0 hover:shadow-glow transition-all duration-500 group relative overflow-hidden hover:-translate-y-2"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animation: "fade-in 0.8s ease-out forwards"
                }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary"></div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex mb-4 gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-secondary text-secondary group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 text-4xl text-primary/20 font-serif">"</div>
                    <p className="text-muted-foreground mb-6 italic leading-relaxed pl-4">
                      {testimonial.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Start Your Transformation
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join NutriPlan today and start your journey to a healthier, happier you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90 hover-scale shadow-glow min-w-[200px]">
                  <Heart className="w-5 h-5 mr-2" />
                  Get Started Free
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="min-w-[200px] bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;