import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Target, Users, Award, Zap, Shield } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Health First",
      description: "We believe everyone deserves access to nutritional guidance that promotes long-term health and wellness.",
    },
    {
      icon: Target,
      title: "Personalized Approach", 
      description: "Every person is unique. Our AI-powered platform creates meal plans tailored to your specific goals and preferences.",
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Building a supportive community where people can share their health journeys and inspire each other.",
    },
    {
      icon: Award,
      title: "Evidence-Based",
      description: "Our recommendations are backed by the latest nutritional science and research from leading health institutions.",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Nutritionist",
      bio: "PhD in Nutrition Science with 15+ years experience in clinical nutrition and meal planning.",
      expertise: ["Clinical Nutrition", "Meal Planning", "Metabolic Health"],
    },
    {
      name: "Marcus Johnson", 
      role: "Head of Product",
      bio: "Former tech lead at major health platforms, passionate about making nutrition accessible through technology.",
      expertise: ["Product Strategy", "User Experience", "Health Tech"],
    },
    {
      name: "Elena Rodriguez",
      role: "AI Research Lead",
      bio: "Machine Learning PhD specializing in personalized recommendation systems for health and wellness.",
      expertise: ["Machine Learning", "AI Systems", "Personalization"],
    },
  ];

  const milestones = [
    { year: "2021", event: "NutriPlan founded with mission to democratize nutrition" },
    { year: "2022", event: "Launched AI-powered meal planning algorithm" },
    { year: "2023", event: "Reached 50,000+ active users worldwide" },
    { year: "2024", event: "Partnered with leading nutritionists and health organizations" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Mission: Making Nutrition Simple
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            We're dedicated to helping people achieve their health goals through personalized nutrition, 
            evidence-based recommendations, and a supportive community.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-16">
        {/* Our Story */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
              <p className="mb-6">
                NutriPlan was born from a simple observation: despite having access to more nutritional 
                information than ever before, people still struggle to create sustainable, healthy eating habits.
              </p>
              <p className="mb-6">
                Our founders, combining expertise in nutrition science, technology, and behavioral psychology, 
                set out to create a platform that would make personalized nutrition accessible to everyone.
              </p>
              <p>
                Today, we're proud to serve over 50,000 users worldwide, helping them transform their 
                relationship with food and achieve lasting health improvements.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at NutriPlan.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="shadow-card border-0">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-primary p-3 rounded-xl">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate experts behind NutriPlan's mission to transform health through nutrition.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="shadow-card border-0">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Milestones */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our mission to make nutrition accessible to everyone.
            </p>
          </div>

          <Card className="shadow-card border-0">
            <CardContent className="p-8">
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <div className="bg-gradient-primary text-white rounded-lg px-4 py-2 font-bold text-sm">
                      {milestone.year}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-muted-foreground">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Impact Stats */}
        <section className="bg-accent/30 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-muted-foreground">
              The difference we're making in people's lives every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10M+</div>
              <div className="text-muted-foreground">Meals Planned</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">User Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2.5M</div>
              <div className="text-muted-foreground">Pounds Lost</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;