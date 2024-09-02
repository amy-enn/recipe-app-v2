import { useContext } from "react";
import { RecipeContext, Recipe } from "../context/RecipeContext";

interface RecipeListProps {
    onRecipeSelect: (recipe: Recipe) => void;
}

const RecipeList = ({onRecipeSelect}: RecipeListProps) => {

    const context = useContext(RecipeContext);

    if (!context) {
        throw new Error('RecipeContext must be used within a RecipeProvider');
    }

    const { recipes, selectRecipe } = context;

    return (
        <div className="recipe-list">
            {recipes.map((recipe) => (
                <div key={recipe.recipe_id} onClick={() => onRecipeSelect(recipe)} className="cursor-pointer hover:underline">
                    {recipe.recipe_name}
                </div>))}
        </div>
    );
};

export default RecipeList;