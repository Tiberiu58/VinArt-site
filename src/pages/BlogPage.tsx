import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BlogPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: 'Ghidul Colecționarului de Vinuri: Cum să Îți Construiești Prima Colecție',
      excerpt: 'Descoperă secretele colecționării vinurilor premium și cum să investești inteligent în vinuri de calitate.',
      category: 'guide',
      author: 'Alexandru Vintilă',
      date: '2025-01-10',
      readTime: '8 min',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
    },
    {
      id: 2,
      title: 'Interviu cu Maria Ionescu: Arta Contemporană pe Sticle de Vin',
      excerpt: 'O conversație fascinantă cu una dintre artistele noastre principale despre procesul creativ și inspirația din spatele lucrărilor sale.',
      category: 'interview',
      author: 'Maria Cristescu',
      date: '2025-01-08',
      readTime: '12 min',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
    },
    {
      id: 3,
      title: 'Regiunile Viticole din România: O Călătorie prin Tradițiile Locale',
      excerpt: 'Explorează bogăția și diversitatea vinurilor românești, de la Dealu Mare până în Oltenia.',
      category: 'education',
      author: 'Gheorghe Munteanu',
      date: '2025-01-05',
      readTime: '15 min',
      image: 'https://images.pexels.com/photos/3009020/pexels-photo-3009020.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
    },
    {
      id: 4,
      title: 'Cum să Organizezi o Degustare de Vinuri Perfectă',
      excerpt: 'Sfaturi de la experți pentru organizarea unei degustări memorable, de la selecția vinurilor la acordajele culinare.',
      category: 'guide',
      author: 'Alexandru Vintilă',
      date: '2025-01-03',
      readTime: '10 min',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
    },
  ];

  const categories = [
    { id: 'all', name: 'Toate Articolele', count: blogPosts.length },
    { id: 'guide', name: 'Ghiduri', count: blogPosts.filter(p => p.category === 'guide').length },
    { id: 'interview', name: 'Interviuri', count: blogPosts.filter(p => p.category === 'interview').length },
    { id: 'education', name: 'Educațional', count: blogPosts.filter(p => p.category === 'education').length },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Articole educative, ghiduri pentru colecționari și interviuri exclusive cu artiștii noștri
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Caută articole..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-yellow-300 hover:text-yellow-600'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{category.name}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Article */}
        {featuredPost && selectedCategory === 'all' && !searchTerm && (
          <div className="mb-16">
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-2 mb-4">
                    <Tag className="h-4 w-4 text-yellow-600" />
                    <span className="text-yellow-600 font-medium text-sm uppercase tracking-wide">
                      Articol Recomandat
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span className="text-sm">{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{featuredPost.date}</span>
                      </div>
                      <span className="text-sm">{featuredPost.readTime} citire</span>
                    </div>
                  </div>
                  <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 w-fit">
                    <span>Citește Articolul</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
                <div className="relative h-96 lg:h-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category === 'guide' ? 'Ghid' :
                   post.category === 'interview' ? 'Interviu' :
                   post.category === 'education' ? 'Educațional' : post.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-yellow-600 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <span>{post.readTime} citire</span>
                </div>
                
                <button className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200 group">
                  <span>Citește mai mult</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <Search className="h-16 w-16 text-gray-300 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Nu am găsit articole
              </h3>
              <p className="text-gray-600">
                Încearcă să modifici filtrele sau termenii de căutare.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;