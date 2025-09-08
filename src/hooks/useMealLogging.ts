import { useState, useEffect } from "react";
import { LoggedMeal } from "@/types/indian-cuisine";

const STORAGE_KEY = "logged_meals";

export const useMealLogging = () => {
  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>([]);

  // Load meals from localStorage on mount
  useEffect(() => {
    const savedMeals = localStorage.getItem(STORAGE_KEY);
    if (savedMeals) {
      try {
        const meals = JSON.parse(savedMeals);
        setLoggedMeals(meals);
      } catch (error) {
        console.error("Error loading meals from localStorage:", error);
      }
    }
  }, []);

  // Save meals to localStorage whenever loggedMeals changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedMeals));
  }, [loggedMeals]);

  const addMeal = (meal: LoggedMeal) => {
    setLoggedMeals(prev => [...prev, meal]);
  };

  const removeMeal = (mealId: string) => {
    setLoggedMeals(prev => prev.filter(meal => meal.id !== mealId));
  };

  const updateMeal = (mealId: string, updatedMeal: Partial<LoggedMeal>) => {
    setLoggedMeals(prev => 
      prev.map(meal => 
        meal.id === mealId ? { ...meal, ...updatedMeal } : meal
      )
    );
  };

  const getTodaysMeals = () => {
    const today = new Date().toISOString().split('T')[0];
    return loggedMeals.filter(meal => meal.date === today);
  };

  const getTodaysCalories = () => {
    return getTodaysMeals().reduce((total, meal) => total + meal.calories, 0);
  };

  const getMealsByType = (type: string) => {
    return getTodaysMeals().filter(meal => meal.type === type);
  };

  const getTodaysMacros = () => {
    const todaysMeals = getTodaysMeals();
    const totalCalories = getTodaysCalories();
    
    // Rough estimation based on Indian cuisine patterns
    // These would ideally come from a nutrition database
    const estimatedProtein = Math.round(totalCalories * 0.15 / 4); // 15% of calories from protein
    const estimatedCarbs = Math.round(totalCalories * 0.60 / 4);   // 60% of calories from carbs
    const estimatedFat = Math.round(totalCalories * 0.25 / 9);     // 25% of calories from fat
    
    return {
      protein: estimatedProtein,
      carbs: estimatedCarbs,
      fat: estimatedFat,
      calories: totalCalories
    };
  };

  const getMealCount = () => {
    const todaysMeals = getTodaysMeals();
    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    const loggedTypes = new Set(todaysMeals.map(meal => meal.type));
    
    return {
      logged: loggedTypes.size,
      total: mealTypes.length,
      remaining: mealTypes.filter(type => !loggedTypes.has(type))
    };
  };

  const clearTodaysMeals = () => {
    const today = new Date().toISOString().split('T')[0];
    setLoggedMeals(prev => prev.filter(meal => meal.date !== today));
  };

  const clearAllMeals = () => {
    setLoggedMeals([]);
  };

  return {
    loggedMeals,
    addMeal,
    removeMeal,
    updateMeal,
    getTodaysMeals,
    getTodaysCalories,
    getMealsByType,
    getTodaysMacros,
    getMealCount,
    clearTodaysMeals,
    clearAllMeals
  };
};