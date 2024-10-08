import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error('RecipeContext must be used within a RecipeProvider');
  }

  const { selectedRecipe, addBookmark, bookmarks } = context;



  if (!isOpen || !selectedRecipe) return null;

  const isBookmarked = bookmarks.some((recipe) => recipe.recipe_id === selectedRecipe.recipe_id);

  const handleBookmarkClick = () => {
    addBookmark(selectedRecipe);
  };

  return (
    <div className="fixed inset-0 bg-cocoa bg-opacity-75 flex items-center justify-center z-50">

      <div className="bg-butter border-4 border-peach shadow-lg p-8 max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <div className="flex flex-row justify-between items-center">

          <div className="flex flex-row items-center">

            <button
              className={`${isBookmarked ? 'text-yellow-500' : 'text-black'} text-3xl hover:scale-105 mr-2`}
              onClick={handleBookmarkClick}
            >
              ★
            </button>
            <h2 className="text-3xl font-bold">{selectedRecipe.recipe_name}</h2>
          </div>

          <button className="border-4 bg-vanilla border-peach text-black text-lg font-bold py-1 px-2 rounded hover:scale-105 shadow-xl" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="flex flex-col items-center">
          <img className="rounded-full border-4 border-peach mb-4" src=
            {"/recipes/" + selectedRecipe.imageUrl} />
        </div>

        <p className="italic">{selectedRecipe.description}</p>

        <h4 className="text-lg mt-4 font-bold">Ingredients:</h4>
        <ul>
          {selectedRecipe.ingredients.map((ingredient, index) => (
            <li key={index} className="my-2">
              ✦ {ingredient.quantity}{" "}
              {ingredient.ingredient_name.toLowerCase()}
            </li>
          ))}
        </ul>

        <h4 className="text-lg mt-4 font-bold">Instructions:</h4>
        <ul>
          {selectedRecipe.instructions.map((instruction, index) => (
            <li key={index} className="my-2">
              ➸ {instruction}
            </li>
          ))}
        </ul>

      </div>

    </div>
  )
}

export default Modal;