import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ChefHat, Clock, Users, Target, Sparkles, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MealPlanner = () => {
  const [formData, setFormData] = useState({
    goal: "",
    dietType: "",
    restrictions: [] as string[],
    servings: "2",
    duration: "7",
    calorieTarget: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState<any>(null);
  const { toast } = useToast();

  const goals = [
    "Weight Loss",
    "Muscle Gain",
    "Maintenance",
    "Heart Health",
    "Energy Boost",
  ];

  const dietTypes = [
    "Balanced",
    "Low Carb",
    "Mediterranean", 
    "Plant-Based",
    "Keto",
    "Paleo",
  ];

  const restrictions = [
    "Gluten-Free",
    "Dairy-Free",
    "Nut-Free",
    "Vegetarian",
    "Vegan",
    "Low Sodium",
  ];

  const mockMealPlan = {
    days: [
      {
        day: "Monday",
        meals: [
          { type: "Breakfast", name: "Greek Yogurt Parfait", calories: 320, time: "8:00 AM" },
          { type: "Lunch", name: "Quinoa Buddha Bowl", calories: 450, time: "12:30 PM" },
          { type: "Dinner", name: "Grilled Salmon & Vegetables", calories: 380, time: "7:00 PM" },
          { type: "Snack", name: "Mixed Nuts & Apple", calories: 180, time: "3:30 PM" },
        ],
      },
      {
        day: "Tuesday", 
        meals: [
          { type: "Breakfast", name: "Avocado Toast", calories: 280, time: "8:00 AM" },
          { type: "Lunch", name: "Mediterranean Wrap", calories: 420, time: "12:30 PM" },
          { type: "Dinner", name: "Chicken Stir Fry", calories: 400, time: "7:00 PM" },
          { type: "Snack", name: "Greek Yogurt", calories: 120, time: "3:30 PM" },
        ],
      },
    ],
    totalCalories: 2550,
    macros: { protein: 125, carbs: 180, fat: 85 },
  };

  const handleRestrictionChange = (restriction: string, checked: boolean) => {
    setFormData({
      ...formData,
      restrictions: checked
        ? [...formData.restrictions, restriction]
        : formData.restrictions.filter((r) => r !== restriction),
    });
  };

  const generateMealPlan = async () => {
    if (!formData.goal || !formData.dietType) {
      toast({
        title: "Missing Information",
        description: "Please select your goal and diet type.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Mock API call
    setTimeout(() => {
      setMealPlan(mockMealPlan);
      setIsGenerating(false);
      toast({
        title: "Meal Plan Generated!",
        description: "Your personalized meal plan is ready.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">AI Meal Plan Generator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create personalized meal plans based on your goals, preferences, and dietary restrictions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Plan Preferences
              </CardTitle>
              <CardDescription>
                Tell us about your goals and dietary preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Health Goal</Label>
                  <Select value={formData.goal} onValueChange={(value) => setFormData({...formData, goal: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      {goals.map((goal) => (
                        <SelectItem key={goal} value={goal}>
                          {goal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Diet Type</Label>
                  <Select value={formData.dietType} onValueChange={(value) => setFormData({...formData, dietType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select diet type" />
                    </SelectTrigger>
                    <SelectContent>
                      {dietTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Select value={formData.servings} onValueChange={(value) => setFormData({...formData, servings: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'person' : 'people'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="7">1 week</SelectItem>
                      <SelectItem value="14">2 weeks</SelectItem>
                      <SelectItem value="30">1 month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calories">Daily Calories</Label>
                  <Input
                    id="calories"
                    placeholder="e.g. 2000"
                    value={formData.calorieTarget}
                    onChange={(e) => setFormData({...formData, calorieTarget: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Dietary Restrictions</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {restrictions.map((restriction) => (
                    <div key={restriction} className="flex items-center space-x-2">
                      <Checkbox
                        id={restriction}
                        checked={formData.restrictions.includes(restriction)}
                        onCheckedChange={(checked) => 
                          handleRestrictionChange(restriction, checked as boolean)
                        }
                      />
                      <Label htmlFor={restriction} className="text-sm">
                        {restriction}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={generateMealPlan}
                variant="cta" 
                className="w-full" 
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <ChefHat className="h-4 w-4 mr-2" />
                    Generate Meal Plan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary" />
                Your Meal Plan
              </CardTitle>
              <CardDescription>
                {mealPlan ? "Your personalized meal plan is ready!" : "Fill out the form to generate your plan"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mealPlan ? (
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="p-4 bg-accent/30 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{mealPlan.totalCalories}</div>
                        <div className="text-sm text-muted-foreground">Daily Calories</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-secondary">{formData.duration}</div>
                        <div className="text-sm text-muted-foreground">Days</div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-4 text-sm">
                      <span>Protein: {mealPlan.macros.protein}g</span>
                      <span>Carbs: {mealPlan.macros.carbs}g</span>
                      <span>Fat: {mealPlan.macros.fat}g</span>
                    </div>
                  </div>

                  {/* Daily Meals */}
                  <div className="space-y-4">
                    {mealPlan.days.map((day: any, dayIndex: number) => (
                      <div key={dayIndex} className="border border-border rounded-lg p-4">
                        <h3 className="font-semibold mb-3 text-primary">{day.day}</h3>
                        <div className="space-y-2">
                          {day.meals.map((meal: any, mealIndex: number) => (
                            <div key={mealIndex} className="flex justify-between items-center p-2 bg-accent/20 rounded">
                              <div>
                                <div className="font-medium">{meal.name}</div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Badge variant="outline" className="text-xs">{meal.type}</Badge>
                                  <Clock className="h-3 w-3" />
                                  {meal.time}
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {meal.calories} kcal
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="cta" className="flex-1">
                      Save Plan
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Regenerate
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <ChefHat className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your meal plan will appear here once generated.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;