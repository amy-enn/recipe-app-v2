import { createContext, useState, useEffect, ReactNode } from 'react';
import recipeData from '../recipes.json';
import categoryData from '../categories.json';

export type Category = {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
}

export type Recipe = {
    recipe_name: string;
    recipe_id: number;
    category_id: number;
    ingredients: { ingredient_name: string; quantity: string }[];
    instructions: string[];
    description: string;
    imageUrl: string
}

interface RecipeContextProps {
    recipes: Recipe[];
    categories: Category[];
    selectedRecipe: Recipe | null;
    bookmarks: Recipe[];
    setSelectedRecipe: (recipe: Recipe) => void;
    selectRecipe: (recipe: Recipe) => void;
    addBookmark: (recipe: Recipe) => void;
}

const RecipeContext = createContext<RecipeContextProps | undefined>(undefined);

const RecipeProvider = ({ children }: { children: ReactNode }) => {
    const recipes: Recipe[] = recipeData;

    const categories: Category[] = categoryData;


    
    const [bookmarks, setBookmarks] = useState<Recipe[]>(() => {
        const storedBookmarks = localStorage.getItem('bookmarks');
        return storedBookmarks ? JSON.parse(storedBookmarks) : [];
    });

    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    // load bookmarks from local storage if present
    // useEffect(() => {
    //     const storedBookmarks = localStorage.getItem('bookmarks');
    //     if (storedBookmarks) {
    //         console.log(storedBookmarks);
    //         setBookmarks(JSON.parse(storedBookmarks));
    //     }
    // }, []);

    // save bookmarks to local storage
    useEffect(() => {
        if (bookmarks.length > 0) {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        console.log(bookmarks);
        }
    }, [bookmarks]);

    const selectRecipe = (recipe: Recipe) => setSelectedRecipe(recipe);

    const addBookmark = (recipe: Recipe) => {
        setBookmarks((prevBookmarks) => {
            if (prevBookmarks.some((r) => r.recipe_id === recipe.recipe_id)) {
                // remove the recipe if it is already bookmarked
                return prevBookmarks.filter((r) => r.recipe_id !== recipe.recipe_id);
            } else {
                // add the recipe to bookmarks if it isn't already bookmarked
                return [...prevBookmarks, recipe];
            }
        });
    };
    

    return (
        <RecipeContext.Provider
            value={{ recipes, categories, selectedRecipe, setSelectedRecipe, bookmarks, selectRecipe, addBookmark }}
        >
            {children}
        </RecipeContext.Provider>
    );
};

export { RecipeContext, RecipeProvider };
