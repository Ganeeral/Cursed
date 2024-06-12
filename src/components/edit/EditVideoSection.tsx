"use client";

// components/edit/EditVideoSection.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface Video {
  title: string;
  description: string;
  preview: File | string;
}

interface Props {
  id: string;
}

const EditVideo: React.FC<Props> = ({ id }) => {
  const [video, setVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    preview: '',
  });

  useEffect(() => {
    fetchVideo(id);
  }, [id]);

  const fetchVideo = async (id: string) => {
    try {
      const response = await fetch(`http://flixx/src/api/getVideos?id=${id}`);
      const data = await response.json();
      setVideo(data);
      setFormData({
        title: data.title,
        description: data.description,
        preview: data.preview,
      });
    } catch (error) {
      console.error('Ошибка поиска видео:', error);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`http://flixx/src/api/editVideo?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Ошибка редактирования видео:', error);
    }
  };

  if (!video) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h1>Edit Video</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="preview"
          value={formData.preview}
          onChange={handleFormChange}
        />
        <button type="submit">Обновить</button>
      </form>
    </div>
  );
};

export default EditVideo;
