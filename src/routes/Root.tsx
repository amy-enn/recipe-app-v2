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
    <div className="bg-caramel flex flex-col items-center min-h-screen">

      <h1 className="text-3xl font-bold my-4">My Recipes V2</h1>
      <a className="bg-vanilla border-4 border-peach text-black py-1 px-2 my-4 rounded hover:scale-105">
        GitHub
      </a>

      <RecipeList onRecipeSelect={selectRecipe} />


      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  )
}

