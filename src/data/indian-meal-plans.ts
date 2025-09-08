import { IndianMealPlan } from "@/types/indian-cuisine";

export const mockIndianMealPlan: IndianMealPlan = {
  days: [
    {
      day: "Monday",
      regionalTheme: "North Indian",
      meals: [
        {
          type: "Breakfast",
          name: "Aloo Paratha with Dahi",
          calories: 380,
          time: "8:00 AM",
          region: "Punjab",
          ingredients: ["Potato", "Wheat flour", "Yogurt", "Ghee", "Spices"],
          cookingMethod: "Pan-fried"
        },
        {
          type: "Lunch", 
          name: "Rajma Chawal with Salad",
          calories: 520,
          time: "1:00 PM",
          region: "Punjab",
          ingredients: ["Kidney beans", "Basmati rice", "Onion", "Tomato", "Spices"],
          cookingMethod: "Pressure cooked"
        },
        {
          type: "Dinner",
          name: "Palak Paneer with Roti",
          calories: 420,
          time: "8:00 PM", 
          region: "North India",
          ingredients: ["Spinach", "Paneer", "Wheat flour", "Cream", "Spices"],
          cookingMethod: "Sautéed"
        },
        {
          type: "Snack",
          name: "Masala Chai with Marie Biscuits",
          calories: 150,
          time: "4:00 PM",
          region: "All India",
          ingredients: ["Tea leaves", "Milk", "Sugar", "Cardamom", "Ginger"],
          cookingMethod: "Boiled"
        }
      ]
    },
    {
      day: "Tuesday",
      regionalTheme: "South Indian", 
      meals: [
        {
          type: "Breakfast",
          name: "Idli Sambar with Coconut Chutney",
          calories: 320,
          time: "8:00 AM",
          region: "Tamil Nadu",
          ingredients: ["Rice", "Urad dal", "Toor dal", "Coconut", "Curry leaves"],
          cookingMethod: "Steamed"
        },
        {
          type: "Lunch",
          name: "Curd Rice with Pickle",
          calories: 450,
          time: "1:00 PM", 
          region: "South India",
          ingredients: ["Rice", "Yogurt", "Mustard seeds", "Curry leaves", "Pickle"],
          cookingMethod: "Mixed"
        },
        {
          type: "Dinner",
          name: "Fish Curry with Rice",
          calories: 480,
          time: "8:00 PM",
          region: "Kerala",
          ingredients: ["Fish", "Coconut milk", "Rice", "Curry leaves", "Spices"],
          cookingMethod: "Curry"
        },
        {
          type: "Snack", 
          name: "Filter Coffee with Murukku",
          calories: 180,
          time: "4:00 PM",
          region: "Tamil Nadu",
          ingredients: ["Coffee powder", "Milk", "Sugar", "Rice flour", "Urad dal"],
          cookingMethod: "Brewed"
        }
      ]
    },
    {
      day: "Wednesday",
      regionalTheme: "Gujarati",
      meals: [
        {
          type: "Breakfast",
          name: "Dhokla with Green Chutney", 
          calories: 280,
          time: "8:00 AM",
          region: "Gujarat",
          ingredients: ["Gram flour", "Yogurt", "Ginger", "Green chilies", "Coriander"],
          cookingMethod: "Steamed"
        },
        {
          type: "Lunch",
          name: "Gujarati Thali with Rotli",
          calories: 580,
          time: "1:00 PM",
          region: "Gujarat", 
          ingredients: ["Wheat flour", "Mixed vegetables", "Dal", "Rice", "Jaggery"],
          cookingMethod: "Various"
        },
        {
          type: "Dinner",
          name: "Khichdi with Kadhi",
          calories: 400,
          time: "8:00 PM",
          region: "Gujarat",
          ingredients: ["Rice", "Moong dal", "Yogurt", "Gram flour", "Turmeric"],
          cookingMethod: "Boiled"
        },
        {
          type: "Snack",
          name: "Gujarati Farsan with Chai",
          calories: 200,
          time: "4:00 PM",
          region: "Gujarat",
          ingredients: ["Gram flour", "Spices", "Oil", "Tea", "Milk"],
          cookingMethod: "Fried"
        }
      ]
    },
    {
      day: "Thursday", 
      regionalTheme: "Bengali",
      meals: [
        {
          type: "Breakfast",
          name: "Luchi with Aloo Dum",
          calories: 420,
          time: "8:00 AM",
          region: "Bengal",
          ingredients: ["Refined flour", "Potato", "Panch phoron", "Oil", "Spices"],
          cookingMethod: "Deep fried"
        },
        {
          type: "Lunch",
          name: "Fish Curry with Steamed Rice",
          calories: 520,
          time: "1:00 PM",
          region: "Bengal",
          ingredients: ["Fish", "Mustard oil", "Rice", "Turmeric", "Nigella seeds"],
          cookingMethod: "Curry"
        },
        {
          type: "Dinner", 
          name: "Kosha Mangsho with Luchi",
          calories: 480,
          time: "8:00 PM",
          region: "Bengal",
          ingredients: ["Mutton", "Onion", "Yogurt", "Refined flour", "Garam masala"],
          cookingMethod: "Slow cooked"
        },
        {
          type: "Snack",
          name: "Mishti Doi with Sandesh",
          calories: 220,
          time: "4:00 PM",
          region: "Bengal",
          ingredients: ["Milk", "Sugar", "Jaggery", "Chenna", "Cardamom"],
          cookingMethod: "Set"
        }
      ]
    },
    {
      day: "Friday",
      regionalTheme: "Maharashtrian",
      meals: [
        {
          type: "Breakfast",
          name: "Poha with Sev",
          calories: 300,
          time: "8:00 AM", 
          region: "Maharashtra",
          ingredients: ["Flattened rice", "Onion", "Peanuts", "Curry leaves", "Sev"],
          cookingMethod: "Sautéed"
        },
        {
          type: "Lunch",
          name: "Bhel Puri with Pav Bhaji",
          calories: 550,
          time: "1:00 PM",
          region: "Maharashtra",
          ingredients: ["Puffed rice", "Mixed vegetables", "Pav bread", "Chutneys", "Spices"],
          cookingMethod: "Mixed"
        },
        {
          type: "Dinner",
          name: "Varan Bhaat with Bhindi Sabzi",
          calories: 450,
          time: "8:00 PM",
          region: "Maharashtra", 
          ingredients: ["Toor dal", "Rice", "Okra", "Turmeric", "Mustard seeds"],
          cookingMethod: "Boiled"
        },
        {
          type: "Snack",
          name: "Vada Pav with Chai",
          calories: 280,
          time: "4:00 PM",
          region: "Maharashtra",
          ingredients: ["Potato", "Gram flour", "Pav bread", "Green chutney", "Tea"],
          cookingMethod: "Deep fried"
        }
      ]
    },
    {
      day: "Saturday",
      regionalTheme: "Punjabi",
      meals: [
        {
          type: "Breakfast",
          name: "Chole Bhature with Lassi",
          calories: 520,
          time: "8:30 AM",
          region: "Punjab",
          ingredients: ["Chickpeas", "Refined flour", "Yogurt", "Mango", "Spices"],
          cookingMethod: "Deep fried"
        },
        {
          type: "Lunch", 
          name: "Butter Chicken with Naan",
          calories: 620,
          time: "1:00 PM",
          region: "Punjab",
          ingredients: ["Chicken", "Tomato", "Cream", "Refined flour", "Butter"],
          cookingMethod: "Curry"
        },
        {
          type: "Dinner",
          name: "Dal Makhani with Jeera Rice",
          calories: 480,
          time: "8:00 PM",
          region: "Punjab",
          ingredients: ["Black lentils", "Kidney beans", "Rice", "Cream", "Cumin"],
          cookingMethod: "Slow cooked"
        },
        {
          type: "Snack",
          name: "Samosa with Tamarind Chutney",
          calories: 250,
          time: "4:00 PM",
          region: "North India",
          ingredients: ["Refined flour", "Potato", "Peas", "Tamarind", "Spices"],
          cookingMethod: "Deep fried"
        }
      ]
    },
    {
      day: "Sunday",
      regionalTheme: "Kerala",
      meals: [
        {
          type: "Breakfast",
          name: "Appam with Vegetable Stew",
          calories: 350,
          time: "8:00 AM",
          region: "Kerala",
          ingredients: ["Rice", "Coconut", "Mixed vegetables", "Coconut milk", "Curry leaves"],
          cookingMethod: "Fermented"
        },
        {
          type: "Lunch",
          name: "Sadya with Payasam",
          calories: 650,
          time: "1:00 PM",
          region: "Kerala", 
          ingredients: ["Rice", "Various curries", "Coconut", "Jaggery", "Cardamom"],
          cookingMethod: "Traditional"
        },
        {
          type: "Dinner",
          name: "Karimeen Curry with Rice",
          calories: 420,
          time: "8:00 PM",
          region: "Kerala",
          ingredients: ["Pearl spot fish", "Coconut milk", "Rice", "Kokum", "Spices"],
          cookingMethod: "Curry"
        },
        {
          type: "Snack",
          name: "Banana Chips with Coconut Water",
          calories: 180,
          time: "4:00 PM",
          region: "Kerala",
          ingredients: ["Raw banana", "Coconut oil", "Salt", "Turmeric", "Coconut water"],
          cookingMethod: "Deep fried"
        }
      ]
    }
  ],
  totalCalories: 2100,
  macros: { protein: 85, carbs: 280, fat: 65, fiber: 35 },
  ayurvedicBalance: "Balanced across all doshas with regional variety"
};