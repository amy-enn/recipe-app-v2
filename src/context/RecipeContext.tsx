import { createContext, useState, ReactNode } from 'react';
import recipeData from '../recipes.json';

export type Recipe = {
    recipe_name: string;
    recipe_id: number;
    category: string;
    ingredients: { ingredient_name: string; quantity: string }[];
    instructions: string[];
    description: string;
}

interface RecipeContextProps {
    recipes: Recipe[];
    selectedRecipe: Recipe | null;
    bookmarks: Recipe[];
    setSelectedRecipe: (recipe: Recipe) => void;
    selectRecipe: (recipe: Recipe) => void;
    addBookmark: (recipe: Recipe) => void;
}

const RecipeContext = createContext<RecipeContextProps | undefined>(undefined);

const RecipeProvider = ({ children }: { children: ReactNode }) => {
    const [recipes, setRecipes] = useState<Recipe[]>(recipeData);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [bookmarks, setBookmarks] = useState<Recipe[]>([]);

    const selectRecipe = (recipe: Recipe) => setSelectedRecipe(recipe);

    const addBookmark = (recipe: Recipe) => {
        setBookmarks((prev) => [...prev, recipe]);
    };

    return (
        <RecipeContext.Provider
            value={{ recipes, selectedRecipe, setSelectedRecipe, bookmarks, selectRecipe, addBookmark }}
        >
            {children}
        </RecipeContext.Provider>
    );
};

export { RecipeContext, RecipeProvider };
