import React, { useState } from 'react';
import { 
  DollarSign, 
  Droplet, 
  Anchor, 
  Truck, 
  Save, 
  Edit 
} from 'lucide-react';

const PriceUpdatePage = () => {
  // State to manage current prices
  const [prices, setPrices] = useState({
    gold: {
      current: 2150.50,
      new: 2150.50
    },
    silver: {
      current: 25.75,
      new: 25.75
    },
    diesel: {
      current: 95.50,
      new: 95.50
    },
    petrol: {
      current: 105.25,
      new: 105.25
    }
  });

  // Handler for price change
  const handlePriceChange = (type, value) => {
    setPrices(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        new: parseFloat(value)
      }
    }));
  };

  // Handler for saving prices
  const handleSavePrice = (type) => {
    // In a real application, this would send an API call
    setPrices(prev => ({
      ...prev,
      [type]: {
        current: prev[type].new,
        new: prev[type].new
      }
    }));
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} price updated successfully!`);
  };

  // Price input component
  const PriceInput = ({ 
    type, 
    label, 
    Icon, 
    unit = '₹/10g', 
    isFuel = false 
  }) => {
    const price = prices[type];
    
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Icon className="mr-2 text-red-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
          </div>
          {isFuel && <span className="text-sm text-gray-500">per liter</span>}
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-600">Current Price</label>
            <input 
              type="text" 
              value={`${price.current} ${unit}`} 
              className="w-full p-2 bg-gray-100 rounded-md cursor-not-allowed" 
              disabled 
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-600">New Price</label>
            <input 
              type="number" 
              step="0.01"
              value={price.new}
              onChange={(e) => handlePriceChange(type, e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="col-span-1 flex items-end">
            <button 
              onClick={() => handleSavePrice(type)}
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
            >
              <Save className="mr-2" size={20} />
              Save
            </button>
          </div>
        </div>
        
        {price.new !== price.current && (
          <div className="mt-2 text-sm text-yellow-600 flex items-center">
            <Edit className="mr-2" size={16} />
            Unsaved changes detected
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
          <Anchor className="mr-3 text-blue-600" size={36} />
          Price Management Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Metals Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Metals Pricing
            </h2>
            <PriceInput 
              type="gold" 
              label="Gold" 
              Icon={DollarSign} 
            />
            <PriceInput 
              type="silver" 
              label="Silver" 
              Icon={DollarSign} 
            />
          </div>

          {/* Fuels Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Fuel Pricing
            </h2>
            <PriceInput 
              type="diesel" 
              label="Diesel" 
              Icon={Truck} 
              unit="₹/ltr"
              isFuel={true}
            />
            <PriceInput 
              type="petrol" 
              label="Petrol" 
              Icon={Droplet} 
              unit="₹/ltr"
              isFuel={true}
            />
          </div>
        </div>

        {/* Global Update Section */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Bulk Update Options
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">
              Reset to Default
            </button>
            <button className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-colors">
              Copy Last Prices
            </button>
            <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors">
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceUpdatePage;