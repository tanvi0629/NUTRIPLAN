import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  CalendarDays, 
  Target, 
  TrendingUp, 
  Apple, 
  Clock, 
  ChefHat,
  BarChart3,
  Plus
} from "lucide-react";

const Dashboard = () => {
  // Mock data for the dashboard
  const todayMeals = [
    { name: "Greek Yogurt Bowl", time: "8:00 AM", calories: 320, type: "Breakfast" },
    { name: "Quinoa Salad", time: "12:30 PM", calories: 450, type: "Lunch" },
    { name: "Grilled Salmon", time: "7:00 PM", calories: 380, type: "Dinner" },
  ];

  const weeklyGoals = [
    { name: "Calories", current: 1850, target: 2000, unit: "kcal", progress: 92 },
    { name: "Protein", current: 120, target: 150, unit: "g", progress: 80 },
    { name: "Water", current: 6, target: 8, unit: "glasses", progress: 75 },
    { name: "Exercise", current: 4, target: 5, unit: "days", progress: 80 },
  ];

  const recentRecipes = [
    { name: "Mediterranean Bowl", rating: 4.8, time: "25 min", difficulty: "Easy" },
    { name: "Protein Smoothie", rating: 4.9, time: "5 min", difficulty: "Easy" },
    { name: "Grilled Chicken Salad", rating: 4.7, time: "20 min", difficulty: "Medium" },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Sarah!</h1>
            <p className="text-muted-foreground">
              Here's your nutrition overview for today.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/meal-planner">
              <Button variant="cta" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Meal Plan
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Calories</CardTitle>
              <Apple className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,150</div>
              <p className="text-xs text-muted-foreground">
                850 calories remaining
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meals Logged</CardTitle>
              <ChefHat className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3/4</div>
              <p className="text-xs text-muted-foreground">
                Snack remaining
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">
                Great progress!
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 days</div>
              <p className="text-xs text-muted-foreground">
                Keep it up!
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Meals */}
          <div className="lg:col-span-2">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  Today's Meals
                </CardTitle>
                <CardDescription>
                  Your planned meals for today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayMeals.map((meal, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                    <div>
                      <div className="font-medium">{meal.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {meal.time}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{meal.type}</Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        {meal.calories} kcal
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Meal
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Goals */}
          <div>
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Weekly Goals
                </CardTitle>
                <CardDescription>
                  Your progress this week
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {weeklyGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{goal.name}</span>
                      <span className="text-muted-foreground">
                        {goal.current}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground text-right">
                      {goal.progress}% complete
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Recipes */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Recent Recipes</CardTitle>
            <CardDescription>
              Recipes you've tried recently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentRecipes.map((recipe, index) => (
                <div key={index} className="p-4 bg-accent/30 rounded-lg">
                  <div className="font-medium mb-2">{recipe.name}</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>⭐ {recipe.rating}</span>
                    <span>{recipe.time}</span>
                    <Badge variant="outline" className="text-xs">
                      {recipe.difficulty}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/recipes">
              <Button variant="outline" className="w-full mt-4">
                Browse All Recipes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;