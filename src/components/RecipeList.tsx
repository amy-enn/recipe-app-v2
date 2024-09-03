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

    // TODO: switch to useMemo for the grouped recipes
    const groupedRecipes = recipes.reduce((acc, recipe) => {
        const category = recipe.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(recipe);
        return acc;
    }, {} as Record<string, Recipe[]>);

    return (
<>
<h3>Recipe Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.keys(groupedRecipes).map((category) => (
                <div key={category} className="p-4 bg-butter rounded-xl shadow-xl border-4 border-peach">
                    <h2 className="text-xl font-bold mb-2 text-center">~ {category} ~</h2>
                    <ul>
                        {groupedRecipes[category].map((recipe) => (

                            <li
                                key={recipe.recipe_id}
                                onClick={() => onRecipeSelect(recipe)} className="cursor-pointer hover:underline text-center">
                                {recipe.recipe_name}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        </>

    );
};

export default RecipeList;