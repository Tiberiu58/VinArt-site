import React, { useState } from 'react';
import { Heart, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CollectionsPage: React.FC = () => {
  const { t } = useLanguage();

  const products = [
    {
      id: 1,
      name: 'Merlot Picasso Collection',
      category: 'limited',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
      artist: 'Maria Ionescu',
      year: '2020',
      rating: 4.9,
      reviews: 127,
      isLimited: true,
      description: 'Vin Merlot premium cu sticlă pictată manual în stilul Picasso',
    },
    {
      id: 2,
      name: 'Cabernet Sauvignon Gold',
      category: 'standard',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
      artist: 'Andrei Popescu',
      year: '2021',
      rating: 4.7,
      reviews: 89,
      isLimited: false,
      description: 'Cabernet Sauvignon de calitate superioară cu design elegant',
    },
    {
      id: 3,
      name: 'Corporate Elegance Set',
      category: 'corporate',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
      artist: 'Design personalizat',
      year: '2024',
      rating: 5.0,
      reviews: 45,
      isLimited: false,
      description: 'Set de vinuri premium personalizabile pentru evenimente corporate',
    },
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
            {t('collections.title')}
          </h1>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 lg:flex"
              >
                <div className="relative overflow-hidden lg:w-1/3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {product.isLimited && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Ediție Limitată
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110">
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                <div className="p-8 lg:w-2/3 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 font-medium">{product.artist}</span>
                    <span className="text-sm text-gray-500">{product.year}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      {product.rating} ({product.reviews} recenzii)
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div></div>
                    <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      Adaugă în Coș
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Fix for missing Star import
const Star: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

export default CollectionsPage;