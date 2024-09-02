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
        <p className="text-cocoa mb-6">Cupcake ipsum dolor sit amet halvah lemon drops donut sweet roll. Cheesecake cotton candy muffin cake biscuit jelly-o. Marzipan sugar plum cake apple pie cake muffin croissant donut danish.</p>
        <button className="bg-rose border-4 border-cocoa text-black py-1 px-2 rounded hover:scale-105" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal;