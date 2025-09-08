import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Clock, Users, Star, Heart, ChefHat } from "lucide-react";
import { indianRecipes } from "@/data/indian-recipes";
import { INDIAN_RECIPE_CATEGORIES, INDIAN_REGIONS, SPICE_LEVELS } from "@/types/indian-cuisine";

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState("all");

  const categories = INDIAN_RECIPE_CATEGORIES;
  const regions = INDIAN_REGIONS;
  const spiceLevels = ["All", ...SPICE_LEVELS];

  const mockRecipes = indianRecipes;

  const filteredRecipes = mockRecipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         recipe.mainIngredients.some(ingredient => ingredient.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || recipe.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesRegion = selectedRegion === "all" || recipe.region.toLowerCase() === selectedRegion.toLowerCase();
    const matchesSpiceLevel = selectedSpiceLevel === "all" || recipe.spiceLevel.toLowerCase() === selectedSpiceLevel.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesRegion && matchesSpiceLevel;
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">🇮🇳 Indian Recipes Collection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover authentic Indian recipes from North to South, featuring traditional flavors and regional specialties.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search Indian recipes, ingredients, or spices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-3 flex-wrap">
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

                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region.toLowerCase()}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSpiceLevel} onValueChange={setSelectedSpiceLevel}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Spice Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {spiceLevels.map((level) => (
                      <SelectItem key={level} value={level.toLowerCase()}>
                        {level}
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
                  <div className="flex gap-1">
                    <Badge variant="outline" className="text-xs">
                      {recipe.difficulty}
                    </Badge>
                    <Badge variant={recipe.spiceLevel === "Spicy" ? "destructive" : recipe.spiceLevel === "Medium" ? "secondary" : "outline"} className="text-xs">
                      {recipe.spiceLevel}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {recipe.region} Indian
                  </Badge>
                  {recipe.state && (
                    <Badge variant="outline" className="text-xs">
                      {recipe.state}
                    </Badge>
                  )}
                  {recipe.tags.slice(0, 1).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {recipe.tags.length > 1 && (
                    <Badge variant="outline" className="text-xs">
                      +{recipe.tags.length - 1}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="cta" className="flex-1">
                    <ChefHat className="h-4 w-4 mr-2" />
                    Cook Now
                  </Button>
                  <Button variant="outline" size="sm">
                    ❤️ Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <ChefHat className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Indian recipes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to discover more authentic Indian dishes.
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredRecipes.length > 0 && (
          <div className="text-center">
            <Button variant="outline">
              🍛 Load More Indian Recipes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;