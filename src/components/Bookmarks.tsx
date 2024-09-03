import { useContext } from 'react';
import { RecipeContext, Recipe } from '../context/RecipeContext';

interface BookmarksProps {
    isOpen: boolean;
    onClose: () => void;
    onRecipeSelect: (recipe: Recipe) => void;
}

const Bookmarks = ({ isOpen, onClose, onRecipeSelect }: BookmarksProps) => {
    const context = useContext(RecipeContext);

    if (!context) {
        throw new Error('RecipeContext must be used within a RecipeProvider');
    }

    const { bookmarks } = context;



    if (!isOpen) return null;


    //   const isBookmarked = bookmarks.some((recipe) => recipe.recipe_id === selectedRecipe.recipe_id);

    //   const handleBookmarkClick = () => {
    //     addBookmark(selectedRecipe);
    //   };

    return (
        <div className="fixed inset-0 bg-cocoa bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-butter border-4 border-peach shadow-lg p-8 max-w-[90vw] max-h-[90vh] overflow-y-auto">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-3xl font-bold">Bookmarks</h2>
                    <button className="border-4 bg-vanilla border-peach text-black text-lg font-bold py-1 px-2 rounded hover:scale-105 shadow-xl" onClick={onClose}>
                        Close
                    </button>
                </div>

                <h4 className="text-lg mt-4 font-bold">Your Bookmarked Recipes:</h4>
                <ul>
                    {bookmarks.length > 0 ? (
                        bookmarks.map((bookmark) => (
                            <li
                                key={bookmark.recipe_id} className="my-2 hover:underline cursor-pointer"
                                onClick={() => {
                                    onRecipeSelect(bookmark)
                                    onClose();
                                }}>
                                ✦ {bookmark.recipe_name}
                            </li>
                        ))
                    ) : (
                        <p>No bookmarks yet. Start by adding some recipes!</p>
                    )}
                </ul>
            </div>
        </div>
    );
};
export default Bookmarks;