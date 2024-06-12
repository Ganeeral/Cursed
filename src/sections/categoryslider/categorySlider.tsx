"use client";

import React from "react";

interface Category {
  id: number;
  name: string;
}

interface CategorySliderProps {
  categories: Category[];
  onCategoryChange: (categoryId: number) => void;
  selectedCategory: number | null;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ categories, onCategoryChange, selectedCategory }) => {
  const handleCategoryClick = (categoryId: number) => {
    onCategoryChange(categoryId);
  };

  return (
    <div className="category flex mt-[80px]">
      <div className="max-w-[100vw] overflow-hidden flix:max-w-[85vw]">
        <div className="flex items-center justify-between px-4">
          <div className="flex gap-x-6 rounded-[4px] overflow-auto scrollbar-hide relative">
            {categories.map((category, index) => (
              <div key={index} className="flex-shrink-0">
                <div
                  className={`cursor-pointer px-4 py-2 rounded-[6px] ${
                    selectedCategory === category.id
                      ? "bg-btnActive text-white"
                      : "bg-[#535353] text-white hover:bg-[#444444] duration-300"
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span>{category.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
