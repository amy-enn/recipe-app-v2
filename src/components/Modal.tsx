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

  const { selectedRecipe } = context;



  if (!isOpen || !selectedRecipe) return null;

  return (
    <div className="fixed inset-0 bg-cocoa bg-opacity-75 flex items-center justify-center z-50">

      <div className="bg-butter shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">{selectedRecipe.recipe_name}</h2>

        <p>{selectedRecipe.description}</p>

        <h4>Ingredients:</h4>
        <ul>
          {selectedRecipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              ✦ {ingredient.quantity}{" "}
              {ingredient.ingredient_name.toLowerCase()}
            </li>
          ))}
        </ul>

        <h4>Instructions:</h4>
        <ul>
          {selectedRecipe.instructions.map((instruction, index) => (
            <li key={index}>
              ➸ {instruction}
            </li>
          ))}
        </ul>

        <button className="bg-rose border-4 border-cocoa text-black py-1 px-2 rounded hover:scale-105" onClick={onClose}>
          Close
        </button>

      </div>

    </div>
  )
}

export default Modal;