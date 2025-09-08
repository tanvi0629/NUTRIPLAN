import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Clock, Users, Star, Plus, Utensils, Wheat } from "lucide-react";
import { indianRecipes } from "@/data/indian-recipes";
import {
  IndianRecipe,
  LoggedMeal,
  validatePortionSize,
  RiceOption,
  RotiOption,
  ROTI_CALORIES_EACH,
  DEFAULT_RICE_GRAMS,
  DEFAULT_ROTI_COUNT,
  calculateRiceCalories,
  calculateRotiCalories,
  validateRiceGrams,
  validateRotiCount,
} from "@/types/indian-cuisine";
import { useToast } from "@/hooks/use-toast";

interface AddMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (meal: LoggedMeal) => void;
}

const AddMealModal = ({ isOpen, onClose, onAdd }: AddMealModalProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<IndianRecipe | null>(
    null
  );
  const [portionSize, setPortionSize] = useState(1);
  const [riceOption, setRiceOption] = useState<RiceOption>({
    selected: false,
    grams: DEFAULT_RICE_GRAMS,
    calories: calculateRiceCalories(DEFAULT_RICE_GRAMS),
  });
  const [rotiOption, setRotiOption] = useState<RotiOption>({
    selected: false,
    count: DEFAULT_ROTI_COUNT,
    calories: calculateRotiCalories(DEFAULT_ROTI_COUNT),
  });

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

  const filteredRecipes = indianRecipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.mainIngredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesSearch;
  });

  const handleAddMeal = () => {
    if (!selectedRecipe || !selectedMealType) {
      toast({
        title: "Missing Information",
        description: "Please select both a recipe and meal type.",
        variant: "destructive",
      });
      return;
    }

    // Validate portion size
    const portionValidation = validatePortionSize(portionSize);
    if (!portionValidation.isValid) {
      toast({
        title: "Invalid Portion Size",
        description: portionValidation.message,
        variant: "destructive",
      });
      return;
    }

    try {
      // Calculate total calories including rice and roti
      let totalCalories = Math.round(selectedRecipe.calories * portionSize);
      if (riceOption.selected) {
        totalCalories += riceOption.calories;
      }
      if (rotiOption.selected) {
        totalCalories += rotiOption.calories;
      }

      const loggedMeal: LoggedMeal = {
        id: Date.now().toString(),
        name: selectedRecipe.name,
        type: selectedMealType,
        calories: totalCalories,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        portion: portionSize,
        date: new Date().toISOString().split("T")[0],
        riceOption: riceOption.selected ? riceOption : undefined,
        rotiOption: rotiOption.selected ? rotiOption : undefined,
      };

      onAdd(loggedMeal);
      handleClose();
    } catch (error) {
      toast({
        title: "Error Adding Meal",
        description: "There was an error adding your meal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setSelectedMealType("");
    setSelectedRecipe(null);
    setPortionSize(1);
    setRiceOption({
      selected: false,
      grams: DEFAULT_RICE_GRAMS,
      calories: calculateRiceCalories(DEFAULT_RICE_GRAMS),
    });
    setRotiOption({
      selected: false,
      count: DEFAULT_ROTI_COUNT,
      calories: calculateRotiCalories(DEFAULT_ROTI_COUNT),
    });
    onClose();
  };

  const updateRiceGrams = (grams: number) => {
    const validation = validateRiceGrams(grams);
    if (!validation.isValid) {
      toast({
        title: "Invalid Rice Portion",
        description: validation.message,
        variant: "destructive",
      });
      return;
    }

    setRiceOption({
      ...riceOption,
      grams,
      calories: calculateRiceCalories(grams),
    });
  };

  const updateRotiCount = (count: number) => {
    const validation = validateRotiCount(count);
    if (!validation.isValid) {
      toast({
        title: "Invalid Roti Count",
        description: validation.message,
        variant: "destructive",
      });
      return;
    }

    setRotiOption({
      ...rotiOption,
      count,
      calories: calculateRotiCalories(count),
    });
  };

  const isLunchOrDinner =
    selectedMealType === "Lunch" || selectedMealType === "Dinner";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Indian Meal</DialogTitle>
          <DialogDescription>
            Search and select an Indian dish to add to your meal log
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Meal Type Selection */}
          <div className="space-y-2">
            <Label>Meal Type</Label>
            <Select
              value={selectedMealType}
              onValueChange={setSelectedMealType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                {mealTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <Label>Search Recipes</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Indian dishes or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Recipe Selection */}
          <div className="space-y-3">
            <Label>Select Recipe</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
              {filteredRecipes.slice(0, 10).map((recipe) => (
                <Card
                  key={recipe.id}
                  className={`cursor-pointer transition-all ${
                    selectedRecipe?.id === recipe.id
                      ? "ring-2 ring-primary bg-accent/50"
                      : "hover:bg-accent/30"
                  }`}
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{recipe.image}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {recipe.name}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          {recipe.time}m
                          <Users className="h-3 w-3" />
                          {recipe.servings}
                          <Star className="h-3 w-3 fill-secondary text-secondary" />
                          {recipe.rating}
                        </div>
                        <div className="flex gap-1 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {recipe.region}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {recipe.calories} kcal
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Portion Size */}
          {selectedRecipe && (
            <div className="space-y-2">
              <Label>Portion Size</Label>
              <Select
                value={portionSize.toString()}
                onValueChange={(value) => setPortionSize(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">Half portion (0.5x)</SelectItem>
                  <SelectItem value="1">Regular portion (1x)</SelectItem>
                  <SelectItem value="1.5">Large portion (1.5x)</SelectItem>
                  <SelectItem value="2">Double portion (2x)</SelectItem>
                </SelectContent>
              </Select>
              {selectedRecipe && (
                <div className="text-sm text-muted-foreground">
                  Main dish calories:{" "}
                  {Math.round(selectedRecipe.calories * portionSize)} kcal
                </div>
              )}
            </div>
          )}

          {/* Rice and Roti Options for Lunch/Dinner */}
          {selectedRecipe && isLunchOrDinner && (
            <div className="space-y-4 p-4 bg-accent/20 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Utensils className="h-4 w-4 text-primary" />
                <Label className="text-base font-medium">
                  Add Rice or Roti
                </Label>
              </div>

              {/* Rice Option */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rice-option"
                    checked={riceOption.selected}
                    onCheckedChange={(checked) =>
                      setRiceOption({
                        ...riceOption,
                        selected: checked as boolean,
                      })
                    }
                  />
                  <Label
                    htmlFor="rice-option"
                    className="flex items-center gap-2"
                  >
                    <span className="text-base">🍚</span>
                    Add Rice
                  </Label>
                </div>

                {riceOption.selected && (
                  <div className="ml-6 space-y-2">
                    <Label>Rice portion (grams)</Label>
                    <Select
                      value={riceOption.grams.toString()}
                      onValueChange={(value) => updateRiceGrams(Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50g (65 kcal)</SelectItem>
                        <SelectItem value="75">75g (98 kcal)</SelectItem>
                        <SelectItem value="100">100g (130 kcal)</SelectItem>
                        <SelectItem value="125">125g (163 kcal)</SelectItem>
                        <SelectItem value="150">150g (195 kcal)</SelectItem>
                        <SelectItem value="200">200g (260 kcal)</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-sm text-muted-foreground">
                      Rice calories: {riceOption.calories} kcal
                    </div>
                  </div>
                )}
              </div>

              {/* Roti Option */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="roti-option"
                    checked={rotiOption.selected}
                    onCheckedChange={(checked) =>
                      setRotiOption({
                        ...rotiOption,
                        selected: checked as boolean,
                      })
                    }
                  />
                  <Label
                    htmlFor="roti-option"
                    className="flex items-center gap-2"
                  >
                    <Wheat className="h-4 w-4" />
                    Add Roti
                  </Label>
                </div>

                {rotiOption.selected && (
                  <div className="ml-6 space-y-2">
                    <Label>Number of rotis</Label>
                    <Select
                      value={rotiOption.count.toString()}
                      onValueChange={(value) => updateRotiCount(Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                          (count) => (
                            <SelectItem key={count} value={count.toString()}>
                              {count} roti{count > 1 ? "s" : ""} (
                              {count * ROTI_CALORIES_EACH} kcal)
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <div className="text-sm text-muted-foreground">
                      Roti calories: {rotiOption.calories} kcal
                    </div>
                  </div>
                )}
              </div>

              {/* Total Calories Display */}
              {(riceOption.selected || rotiOption.selected) && (
                <div className="pt-2 border-t border-border">
                  <div className="text-sm font-medium">
                    Total meal calories:{" "}
                    {Math.round(selectedRecipe.calories * portionSize) +
                      (riceOption.selected ? riceOption.calories : 0) +
                      (rotiOption.selected ? rotiOption.calories : 0)}{" "}
                    kcal
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Main dish:{" "}
                    {Math.round(selectedRecipe.calories * portionSize)} kcal
                    {riceOption.selected &&
                      ` + Rice: ${riceOption.calories} kcal`}
                    {rotiOption.selected &&
                      ` + Roti: ${rotiOption.calories} kcal`}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Selected Recipe Preview */}
          {selectedRecipe && (
            <div className="p-4 bg-accent/30 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl">{selectedRecipe.image}</div>
                <div>
                  <div className="font-semibold">{selectedRecipe.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedRecipe.description}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary">
                  {selectedRecipe.region} Indian
                </Badge>
                <Badge variant="outline">{selectedRecipe.spiceLevel}</Badge>
                <Badge variant="outline">{selectedRecipe.category}</Badge>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleAddMeal}
              disabled={!selectedRecipe || !selectedMealType}
              className="flex-1"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Meal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMealModal;
