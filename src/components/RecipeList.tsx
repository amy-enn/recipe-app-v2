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

    const { recipes, categories } = context;


    // group recipes by category id
    // TODO: switch to useMemo for the grouped recipes
    const groupedRecipes = recipes.reduce((acc, recipe) => {
        const categoryId = recipe.category_id;
        if (!acc[categoryId]) {
            acc[categoryId] = [];
        }
        acc[categoryId].push(recipe);
        return acc;
    }, {} as Record<number, Recipe[]>);


    return (
        <>
            <h3 className="text-lg font-bold">Recipe Categories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-4 mb-4">
                {Object.keys(groupedRecipes).map((categoryIdStr) => {
                    const categoryId = parseInt(categoryIdStr, 10);
                    const category = categories.find(cat => cat.id === Number(categoryId));

                    return (
                        <div key={categoryId} className="p-4 bg-butter rounded-xl shadow-xl border-4 border-peach">
                            {category && (
                                <>
                                    <h2 className="text-xl font-bold mb-2 text-center">~ {category.name} ~</h2>
                                    <img src={category.imageUrl} alt={category.name} className="mb-4 mx-auto max-w-40 rounded-full border-4 border-peach shadow-lg" />
                                    {/* <p className="text-center mb-4">{category.description}</p> */}
                                </>
                            )}
                            <ul>
                                {groupedRecipes[categoryId].map((recipe) => (
                                    <li
                                        key={recipe.recipe_id}
                                        onClick={() => onRecipeSelect(recipe)}
                                        className="cursor-pointer hover:underline text-center"
                                    >
                                        ✦ {recipe.recipe_name} ✦
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
export default RecipeList;