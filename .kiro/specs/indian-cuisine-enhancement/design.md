# Design Document

## Overview

This design transforms the existing meal planning application into an Indian cuisine-focused platform by replacing generic Western meal options with authentic Indian dishes, expanding the meal planner to cover all 7 days with regional variety, and implementing functional meal logging capabilities. The design maintains the existing UI/UX patterns while adapting content and functionality for Indian food culture.

## Architecture

The enhancement follows the existing React component architecture with these key modifications:

- **MealPlanner.tsx**: Enhanced with Indian diet types, restrictions, and 7-day meal plans
- **Recipes.tsx**: Completely revamped with 20+ Indian recipes from different regions  
- **Dashboard.tsx**: Add meal functionality connected to meal logging system
- **Shared Data**: Indian cuisine data structures and nutritional information

## Components and Interfaces

### Enhanced MealPlanner Component

**Indian Diet Types Configuration:**
```typescript
const indianDietTypes = [
  "North Indian", "South Indian", "Gujarati", "Bengali", 
  "Punjabi", "Kerala", "Tamil", "Maharashtrian"
];

const indianRestrictions = [
  "Jain", "Sattvic", "No Onion/Garlic", "Pure Vegetarian", 
  "Swaminarayan", "Gluten-Free", "Dairy-Free"
];

const ayurvedicGoals = [
  "Weight Loss", "Muscle Gain", "Digestive Health", 
  "Immunity Boost", "Detox", "Energy Balance"
];
```

**7-Day Indian Meal Plan Structure:**
```typescript
interface IndianMealPlan {
  days: IndianDayPlan[];
  totalCalories: number;
  macros: { protein: number; carbs: number; fat: number; fiber: number };
  ayurvedicBalance: string;
}

interface IndianDayPlan {
  day: string;
  meals: IndianMeal[];
  regionalTheme?: string;
}

interface IndianMeal {
  type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  name: string;
  calories: number;
  time: string;
  region: string;
  ingredients: string[];
  cookingMethod: string;
}
```

### Enhanced Recipes Component

**Indian Recipe Data Structure:**
```typescript
interface IndianRecipe {
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
```

**Regional Recipe Distribution:**
- North Indian: 6 recipes (Butter Chicken, Rajma, Chole Bhature, Palak Paneer, Aloo Paratha, Lassi)
- South Indian: 6 recipes (Masala Dosa, Sambar, Idli, Coconut Chutney, Fish Curry, Rasam)
- East Indian: 4 recipes (Fish Curry Bengali, Mishti Doi, Puchka, Kosha Mangsho)
- West Indian: 4 recipes (Dhokla, Pav Bhaji, Vada Pav, Gujarati Dal)

### Dashboard Add Meal Functionality

**Meal Addition Interface:**
```typescript
interface AddMealModal {
  isOpen: boolean;
  selectedMealType: string;
  searchQuery: string;
  selectedMeal?: IndianRecipe;
  portionSize: number;
  onAdd: (meal: LoggedMeal) => void;
  onClose: () => void;
}

interface LoggedMeal {
  id: string;
  name: string;
  type: string;
  calories: number;
  time: string;
  portion: number;
  date: string;
}
```

## Data Models

### Indian Cuisine Data

**Mock 7-Day Indian Meal Plan:**
```typescript
const mockIndianMealPlan = {
  days: [
    {
      day: "Monday",
      regionalTheme: "North Indian",
      meals: [
        { type: "Breakfast", name: "Aloo Paratha with Dahi", calories: 380, time: "8:00 AM", region: "Punjab" },
        { type: "Lunch", name: "Rajma Chawal with Salad", calories: 520, time: "1:00 PM", region: "Punjab" },
        { type: "Dinner", name: "Palak Paneer with Roti", calories: 420, time: "8:00 PM", region: "North" },
        { type: "Snack", name: "Masala Chai with Biscuits", calories: 150, time: "4:00 PM", region: "All India" }
      ]
    },
    {
      day: "Tuesday", 
      regionalTheme: "South Indian",
      meals: [
        { type: "Breakfast", name: "Idli Sambar with Coconut Chutney", calories: 320, time: "8:00 AM", region: "Tamil Nadu" },
        { type: "Lunch", name: "Curd Rice with Pickle", calories: 450, time: "1:00 PM", region: "South India" },
        { type: "Dinner", name: "Fish Curry with Rice", calories: 480, time: "8:00 PM", region: "Kerala" },
        { type: "Snack", name: "Filter Coffee with Murukku", calories: 180, time: "4:00 PM", region: "Tamil Nadu" }
      ]
    }
    // ... continuing for all 7 days
  ],
  totalCalories: 2100,
  macros: { protein: 85, carbs: 280, fat: 65, fiber: 35 },
  ayurvedicBalance: "Balanced across all doshas"
};
```

**Indian Recipes Collection:**
20 authentic recipes covering:
- **Breakfast**: Masala Dosa, Idli, Aloo Paratha, Poha, Upma
- **Lunch/Dinner**: Butter Chicken, Biryani, Sambar Rice, Chole Bhature, Dal Tadka
- **Snacks**: Dhokla, Pav Bhaji, Vada Pav, Pani Puri, Samosa
- **Regional Specialties**: Fish Curry (Bengali/Kerala), Kosha Mangsho, Gujarati Dal, Rasam

## Error Handling

### Meal Plan Generation
- Handle cases where Indian dietary restrictions conflict with nutritional goals
- Provide alternative suggestions when specific regional cuisines don't meet calorie targets
- Graceful fallback to balanced Indian meals when specialized diets (Jain, Sattvic) limit options

### Recipe Search and Filtering
- Handle empty search results with suggestions for popular Indian dishes
- Manage regional filter combinations that might yield no results
- Provide spice level warnings and alternatives for sensitive users

### Add Meal Functionality
- Validate portion sizes against realistic Indian serving standards
- Handle duplicate meal additions with confirmation prompts
- Manage calorie limit warnings when adding high-calorie Indian dishes

## Testing Strategy

### Unit Testing
- Test Indian meal plan generation with various diet type combinations
- Validate recipe filtering by region, spice level, and dietary restrictions
- Test meal addition calculations with Indian portion sizes

### Integration Testing  
- Test complete meal planning workflow with Indian preferences
- Verify dashboard meal logging updates correctly
- Test recipe search with Indian dish names and ingredients

### User Experience Testing
- Validate authenticity of Indian dish names and descriptions
- Test regional cuisine representation and balance
- Verify cooking times and difficulty levels match Indian cooking reality

### Data Validation Testing
- Ensure nutritional information accuracy for Indian dishes
- Validate regional categorization of recipes
- Test spice level and dietary restriction accuracy

## Implementation Notes

### Cultural Authenticity
- Use authentic Indian dish names with proper spellings
- Include regional context and cooking methods
- Represent diverse Indian food culture from all regions
- Consider vegetarian-first approach common in Indian cuisine

### Nutritional Adaptations
- Adjust portion sizes to reflect Indian eating patterns
- Include Indian cooking methods (tadka, dum, etc.) in time estimates
- Account for Indian staples (rice, roti, dal) in macro calculations
- Consider Indian meal timing preferences (later dinner times)

### UI/UX Considerations
- Maintain existing component structure and styling
- Use appropriate emojis and icons for Indian dishes
- Ensure recipe images/emojis represent Indian food
- Keep familiar interaction patterns while adapting content