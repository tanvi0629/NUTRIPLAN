import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Clock, Users, Star, Heart, ChefHat, Filter } from "lucide-react";

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Desserts"];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const mockRecipes = [
    {
      id: 1,
      name: "Mediterranean Quinoa Bowl",
      image: "🥗",
      category: "Lunch",
      difficulty: "Easy",
      time: 25,
      servings: 2,
      rating: 4.8,
      calories: 420,
      tags: ["Vegetarian", "Gluten-Free", "High Protein"],
      description: "A nutritious and colorful bowl packed with quinoa, fresh vegetables, and Mediterranean flavors.",
    },
    {
      id: 2,
      name: "Grilled Salmon with Asparagus",
      image: "🐟",
      category: "Dinner",
      difficulty: "Medium",
      time: 30,
      servings: 4,
      rating: 4.9,
      calories: 380,
      tags: ["Low Carb", "High Protein", "Omega-3"],
      description: "Perfectly grilled salmon with roasted asparagus and lemon herb seasoning.",
    },
    {
      id: 3,
      name: "Greek Yogurt Berry Parfait",
      image: "🫐",
      category: "Breakfast",
      difficulty: "Easy",
      time: 5,
      servings: 1,
      rating: 4.7,
      calories: 280,
      tags: ["High Protein", "Probiotics", "Antioxidants"],
      description: "Creamy Greek yogurt layered with fresh berries and crunchy granola.",
    },
    {
      id: 4,
      name: "Chicken Buddha Bowl",
      image: "🍜",
      category: "Lunch",
      difficulty: "Medium",
      time: 35,
      servings: 2,
      rating: 4.6,
      calories: 520,
      tags: ["High Protein", "Balanced", "Colorful"],
      description: "A complete meal bowl with grilled chicken, roasted vegetables, and tahini dressing.",
    },
    {
      id: 5,
      name: "Avocado Toast Supreme",
      image: "🥑",
      category: "Breakfast",
      difficulty: "Easy",
      time: 10,
      servings: 1,
      rating: 4.5,
      calories: 320,
      tags: ["Vegetarian", "Healthy Fats", "Quick"],
      description: "Artisanal sourdough topped with smashed avocado, cherry tomatoes, and hemp seeds.",
    },
    {
      id: 6,
      name: "Chocolate Protein Smoothie",
      image: "🥤",
      category: "Snacks",
      difficulty: "Easy",
      time: 3,
      servings: 1,
      rating: 4.8,
      calories: 250,
      tags: ["High Protein", "Post-Workout", "Quick"],
      description: "Rich and creamy chocolate smoothie packed with protein and natural sweetness.",
    },
  ];

  const filteredRecipes = mockRecipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || recipe.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesDifficulty = selectedDifficulty === "all" || recipe.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Healthy Recipes</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover thousands of nutritious and delicious recipes to fuel your healthy lifestyle.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search recipes, ingredients, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty.toLowerCase()}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredRecipes.length} of {mockRecipes.length} recipes
            </div>
          </CardContent>
        </Card>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="shadow-card hover:shadow-glow transition-all duration-300 border-0 overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-4xl mb-2">{recipe.image}</div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg leading-tight">{recipe.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {recipe.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {recipe.time}m
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {recipe.servings}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-secondary text-secondary" />
                    {recipe.rating}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-semibold text-primary">{recipe.calories}</span>
                    <span className="text-muted-foreground"> kcal</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {recipe.difficulty}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1">
                  {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {recipe.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{recipe.tags.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="cta" className="flex-1">
                    <ChefHat className="h-4 w-4 mr-2" />
                    Cook Now
                  </Button>
                  <Button variant="outline" size="sm">
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find more recipes.
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredRecipes.length > 0 && (
          <div className="text-center">
            <Button variant="outline">
              Load More Recipes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;