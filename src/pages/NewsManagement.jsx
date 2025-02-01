import React, { useState } from 'react';
import { Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample content data
const sampleContent = [
  {
    id: 1,
    title: 'Breaking News: Global Climate Summit',
    content: 'World leaders gather to discuss critical climate change measures...',
    views: 15342,
    location: 'New York',
    category: 'Politics',
  },
  {
    id: 2,
    title: 'Tech Innovation Conference 2024',
    content: 'Latest advancements in artificial intelligence and robotics...',
    views: 8765,
    location: 'San Francisco',
    category: 'Technology',
  },
  {
    id: 3,
    title: 'Local Sports Team Wins Championship',
    content: 'Hometown heroes secure victory in thrilling match...',
    views: 22456,
    location: 'Chicago',
    category: 'Sports',
  },
  {
    id: 4,
    title: 'New Medical Breakthrough in Cancer Research',
    content: 'Scientists discover promising new treatment approach...',
    views: 11234,
    location: 'Boston',
    category: 'Health',
  },
  {
    id: 5,
    title: 'Global Economic Outlook for 2024',
    content: 'Experts predict significant shifts in international markets...',
    views: 9876,
    location: 'London',
    category: 'Economy',
  },
];

const NewsManagement = () => {
  const [contentData, setContentData] = useState(sampleContent);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contentData.slice(indexOfFirstItem, indexOfLastItem);

  // Action handlers
  const handleView = (id) => {
    alert(`Viewing details for content ID: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Editing content with ID: ${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this content?');
    if (confirmDelete) {
      setContentData(contentData.filter((item) => item.id !== id));
    }
  };

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < Math.ceil(contentData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-red-600 text-white py-4 px-6 shadow-md">
        <h1 className="text-3xl font-bold">News Management</h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3">No.</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Content</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{indexOfFirstItem + index + 1}</td>
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">{item.content}</td>
                  <td className="px-4 py-3">{item.views.toLocaleString()}</td>
                  <td className="px-4 py-3">{item.location}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3 flex justify-center space-x-2">
                    <button onClick={() => handleView(item.id)} className="text-blue-500">
                      <Eye />
                    </button>
                    <button onClick={() => handleEdit(item.id)} className="text-green-500">
                      <Edit />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500">
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center px-4 py-3 bg-gray-100">
            <button onClick={prevPage} disabled={currentPage === 1}>
              <ChevronLeft />
            </button>
            <button onClick={nextPage} disabled={currentPage >= Math.ceil(contentData.length / itemsPerPage)}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default NewsManagement;
