import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ChefHat, Clock, Sparkles, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { INDIAN_DIET_TYPES, INDIAN_RESTRICTIONS, AYURVEDIC_GOALS, validateIndianDietCombination, validateCalorieTarget, IndianMealPlan, IndianDayPlan } from "@/types/indian-cuisine";
import { mockIndianMealPlan } from "@/data/indian-meal-plans";

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
  const [mealPlan, setMealPlan] = useState<IndianMealPlan | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  // Helper function to generate day names based on duration
  const generateDayNames = (duration: number): string[] => {
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const result = [];
    
    for (let i = 0; i < duration; i++) {
      result.push(dayNames[i % 7]);
    }
    
    return result;
  };

  // Helper function to generate meal plan based on duration
  const generateMealPlanForDuration = (basePlan: IndianMealPlan, duration: number): IndianMealPlan => {
    const dayNames = generateDayNames(duration);
    const regionalThemes = [
      "North Indian", "South Indian", "Gujarati", "Bengali", 
      "Punjabi", "Kerala", "Tamil", "Maharashtrian"
    ];
    
    const days: IndianDayPlan[] = dayNames.map((dayName, index) => {
      // Cycle through the base plan days
      const baseDayIndex = index % basePlan.days.length;
      const baseDay = basePlan.days[baseDayIndex];
      
      return {
        day: dayName,
        regionalTheme: regionalThemes[index % regionalThemes.length],
        meals: baseDay.meals.map(meal => ({
          ...meal,
          // Keep original meal names for better user experience
          name: meal.name
        }))
      };
    });

    return {
      ...basePlan,
      days
    };
  };

  // Pagination helper
  const ITEMS_PER_PAGE = 4;
  const totalPages = mealPlan ? Math.ceil(mealPlan.days.length / ITEMS_PER_PAGE) : 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDays = mealPlan ? mealPlan.days.slice(startIndex, endIndex) : [];

  const saveMealPlan = () => {
    if (!mealPlan) {
      toast({
        title: "No Meal Plan",
        description: "Please generate a meal plan first.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Save meal plan to localStorage with timestamp
      const savedPlan = {
        ...mealPlan,
        savedAt: new Date().toISOString(),
        preferences: formData,
      };
      
      localStorage.setItem("saved_indian_meal_plan", JSON.stringify(savedPlan));
      
      toast({
        title: "Meal Plan Saved! 🎉",
        description: "Your Indian meal plan has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "There was an error saving your meal plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  const goals = AYURVEDIC_GOALS;
  const dietTypes = INDIAN_DIET_TYPES;
  const restrictions = INDIAN_RESTRICTIONS;



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

    // Validate Indian diet combination
    const dietValidation = validateIndianDietCombination(formData.dietType, formData.restrictions);
    if (!dietValidation.isValid) {
      toast({
        title: "Diet Combination Issue",
        description: dietValidation.message,
        variant: "destructive",
      });
      return;
    }

    // Validate calorie target if provided
    if (formData.calorieTarget) {
      const calorieValidation = validateCalorieTarget(formData.calorieTarget);
      if (!calorieValidation.isValid) {
        toast({
          title: "Invalid Calorie Target",
          description: calorieValidation.message,
          variant: "destructive",
        });
        return;
      }
    }

    setIsGenerating(true);
    
    // Mock API call
    setTimeout(() => {
      const duration = parseInt(formData.duration);
      const generatedPlan = generateMealPlanForDuration(mockIndianMealPlan, duration);
      setMealPlan(generatedPlan);
      setCurrentPage(1); // Reset to first page when generating new plan
      setIsGenerating(false);
      toast({
        title: "Indian Meal Plan Generated!",
        description: `Your personalized ${duration}-day Indian meal plan is ready.`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">🇮🇳 Indian AI Meal Plan Generator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create personalized Indian meal plans based on your Ayurvedic goals, regional preferences, and dietary restrictions.
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
                Tell us about your Ayurvedic goals and Indian dietary preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ayurvedic Goal</Label>
                  <Select value={formData.goal} onValueChange={(value) => setFormData({...formData, goal: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your wellness goal" />
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
                  <Label>Regional Cuisine</Label>
                  <Select value={formData.dietType} onValueChange={(value) => setFormData({...formData, dietType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Indian cuisine type" />
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
                  <Select value={formData.duration} onValueChange={(value) => {
                    setFormData({...formData, duration: value});
                    setCurrentPage(1); // Reset pagination when duration changes
                  }}>
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
                    Generating Indian Plan...
                  </>
                ) : (
                  <>
                    <ChefHat className="h-4 w-4 mr-2" />
                    Generate Indian Meal Plan
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
                        <div className="text-2xl font-bold text-secondary">{mealPlan.days.length}</div>
                        <div className="text-sm text-muted-foreground">Days</div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-3 mt-4 text-sm">
                      <span>Protein: {mealPlan.macros.protein}g</span>
                      <span>Carbs: {mealPlan.macros.carbs}g</span>
                      <span>Fat: {mealPlan.macros.fat}g</span>
                      <span>Fiber: {mealPlan.macros.fiber}g</span>
                    </div>
                    <div className="text-center mt-2 text-xs text-muted-foreground">
                      {mealPlan.ayurvedicBalance}
                    </div>
                  </div>

                  {/* Daily Meals */}
                  <div className="space-y-4">
                    {currentDays.map((day, dayIndex: number) => (
                      <div key={startIndex + dayIndex} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-semibold text-primary">{day.day}</h3>
                          {day.regionalTheme && (
                            <Badge variant="secondary" className="text-xs">
                              {day.regionalTheme}
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-2">
                          {day.meals.map((meal, mealIndex: number) => (
                            <div key={mealIndex} className="flex justify-between items-start p-3 bg-accent/20 rounded">
                              <div className="flex-1">
                                <div className="font-medium">{meal.name}</div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                  <Badge variant="outline" className="text-xs">{meal.type}</Badge>
                                  <Clock className="h-3 w-3" />
                                  {meal.time}
                                  <span>• {meal.region}</span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {meal.cookingMethod} • {meal.ingredients.slice(0, 3).join(", ")}
                                  {meal.ingredients.length > 3 && "..."}
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground ml-2">
                                {meal.calories} kcal
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-4">
                      <div className="text-sm text-muted-foreground">
                        Showing {startIndex + 1}-{Math.min(endIndex, mealPlan.days.length)} of {mealPlan.days.length} days
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                              className="w-8 h-8 p-0"
                            >
                              {page}
                            </Button>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button variant="cta" className="flex-1" onClick={saveMealPlan}>
                      🍽️ Save Indian Plan
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={generateMealPlan}>
                      🔄 Regenerate Plan
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="text-6xl mb-4">🇮🇳</div>
                  <ChefHat className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your personalized Indian meal plan will appear here once generated.</p>
                  <p className="text-sm mt-2">Experience authentic flavors from across India!</p>
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