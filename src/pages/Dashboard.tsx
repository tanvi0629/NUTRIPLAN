import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  CalendarDays,
  Target,
  TrendingUp,
  Apple,
  Clock,
  ChefHat,
  BarChart3,
  Plus,
  Trash2,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import AddMealModal from "@/components/AddMealModal";
import { useMealLogging } from "@/hooks/useMealLogging";
import { useToast } from "@/hooks/use-toast";
import { LoggedMeal, IndianMealPlan } from "@/types/indian-cuisine";

const Dashboard = () => {
  const { user, loginAt } = useAuth();
  const { toast } = useToast();
  const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);
  const [savedMealPlans, setSavedMealPlans] = useState<IndianMealPlan[]>([]);
  const [isMealPlanModalOpen, setIsMealPlanModalOpen] = useState(false);
  const [selectedMealPlan, setSelectedMealPlan] = useState<IndianMealPlan | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    addMeal,
    removeMeal,
    getTodaysMeals,
    getTodaysCalories,
    getMealCount,
    getTodaysMacros,
  } = useMealLogging();

  const fullName = (user?.user_metadata?.name as string | undefined)?.trim();
  const firstName = fullName ? fullName.split(/\s+/)[0] : undefined;
  const displayName = firstName || user?.email?.split("@")[0] || "there";
  const streakDays = loginAt
    ? Math.max(
        1,
        Math.ceil((Date.now() - loginAt.getTime()) / (1000 * 60 * 60 * 24))
      )
    : 0;

  const todaysMeals = getTodaysMeals();
  const todaysCalories = getTodaysCalories();
  const todaysMacros = getTodaysMacros();

  // Pagination for meal plan modal
  const ITEMS_PER_PAGE = 4;
  const totalPages = selectedMealPlan ? Math.ceil(selectedMealPlan.days.length / ITEMS_PER_PAGE) : 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDays = selectedMealPlan ? selectedMealPlan.days.slice(startIndex, endIndex) : [];

  // Load saved meal plans on component mount
  useEffect(() => {
    const loadSavedMealPlans = () => {
      try {
        const saved = localStorage.getItem("saved_indian_meal_plan");
        if (saved) {
          const mealPlan = JSON.parse(saved);
          setSavedMealPlans([mealPlan]);
        } else {
          setSavedMealPlans([]);
        }
      } catch (error) {
        console.error("Error loading saved meal plans:", error);
        setSavedMealPlans([]);
      }
    };

    loadSavedMealPlans();
  }, []);

  // Listen for storage changes to refresh saved meal plans
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("saved_indian_meal_plan");
      if (saved) {
        try {
          const mealPlan = JSON.parse(saved);
          setSavedMealPlans([mealPlan]);
        } catch (error) {
          console.error("Error parsing saved meal plan:", error);
        }
      } else {
        setSavedMealPlans([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Function to refresh saved meal plans
  const refreshSavedMealPlans = () => {
    try {
      const saved = localStorage.getItem("saved_indian_meal_plan");
      if (saved) {
        const mealPlan = JSON.parse(saved);
        setSavedMealPlans([mealPlan]);
        toast({
          title: "Meal Plan Refreshed",
          description: "Your saved meal plan has been updated.",
        });
      } else {
        setSavedMealPlans([]);
      }
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "There was an error refreshing your meal plan.",
        variant: "destructive",
      });
    }
  };

  // Function to open meal plan modal
  const openMealPlanModal = (mealPlan: IndianMealPlan) => {
    setSelectedMealPlan(mealPlan);
    setCurrentPage(1);
    setIsMealPlanModalOpen(true);
  };

  // Function to close meal plan modal
  const closeMealPlanModal = () => {
    setIsMealPlanModalOpen(false);
    setSelectedMealPlan(null);
    setCurrentPage(1);
  };

  // Function to delete a saved meal plan
  const deleteSavedMealPlan = () => {
    try {
      localStorage.removeItem("saved_indian_meal_plan");
      setSavedMealPlans([]);
      closeMealPlanModal();
      toast({
        title: "Meal Plan Deleted",
        description: "Your saved meal plan has been removed.",
      });
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "There was an error deleting your meal plan.",
        variant: "destructive",
      });
    }
  };
  const handleAddMeal = (meal: LoggedMeal) => {
    const todaysMeals = getTodaysMeals();
    
    // Check if user has already logged 4 meals today
    if (todaysMeals.length >= 4) {
      toast({
        title: "Meal Limit Reached",
        description: "You can only log up to 4 meals per day. Please remove a meal first if you want to add a new one.",
        variant: "destructive",
      });
      return;
    }
    
    addMeal(meal);
    toast({
      title: "Meal Added!",
      description: `${meal.name} has been added to your meal log.`,
    });
  };

  const handleRemoveMeal = (mealId: string) => {
    removeMeal(mealId);
    toast({
      title: "Meal Removed",
      description: "The meal has been removed from your log.",
    });
  };

  const weeklyGoals = [
    {
      name: "Calories",
      current: 1850,
      target: 2000,
      unit: "kcal",
      progress: 92,
    },
    { name: "Protein", current: 120, target: 150, unit: "g", progress: 80 },
    { name: "Water", current: 6, target: 8, unit: "glasses", progress: 75 },
    { name: "Exercise", current: 4, target: 5, unit: "days", progress: 80 },
  ];

  const recentRecipes = [
    {
      name: "Butter Chicken",
      rating: 4.8,
      time: "45 min",
      difficulty: "Medium",
      region: "North Indian",
    },
    {
      name: "Masala Dosa",
      rating: 4.9,
      time: "45 min",
      difficulty: "Hard",
      region: "South Indian",
    },
    {
      name: "Chole Bhature",
      rating: 4.7,
      time: "60 min",
      difficulty: "Hard",
      region: "Punjabi",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {displayName}!</h1>
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
              <CardTitle className="text-sm font-medium">
                Today's Calories
              </CardTitle>
              <Apple className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todaysCalories}</div>
              <p className="text-xs text-muted-foreground">
                {Math.max(0, 2000 - todaysCalories)} calories remaining
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Meals Logged
              </CardTitle>
              <ChefHat className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {todaysMeals.length}/4
              </div>
              <p className="text-xs text-muted-foreground">
                {todaysMeals.length >= 4
                  ? "All meals logged!"
                  : `${4 - todaysMeals.length} meals remaining`}
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
              <p className="text-xs text-muted-foreground">Great progress!</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {streakDays} {streakDays === 1 ? "day" : "days"}
              </div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
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
                <CardDescription>Your planned meals for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaysMeals.length > 0 ? (
                  todaysMeals.map((meal) => (
                    <div
                      key={meal.id}
                      className="flex items-center justify-between p-4 bg-accent/50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{meal.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {meal.time}
                          {meal.portion !== 1 && (
                            <span>• {meal.portion}x portion</span>
                          )}
                        </div>
                        {/* Rice and Roti Information */}
                        {(meal.riceOption?.selected || meal.rotiOption?.selected) && (
                          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                            {meal.riceOption?.selected && (
                              <span className="flex items-center gap-1">
                                <span>🍚</span>
                                Rice: {meal.riceOption.grams}g ({meal.riceOption.calories} kcal)
                              </span>
                            )}
                            {meal.rotiOption?.selected && (
                              <span className="flex items-center gap-1">
                                <span>🫓</span>
                                Roti: {meal.rotiOption.count}x ({meal.rotiOption.calories} kcal)
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <div>
                          <Badge variant="secondary">{meal.type}</Badge>
                          <div className="text-sm text-muted-foreground mt-1">
                            {meal.calories} kcal
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveMeal(meal.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="text-4xl mb-4">🍽️</div>
                    <ChefHat className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No meals logged today</p>
                    <p className="text-sm">
                      Start by adding your first Indian meal!
                    </p>
                  </div>
                )}
                
                {/* Meal Limit Warning */}
                {todaysMeals.length >= 4 && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <div className="text-lg">⚠️</div>
                      <div className="text-sm font-medium">
                        Daily meal limit reached! You've logged all 4 meals for today.
                      </div>
                    </div>
                    <p className="text-xs text-yellow-700 mt-1">
                      Remove a meal if you want to add a different one.
                    </p>
                  </div>
                )}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsAddMealModalOpen(true)}
                  disabled={todaysMeals.length >= 4}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {todaysMeals.length >= 4 ? "Meal Limit Reached (4/4)" : "Add Indian Meal"}
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
                <CardDescription>Your progress this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Calories</span>
                    <span className="text-muted-foreground">
                      {todaysCalories}/2000 kcal
                    </span>
                  </div>
                  <Progress
                    value={(todaysCalories / 2000) * 100}
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {Math.round((todaysCalories / 2000) * 100)}% complete
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Protein</span>
                    <span className="text-muted-foreground">
                      {todaysMacros.protein}/150 g
                    </span>
                  </div>
                  <Progress
                    value={(todaysMacros.protein / 150) * 100}
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {Math.round((todaysMacros.protein / 150) * 100)}% complete
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Meals</span>
                    <span className="text-muted-foreground">
                      {todaysMeals.length}/4 meals
                    </span>
                  </div>
                  <Progress
                    value={(todaysMeals.length / 4) * 100}
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {Math.round((todaysMeals.length / 4) * 100)}% complete
                  </div>
                </div>

                {weeklyGoals.slice(-1).map((goal, index) => (
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

        {/* Saved Meal Plans */}
        {savedMealPlans.length > 0 && (
          <Card className="shadow-card border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Your Saved Meal Plan
                  </CardTitle>
                  <CardDescription>
                    Your personalized Indian meal plan is ready to follow
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshSavedMealPlans}
                  className="gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {savedMealPlans.map((mealPlan, index) => (
                <div key={index} className="space-y-4">
                  {/* Meal Plan Summary */}
                  <div className="p-4 bg-accent/30 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{mealPlan.totalCalories}</div>
                        <div className="text-sm text-muted-foreground">Daily Calories</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-secondary">{mealPlan.days.length}</div>
                        <div className="text-sm text-muted-foreground">Days</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{mealPlan.macros.protein}g</div>
                        <div className="text-sm text-muted-foreground">Protein</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-secondary">{mealPlan.macros.carbs}g</div>
                        <div className="text-sm text-muted-foreground">Carbs</div>
                      </div>
                    </div>
                    <div className="text-center mt-3 text-sm text-muted-foreground">
                      {mealPlan.ayurvedicBalance}
                    </div>
                  </div>

                  {/* First 3 Days Preview */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Meal Plan Preview</h4>
                    {mealPlan.days.slice(0, 3).map((day, dayIndex) => (
                      <div key={dayIndex} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="font-semibold text-primary">{day.day}</h5>
                          {day.regionalTheme && (
                            <Badge variant="secondary" className="text-xs">
                              {day.regionalTheme}
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {day.meals.slice(0, 2).map((meal, mealIndex) => (
                            <div key={mealIndex} className="flex justify-between items-center p-2 bg-accent/20 rounded text-sm">
                              <div className="flex-1">
                                <div className="font-medium">{meal.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {meal.time} • {meal.type}
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground ml-2">
                                {meal.calories} kcal
                              </div>
                            </div>
                          ))}
                        </div>
                        {day.meals.length > 2 && (
                          <div className="text-xs text-muted-foreground mt-2 text-center">
                            +{day.meals.length - 2} more meals
                          </div>
                        )}
                      </div>
                    ))}
                    {mealPlan.days.length > 3 && (
                      <div className="text-center text-sm text-muted-foreground">
                        +{mealPlan.days.length - 3} more days in your meal plan
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="cta" 
                      className="flex-1"
                      onClick={() => openMealPlanModal(mealPlan)}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      View Full Plan
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={deleteSavedMealPlan}
                      className="px-6"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Recent Indian Recipes */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>🇮🇳 Popular Indian Recipes</CardTitle>
            <CardDescription>
              Discover authentic Indian dishes from different regions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentRecipes.map((recipe, index) => (
                <div key={index} className="p-4 bg-accent/30 rounded-lg">
                  <div className="font-medium mb-2">{recipe.name}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>⭐ {recipe.rating}</span>
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      {recipe.difficulty}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {recipe.region}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/recipes">
              <Button variant="outline" className="w-full mt-4">
                Browse All Indian Recipes
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Add Meal Modal */}
        <AddMealModal
          isOpen={isAddMealModalOpen}
          onClose={() => setIsAddMealModalOpen(false)}
          onAdd={handleAddMeal}
        />

        {/* Meal Plan Modal */}
        <Dialog open={isMealPlanModalOpen} onOpenChange={setIsMealPlanModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Your Complete Meal Plan
                  </DialogTitle>
                  <DialogDescription>
                    Your personalized Indian meal plan with {selectedMealPlan?.days.length} days
                  </DialogDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMealPlanModal}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            
            {selectedMealPlan && (
              <div className="space-y-6">
                {/* Meal Plan Summary */}
                <div className="p-4 bg-accent/30 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{selectedMealPlan.totalCalories}</div>
                      <div className="text-sm text-muted-foreground">Daily Calories</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">{selectedMealPlan.days.length}</div>
                      <div className="text-sm text-muted-foreground">Days</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{selectedMealPlan.macros.protein}g</div>
                      <div className="text-sm text-muted-foreground">Protein</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">{selectedMealPlan.macros.carbs}g</div>
                      <div className="text-sm text-muted-foreground">Carbs</div>
                    </div>
                  </div>
                  <div className="text-center mt-3 text-sm text-muted-foreground">
                    {selectedMealPlan.ayurvedicBalance}
                  </div>
                </div>

                {/* Daily Meals with Pagination */}
                <div className="space-y-4">
                  {currentDays.map((day, dayIndex) => (
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
                        {day.meals.map((meal, mealIndex) => (
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
                      Showing {startIndex + 1}-{Math.min(endIndex, selectedMealPlan.days.length)} of {selectedMealPlan.days.length} days
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

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Link to="/meal-planner" className="flex-1">
                    <Button variant="cta" className="w-full">
                      <ChefHat className="h-4 w-4 mr-2" />
                      Create New Plan
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={deleteSavedMealPlan}
                    className="px-6"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Plan
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;
