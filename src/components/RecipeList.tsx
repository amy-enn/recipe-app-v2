import { useContext } from "react";
import { RecipeContext, Recipe } from "../context/RecipeContext";

interface RecipeListProps {
    onRecipeSelect: (recipe: Recipe) => void;
}

const RecipeList = ({ onRecipeSelect }: RecipeListProps) => {

    const context = useContext(RecipeContext);

    if (!context) {
        throw new Error('RecipeContext must be used within a RecipeProvider');
    }

    const { recipes } = context;

    const groupedRecipes = recipes.reduce((acc, recipe) => {
        const category = recipe.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(recipe);
        return acc;
    }, {} as Record<string, Recipe[]>);

    return (
        <div className="recipe-list">
            {Object.keys(groupedRecipes).map((category) => (
                <div key={category}>
                    <h2 className="text-xl font-bold mt-4 mb-2">{category}</h2>
                    {groupedRecipes[category].map((recipe) => (

                        <div
                            key={recipe.recipe_id}
                            onClick={() => onRecipeSelect(recipe)} className="cursor-pointer hover:underline">
                            {recipe.recipe_name}
                        </div>))}
                </div>
            ))}
        </div>
    );
};

export default RecipeList;