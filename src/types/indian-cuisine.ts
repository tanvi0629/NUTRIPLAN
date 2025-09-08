// Indian Cuisine Data Types and Interfaces

export interface IndianMeal {
  type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  name: string;
  calories: number;
  time: string;
  region: string;
  ingredients: string[];
  cookingMethod: string;
}

export interface IndianDayPlan {
  day: string;
  regionalTheme?: string;
  meals: IndianMeal[];
}

export interface IndianMealPlan {
  days: IndianDayPlan[];
  totalCalories: number;
  macros: { protein: number; carbs: number; fat: number; fiber: number };
  ayurvedicBalance: string;
}

export interface IndianRecipe {
  id: number;
  name: string;
  image: string;
  region: "North" | "South" | "East" | "West";
  state?: string;
  category: "Dal" | "Sabzi" | "Rice" | "Bread" | "Curry" | "Snacks" | "Sweets";
  difficulty: "Easy" | "Medium" | "Hard";
  time: number;
  servings: number;
  rating: number;
  calories: number;
  tags: string[];
  description: string;
  spiceLevel: "Mild" | "Medium" | "Spicy";
  mainIngredients: string[];
}

export interface LoggedMeal {
  id: string;
  name: string;
  type: string;
  calories: number;
  time: string;
  portion: number;
  date: string;
  riceOption?: RiceOption;
  rotiOption?: RotiOption;
}

export interface RiceOption {
  selected: boolean;
  grams: number;
  calories: number;
}

export interface RotiOption {
  selected: boolean;
  count: number;
  calories: number;
}

export interface AddMealModal {
  isOpen: boolean;
  selectedMealType: string;
  searchQuery: string;
  selectedMeal?: IndianRecipe;
  portionSize: number;
  onAdd: (meal: LoggedMeal) => void;
  onClose: () => void;
}

// Indian Diet Types and Constants
export const INDIAN_DIET_TYPES = [
  "North Indian",
  "South Indian", 
  "Gujarati",
  "Bengali",
  "Punjabi",
  "Kerala",
  "Tamil",
  "Maharashtrian"
];

export const INDIAN_RESTRICTIONS = [
  "Jain",
  "Sattvic", 
  "No Onion/Garlic",
  "Pure Vegetarian",
  "Swaminarayan",
  "Gluten-Free",
  "Dairy-Free",
  "Nut-Free"
];

export const AYURVEDIC_GOALS = [
  "Weight Loss",
  "Muscle Gain", 
  "Digestive Health",
  "Immunity Boost",
  "Detox",
  "Energy Balance",
  "Heart Health"
];

export const INDIAN_RECIPE_CATEGORIES = [
  "All",
  "Dal", 
  "Sabzi",
  "Rice Dishes",
  "Bread",
  "Curry", 
  "Snacks",
  "Sweets"
];

export const SPICE_LEVELS = ["Mild", "Medium", "Spicy"];

export const INDIAN_REGIONS = ["All", "North", "South", "East", "West"];

// Rice and Roti Constants
export const RICE_CALORIES_PER_GRAM = 1.3; // Approximately 130 calories per 100g
export const ROTI_CALORIES_EACH = 80; // Approximately 80 calories per roti
export const DEFAULT_RICE_GRAMS = 100;
export const DEFAULT_ROTI_COUNT = 2;

// Validation Functions
export const validateIndianDietCombination = (dietType: string, restrictions: string[]): { isValid: boolean; message?: string } => {
  // Jain diet is compatible with most regional cuisines but has specific restrictions
  if (restrictions.includes("Jain")) {
    if (restrictions.includes("No Onion/Garlic")) {
      return {
        isValid: false,
        message: "Jain diet already excludes onion and garlic. Please remove the 'No Onion/Garlic' restriction."
      };
    }
    // Jain diet is typically vegetarian
    if (!restrictions.includes("Pure Vegetarian")) {
      return {
        isValid: false,
        message: "Jain diet requires Pure Vegetarian restriction. Please add it to your preferences."
      };
    }
  }
  
  // Sattvic diet has specific requirements
  if (restrictions.includes("Sattvic")) {
    if (restrictions.includes("No Onion/Garlic")) {
      return {
        isValid: false,
        message: "Sattvic diet already excludes onion and garlic. Please remove the 'No Onion/Garlic' restriction."
      };
    }
    if (!restrictions.includes("Pure Vegetarian")) {
      return {
        isValid: false,
        message: "Sattvic diet requires Pure Vegetarian restriction. Please add it to your preferences."
      };
    }
  }

  // Swaminarayan diet validation
  if (restrictions.includes("Swaminarayan")) {
    if (!restrictions.includes("Pure Vegetarian")) {
      return {
        isValid: false,
        message: "Swaminarayan diet requires Pure Vegetarian restriction. Please add it to your preferences."
      };
    }
    if (!restrictions.includes("No Onion/Garlic")) {
      return {
        isValid: false,
        message: "Swaminarayan diet excludes onion and garlic. Please add 'No Onion/Garlic' restriction."
      };
    }
  }
  
  return { isValid: true };
};

export const validatePortionSize = (portionSize: number): { isValid: boolean; message?: string } => {
  if (portionSize <= 0) {
    return {
      isValid: false,
      message: "Portion size must be greater than 0."
    };
  }
  
  if (portionSize > 5) {
    return {
      isValid: false,
      message: "Portion size cannot exceed 5x for safety reasons."
    };
  }
  
  return { isValid: true };
};

export const validateCalorieTarget = (calories: string): { isValid: boolean; message?: string } => {
  const calorieNum = parseInt(calories);
  
  if (isNaN(calorieNum)) {
    return {
      isValid: false,
      message: "Please enter a valid number for calorie target."
    };
  }
  
  if (calorieNum < 800) {
    return {
      isValid: false,
      message: "Calorie target should be at least 800 for health safety."
    };
  }
  
  if (calorieNum > 5000) {
    return {
      isValid: false,
      message: "Calorie target seems too high. Please consult a nutritionist."
    };
  }
  
  return { isValid: true };
};

export const calculateIndianPortion = (baseCalories: number, portionSize: number): number => {
  // Indian portion calculations considering typical serving sizes
  return Math.round(baseCalories * portionSize);
};

export const getRegionalMacroProfile = (region: string) => {
  const profiles = {
    "North Indian": { protein: 0.15, carbs: 0.55, fat: 0.30 },
    "South Indian": { protein: 0.12, carbs: 0.65, fat: 0.23 },
    "Gujarati": { protein: 0.10, carbs: 0.60, fat: 0.30 },
    "Bengali": { protein: 0.18, carbs: 0.50, fat: 0.32 },
    "Punjabi": { protein: 0.16, carbs: 0.50, fat: 0.34 },
    "Kerala": { protein: 0.14, carbs: 0.58, fat: 0.28 },
    "Tamil": { protein: 0.13, carbs: 0.62, fat: 0.25 },
    "Maharashtrian": { protein: 0.14, carbs: 0.56, fat: 0.30 }
  };
  
  return profiles[region as keyof typeof profiles] || profiles["North Indian"];
};

// Rice and Roti Calculation Functions
export const calculateRiceCalories = (grams: number): number => {
  return Math.round(grams * RICE_CALORIES_PER_GRAM);
};

export const calculateRotiCalories = (count: number): number => {
  return count * ROTI_CALORIES_EACH;
};

export const validateRiceGrams = (grams: number): { isValid: boolean; message?: string } => {
  if (grams <= 0) {
    return {
      isValid: false,
      message: "Rice portion must be greater than 0 grams."
    };
  }
  
  if (grams > 500) {
    return {
      isValid: false,
      message: "Rice portion seems too large. Please select a reasonable amount."
    };
  }
  
  return { isValid: true };
};

export const validateRotiCount = (count: number): { isValid: boolean; message?: string } => {
  if (count <= 0) {
    return {
      isValid: false,
      message: "Roti count must be at least 1."
    };
  }
  
  if (count > 10) {
    return {
      isValid: false,
      message: "Maximum 10 rotis allowed per meal."
    };
  }
  
  return { isValid: true };
};