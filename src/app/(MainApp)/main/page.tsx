"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Card from "@/components/videoCard/Card";
import CategorySlider from "@/sections/categoryslider/categorySlider";
import LineMain from "@/components/lineMain/LineMain";
import { Video } from "@/types/video";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Ошибка загрузки данных");
  }
  const data = await response.json();
  return data;
};

const MainPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const { data: categories, error: categoryError } = useSWR("http://Flixx/src/api/getCategories.php", fetcher);
  const { data: videos, error: videoError } = useSWR(
    `http://Flixx/src/api/getVideosByCategory.php?category_id=${selectedCategory}`, 
    fetcher
  );

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  if (categoryError) {
    return <div>Ошибка загрузки категорий: {categoryError.message}</div>;
  }

  if (videoError) {
    return <div>Ошибка загрузки данных: {videoError.message}</div>;
  }

  return (
    <>
      {categories && (
        <CategorySlider categories={categories} onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
      )}
      <LineMain />
      <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5 gap-4 m-8">
        {videos && videos.map((video: Video) => (
          <Card key={video.id} video={video} />
        ))}
      </div>
    </>
  );
};

export default MainPage;
