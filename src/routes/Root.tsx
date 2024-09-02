import { useState, useContext } from "react";
import Modal from "../components/Modal";
import RecipeList from "../components/RecipeList";
import { RecipeContext, Recipe } from "../context/RecipeContext";

export default function Root() {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error('RecipeContext must be used within a RecipeProvider');
  }
  const { setSelectedRecipe } = context;

  const selectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-caramel flex flex-col items-center h-screen">

      <h1 className="text-3xl">Recipe App V2</h1>

      <RecipeList onRecipeSelect={selectRecipe} />

      {/* <button className="bg-rose border-4 border-cocoa text-black py-1 px-2 rounded hover:scale-105" onClick={() => setIsModalOpen(true)}>
            Modal
        </button> */}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  )
}

