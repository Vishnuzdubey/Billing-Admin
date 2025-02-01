import React, { useState } from 'react';
import { 
  Upload, 
  Edit, 
  Trash2, 
  Image as ImageIcon 
} from 'lucide-react';

const AdsManagement = () => {
  // State for form inputs
  const [adType, setAdType] = useState('right-side');
  const [adTitle, setAdTitle] = useState('');
  const [adCategory, setAdCategory] = useState('');
  const [adDescription, setAdDescription] = useState('');
  const [adImage, setAdImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // State for ads list
  const [adsList, setAdsList] = useState([]);

  // State for editing
  const [editingAd, setEditingAd] = useState(null);

  // Ad Categories
  const categories = [
    'News', 
    'Sports', 
    'Entertainment', 
    'Technology', 
    'Lifestyle'
  ];

  // Image upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    
    // Validate file type
    if (file && file.type.startsWith('image/')) {
      setAdImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file');
      e.target.value = null;
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!adTitle || !adCategory || !adDescription || !adImage) {
      alert('Please fill in all fields and upload an image');
      return;
    }

    const newAd = {
      id: editingAd ? editingAd.id : Date.now(),
      type: adType,
      title: adTitle,
      category: adCategory,
      description: adDescription,
      image: imagePreview
    };

    if (editingAd) {
      // Update existing ad
      setAdsList(adsList.map(ad => 
        ad.id === editingAd.id ? newAd : ad
      ));
      setEditingAd(null);
    } else {
      // Add new ad
      setAdsList([...adsList, newAd]);
    }

    // Reset form
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setAdTitle('');
    setAdCategory('');
    setAdDescription('');
    setAdImage(null);
    setImagePreview(null);
    setEditingAd(null);
  };

  // Edit ad handler
  const handleEdit = (ad) => {
    setEditingAd(ad);
    setAdType(ad.type);
    setAdTitle(ad.title);
    setAdCategory(ad.category);
    setAdDescription(ad.description);
    setImagePreview(ad.image);
  };

  // Delete ad handler
  const handleDelete = (adId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this ad?');
    if (confirmDelete) {
      setAdsList(adsList.filter(ad => ad.id !== adId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Ads Management
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Ad Upload Form */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <form onSubmit={handleSubmit}>
              {/* Ad Type Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Ad Type
                </label>
                <select
                  value={adType}
                  onChange={(e) => setAdType(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="right-side">Right Side Ad</option>
                  <option value="left-side">Left Side Ad</option>
                  <option value="front-banner">Front Banner Ad</option>
                </select>
              </div>

              {/* Ad Title */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Ad Title
                </label>
                <input
                  type="text"
                  value={adTitle}
                  onChange={(e) => setAdTitle(e.target.value)}
                  placeholder="Enter ad title"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Ad Category */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Ad Category
                </label>
                <select
                  value={adCategory}
                  onChange={(e) => setAdCategory(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ad Description */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Ad Description
                </label>
                <textarea
                  value={adDescription}
                  onChange={(e) => setAdDescription(e.target.value)}
                  placeholder="Enter ad description"
                  rows="4"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Upload Ad Image
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="ad-image-upload"
                  />
                  <label 
                    htmlFor="ad-image-upload"
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                  >
                    <Upload className="mr-2" />
                    Choose File
                  </label>
                </div>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Image Preview
                  </label>
                  <img 
                    src={imagePreview} 
                    alt="Ad Preview" 
                    className="max-w-full h-auto rounded-md shadow-md"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-3 bg-[#DD2B2B] text-white rounded-md hover:bg-red-700 transition-colors"
              >
                {editingAd ? 'Update Ad' : 'Add Ad'}
              </button>
            </form>
          </div>

          {/* Ads Table */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Current Ads
            </h2>
            {adsList.length === 0 ? (
              <p className="text-gray-500 text-center">No ads uploaded yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Ad Type</th>
                      <th className="p-3 text-left">Title</th>
                      <th className="p-3 text-left">Category</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adsList.map(ad => (
                      <tr 
                        key={ad.id} 
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-3">{ad.type}</td>
                        <td className="p-3">{ad.title}</td>
                        <td className="p-3">{ad.category}</td>
                        <td className="p-3 flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(ad)}
                            className="text-blue-500 hover:bg-blue-100 p-2 rounded-full"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(ad.id)}
                            className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                          >
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsManagement;