import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit, Package, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function App() {
  const [activeTab, setActiveTab] = useState('items');
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: 0
  });
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [restockAmount, setRestockAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters,setFilters] = useState("all")
  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get(`${API_URL}/items`);
    setItems(response.data);
  };

  const fetchCategories = async () => {
    const response = await axios.get(`${API_URL}/categories`);
    setCategories(response.data);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/items`, newItem);
    setNewItem({ name: '', category: '', quantity: 0});
    fetchItems();
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/categories`, newCategory);
    setNewCategory({ name: '' });
    fetchCategories();
  };

  const handleRestock = async (itemId) => {
    await axios.post(`${API_URL}/items/${itemId}/restock`, { amount: parseInt(restockAmount) });
    setRestockAmount(0);
    setSelectedItem(null);
    fetchItems();
  };

  const handleWithdraw = async (itemId) => {
    await axios.post(`${API_URL}/items/${itemId}/withdraw`, { amount: parseInt(withdrawAmount) });
    setWithdrawAmount(0);
    setSelectedItem(null);
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Package className="mr-2" /> Inventory Management System
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-4 px-6 font-medium text-sm ${activeTab === 'items' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('items')}
          >
            Items
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm ${activeTab === 'categories' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-6"
          >
            {activeTab === 'items' ? (
              <div className="space-y-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-medium mb-4">Add New Item</h2>
                  <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Quantity</label>
                      <input
                        type="number"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Item
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-5">
                    <h2 className="text-lg font-medium">Inventory Items</h2>
                    <div className="">
                      <select name="Category" id="" defaultValue="all" onChange={(e)=>{setFilters(e.target.value)}} className='w-25 h-7'>
                        <option value="all">All</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {items.filter(e=>{
                      if(filters == 'all')
                        return true
                      return e.category==filters
                    }).map((item) => (
                      <div key={item.id} className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.category}</p>
                            <p className="mt-1 text-sm">
                              <span className="font-medium">Quantity:</span> {item.quantity}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                              className="p-2 text-blue-600 hover:text-blue-800"
                            >
                              {selectedItem === item.id ? <ChevronUp /> : <ChevronDown />}
                            </button>
                          </div>
                        </div>

                        {selectedItem === item.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-200"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-medium text-blue-800 mb-2">Restock Item</h4>
                                <div className="flex space-x-2">
                                  <input
                                    type="number"
                                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Amount"
                                    value={restockAmount}
                                    onChange={(e) => setRestockAmount(e.target.value)}
                                  />
                                  <button
                                    onClick={() => handleRestock(item.id)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                  >
                                    Restock
                                  </button>
                                </div>
                              </div>

                              <div className="bg-red-50 p-4 rounded-lg">
                                <h4 className="font-medium text-red-800 mb-2">Withdraw Item</h4>
                                <div className="flex space-x-2">
                                  <input
                                    type="number"
                                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Amount"
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                  />
                                  <button
                                    onClick={() => handleWithdraw(item.id)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  >
                                    Withdraw
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-medium mb-4">Add New Category</h2>
                  <form onSubmit={handleAddCategory} className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Category
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium">Categories</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {categories.map((category) => (
                      <div key={category.id} className="p-6 flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium">{category.name}</h3>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-red-600 hover:text-red-800">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;