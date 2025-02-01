import React, { useState } from 'react';

const Addnews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [writer, setWriter] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', { title, content, category, location, writer, image });
  };

  const isFormValid = 
    title.trim() !== '' && 
    content.trim() !== '' && 
    category !== '' && 
    location !== '' && 
    writer.trim() !== '';

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-6 px-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">Add News Article</h1>

        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter the title of the news article"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Content Textarea */}
        <div>
          <label htmlFor="content" className="block font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            placeholder="Enter the content of the news article"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          ></textarea>
        </div>

        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Select a category</option>
            <option value="politics">Politics</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="technology">Technology</option>
          </select>
        </div>

        {/* Location Dropdown */}
        <div>
          <label htmlFor="location" className="block font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Select a location</option>
            <option value="uttar pardesh">Uttar Pardesh</option>
            <option value="gorakhpur">Gorakhpur</option>
            <option value="delhi">Delhi</option>
            <option value="bihar">Bihar</option>
            <option value="utrakhand">Utrakhand</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block font-medium text-gray-700 mb-2">
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Writer Input */}
        <div>
          <label htmlFor="writer" className="block font-medium text-gray-700 mb-2">
            Writer
          </label>
          <input
            type="text"
            id="writer"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            required
            placeholder="Enter the writer's name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3 px-6 rounded-md font-medium transition-colors duration-300 ${
            isFormValid
              ? 'bg-[#DD2B2B] text-white hover:bg-red-700 active:scale-95'
              : 'bg-[#DD2B2B] text-gray-700 cursor-not-allowed'
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addnews;
