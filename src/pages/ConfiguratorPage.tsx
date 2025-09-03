import React, { useState, useEffect } from 'react';
import { RotateCcw, Share2, Heart, ShoppingCart, Palette, Type, Upload, Sparkles, RotateCw, ZoomIn, ZoomOut, Download, Save, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ConfiguratorPage: React.FC = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedWine, setSelectedWine] = useState('merlot');
  const [selectedRegion, setSelectedRegion] = useState('bordeaux');
  const [selectedColor, setSelectedColor] = useState('deep-red');
  const [selectedArtist, setSelectedArtist] = useState('maria-ionescu');
  const [selectedArtStyle, setSelectedArtStyle] = useState('abstract');
  const [selectedLabel, setSelectedLabel] = useState('classic');
  const [selectedCap, setSelectedCap] = useState('gold');
  const [customText, setCustomText] = useState('');
  const [selectedFont, setSelectedFont] = useState('playfair');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bottleRotation, setBottleRotation] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isRotating, setIsRotating] = useState(false);

  const wines = [
    {
      id: 'merlot',
      name: 'Merlot Premium',
      type: 'Roșu',
      price: 85,
      description: 'Vin roșu robust cu note de fructe negre și tannini catifelați',
      color: '#722F37',
      region: 'Bordeaux',
    },
    {
      id: 'cabernet',
      name: 'Cabernet Sauvignon',
      type: 'Roșu',
      price: 95,
      description: 'Vin elegant cu tannini fermi și aromă complexă',
      color: '#8B0000',
      region: 'Bordeaux',
    },
    {
      id: 'chardonnay',
      name: 'Chardonnay Reserve',
      type: 'Alb',
      price: 75,
      description: 'Vin alb complex cu note minerale și vanilie',
      color: '#F5DEB3',
      region: 'Burgundy',
    },
    {
      id: 'champagne',
      name: 'Champagne Prestige',
      type: 'Spumant',
      price: 150,
      description: 'Spumant elegant cu bule fine și aromă persistentă',
      color: '#FFF8DC',
      region: 'Champagne',
    },
  ];

  const regions = [
    { id: 'bordeaux', name: 'Bordeaux', country: 'Franța', premium: 0 },
    { id: 'burgundy', name: 'Burgundy', country: 'Franța', premium: 20 },
    { id: 'champagne', name: 'Champagne', country: 'Franța', premium: 50 },
    { id: 'tuscany', name: 'Toscana', country: 'Italia', premium: 30 },
    { id: 'rioja', name: 'Rioja', country: 'Spania', premium: 15 },
    { id: 'dealu-mare', name: 'Dealu Mare', country: 'România', premium: 0 },
  ];

  const bottleColors = [
    { id: 'deep-red', name: 'Roșu Închis', color: '#8B0000', premium: 0 },
    { id: 'forest-green', name: 'Verde Pădure', color: '#228B22', premium: 10 },
    { id: 'midnight-blue', name: 'Albastru Miezul Nopții', color: '#191970', premium: 15 },
    { id: 'classic-black', name: 'Negru Clasic', color: '#1A1A1A', premium: 20 },
    { id: 'antique-gold', name: 'Auriu Antic', color: '#D4AF37', premium: 25 },
    { id: 'pearl-white', name: 'Alb Perlat', color: '#F8F8FF', premium: 15 },
  ];

  const artists = [
    {
      id: 'maria-ionescu',
      name: 'Maria Ionescu',
      specialty: 'Abstract Modern',
      price: 120,
      description: 'Artistă contemporană specializată în forme geometrice și culori vibrante',
      pattern: 'linear-gradient(45deg, #FFD700, #FF6B6B, #4ECDC4)',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 'andrei-popescu',
      name: 'Andrei Popescu',
      specialty: 'Floral Elegant',
      price: 150,
      description: 'Maestru în motive florale delicate și rafinate',
      pattern: 'linear-gradient(135deg, #667eea, #764ba2)',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 'elena-radu',
      name: 'Elena Radu',
      specialty: 'Geometric Minimalist',
      price: 100,
      description: 'Specialist în linii curate și forme geometrice simple',
      pattern: 'linear-gradient(90deg, #74b9ff, #0984e3)',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 'gheorghe-marin',
      name: 'Gheorghe Marin',
      specialty: 'Vintage Classic',
      price: 180,
      description: 'Maestru în design clasic cu elemente vintage autentice',
      pattern: 'linear-gradient(45deg, #D4AF37, #B8860B)',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const labelStyles = [
    { id: 'classic', name: 'Clasic', preview: 'Etichetă tradițională elegantă', premium: 0 },
    { id: 'modern', name: 'Modern', preview: 'Design contemporan minimalist', premium: 15 },
    { id: 'luxury', name: 'Luxury', preview: 'Etichetă premium cu folio auriu', premium: 35 },
    { id: 'artistic', name: 'Artistic', preview: 'Etichetă integrată în design', premium: 25 },
  ];

  const capStyles = [
    { id: 'gold', name: 'Auriu', color: '#D4AF37', premium: 0 },
    { id: 'silver', name: 'Argintiu', color: '#C0C0C0', premium: 5 },
    { id: 'black', name: 'Negru', color: '#1A1A1A', premium: 10 },
    { id: 'copper', name: 'Aramiu', color: '#B87333', premium: 15 },
  ];

  const fonts = [
    { id: 'playfair', name: 'Playfair Display', style: 'font-serif', preview: 'Elegant & Classic' },
    { id: 'montserrat', name: 'Montserrat', style: 'font-sans', preview: 'Modern & Clean' },
    { id: 'script', name: 'Dancing Script', style: 'font-cursive', preview: 'Artistic & Personal' },
  ];

  const steps = [
    { id: 1, title: 'Alege Vinul', description: 'Selectează tipul și regiunea' },
    { id: 2, title: 'Alege Artistul', description: 'Stilul artistic și designul' },
    { id: 3, title: 'Personalizează', description: 'Text, logo și detalii finale' },
  ];

  const getTotalPrice = () => {
    const winePrice = wines.find(w => w.id === selectedWine)?.price || 0;
    const regionPrice = regions.find(r => r.id === selectedRegion)?.premium || 0;
    const colorPrice = bottleColors.find(c => c.id === selectedColor)?.premium || 0;
    const artistPrice = artists.find(a => a.id === selectedArtist)?.price || 0;
    const labelPrice = labelStyles.find(l => l.id === selectedLabel)?.premium || 0;
    const capPrice = capStyles.find(c => c.id === selectedCap)?.premium || 0;
    const customizationPrice = customText ? 25 : 0;
    const logoPrice = logoFile ? 50 : 0;
    
    return winePrice + regionPrice + colorPrice + artistPrice + labelPrice + capPrice + customizationPrice + logoPrice;
  };

  const selectedWineData = wines.find(w => w.id === selectedWine);
  const selectedColorData = bottleColors.find(c => c.id === selectedColor);
  const selectedArtistData = artists.find(a => a.id === selectedArtist);
  const selectedRegionData = regions.find(r => r.id === selectedRegion);
  const selectedLabelData = labelStyles.find(l => l.id === selectedLabel);
  const selectedCapData = capStyles.find(c => c.id === selectedCap);

  const handleSaveDesign = () => {
    const design = {
      wine: selectedWine,
      region: selectedRegion,
      color: selectedColor,
      artist: selectedArtist,
      label: selectedLabel,
      cap: selectedCap,
      customText,
      font: selectedFont,
      logo: logoFile?.name,
      totalPrice: getTotalPrice(),
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem('savedWineDesign', JSON.stringify(design));
    alert('Design salvat cu succes!');
  };

  const handleEmailDesign = () => {
    // In a real implementation, this would send the design via email
    alert('Design-ul va fi trimis pe email în curând!');
  };

  const handleExportImage = () => {
    // In a real implementation, this would export the 3D render
    alert('Imaginea va fi descărcată în curând!');
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar Panel */}
        <div className="w-96 bg-white shadow-2xl overflow-y-auto border-r border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h1 className="text-2xl font-bold text-gray-900 font-serif mb-2">
              Personalizează Sticla
            </h1>
            <p className="text-gray-600 text-sm">
              Creează o operă de artă unică
            </p>
            
            {/* Progress Steps */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                {steps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <button
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        currentStep >= step.id
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step.id}
                    </button>
                    <div className="text-xs text-gray-600 mt-1 text-center max-w-20">
                      {step.title}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex mt-2">
                <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  currentStep >= 2 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gray-200'
                }`} />
                <div className={`h-1 flex-1 rounded-full ml-2 transition-all duration-500 ${
                  currentStep >= 3 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gray-200'
                }`} />
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6">
            {/* Step 1: Wine Selection */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 font-serif">
                    Alege Vinul
                  </h3>
                  <div className="space-y-3">
                    {wines.map((wine) => (
                      <button
                        key={wine.id}
                        onClick={() => setSelectedWine(wine.id)}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedWine === wine.id
                            ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                            : 'border-gray-200 hover:border-yellow-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-12 h-12 rounded-lg shadow-inner"
                            style={{ backgroundColor: wine.color }}
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-bold text-gray-900">{wine.name}</div>
                                <div className="text-sm text-gray-600">{wine.type} • {wine.region}</div>
                              </div>
                              <div className="text-yellow-600 font-bold">{wine.price} €</div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{wine.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 font-serif">
                    Regiunea Viticolă
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {regions.map((region) => (
                      <button
                        key={region.id}
                        onClick={() => setSelectedRegion(region.id)}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 text-center ${
                          selectedRegion === region.id
                            ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                            : 'border-gray-200 hover:border-yellow-300'
                        }`}
                      >
                        <div className="font-medium text-gray-900 text-sm">{region.name}</div>
                        <div className="text-xs text-gray-600">{region.country}</div>
                        {region.premium > 0 && (
                          <div className="text-xs text-yellow-600 font-medium">+{region.premium} €</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 font-serif">
                    Culoarea Sticlei
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {bottleColors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={`group relative p-3 rounded-lg border-2 transition-all duration-300 ${
                          selectedColor === color.id
                            ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                            : 'border-gray-200 hover:border-yellow-300'
                        }`}
                      >
                        <div 
                          className="w-8 h-8 rounded-full mx-auto mb-2 shadow-lg border border-gray-200"
                          style={{ backgroundColor: color.color }}
                        />
                        <div className="text-xs font-medium text-gray-700 text-center">
                          {color.name}
                        </div>
                        {color.premium > 0 && (
                          <div className="text-xs text-yellow-600 font-medium text-center">
                            +{color.premium} €
                          </div>
                        )}
                        {selectedColor === color.id && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Continuă la Artist
                </button>
              </div>
            )}

            {/* Step 2: Artist Selection */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 font-serif">
                    Alege Artistul
                  </h3>
                  <div className="space-y-4">
                    {artists.map((artist) => (
                      <button
                        key={artist.id}
                        onClick={() => setSelectedArtist(artist.id)}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedArtist === artist.id
                            ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                            : 'border-gray-200 hover:border-yellow-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <img
                            src={artist.image}
                            alt={artist.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-bold text-gray-900">{artist.name}</div>
                                <div className="text-sm text-gray-600">{artist.specialty}</div>
                              </div>
                              <div className="text-yellow-600 font-bold">+{artist.price} €</div>
                            </div>
                          </div>
                        </div>
                        <div 
                          className="w-full h-16 rounded-lg mb-2"
                          style={{ background: artist.pattern }}
                        />
                        <p className="text-xs text-gray-600">{artist.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 font-serif">
                    Stilul Etichetei
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {labelStyles.map((label) => (
                      <button
                        key={label.id}
                        onClick={() => setSelectedLabel(label.id)}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 text-center ${
                          selectedLabel === label.id
                            ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                            : 'border-gray-200 hover:border-yellow-300'
                        }`}
                      >
                        <div className="w-12 h-8 bg-gray-100 rounded mx-auto mb-2 flex items-center justify-center">
                          <div className="w-8 h-6 bg-white border border-gray-300 rounded text-xs flex items-center justify-center">
                            L
                          </div>
                        </div>
                        <div className="font-medium text-gray-900 text-xs">{label.name}</div>
                        {label.premium > 0 && (
                          <div className="text-xs text-yellow-600 font-medium">+{label.premium} €</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 font-serif">
                    Culoarea Capacului
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {capStyles.map((cap) => (
                      <button
                        key={cap.id}
                        onClick={() => setSelectedCap(cap.id)}
                        className={`p-2 rounded-lg border-2 transition-all duration-300 text-center ${
                          selectedCap === cap.id
                            ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                            : 'border-gray-200 hover:border-yellow-300'
                        }`}
                      >
                        <div 
                          className="w-6 h-6 rounded-full mx-auto mb-1 shadow-inner border border-gray-200"
                          style={{ backgroundColor: cap.color }}
                        />
                        <div className="text-xs font-medium text-gray-700">{cap.name}</div>
                        {cap.premium > 0 && (
                          <div className="text-xs text-yellow-600">+{cap.premium} €</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300"
                  >
                    Înapoi
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Personalizează
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Personalization */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 font-serif">
                    Text Personalizat
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="ex: Pentru Maria, cu dragoste"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        maxLength={50}
                      />
                      <div className="text-right text-xs text-gray-500 mt-1">
                        {customText.length}/50 caractere
                      </div>
                      {customText && (
                        <div className="text-sm text-yellow-600 font-medium mt-1">
                          +25 € pentru text personalizat
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Stilul fontului
                      </label>
                      <div className="space-y-2">
                        {fonts.map((font) => (
                          <button
                            key={font.id}
                            onClick={() => setSelectedFont(font.id)}
                            className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                              selectedFont === font.id
                                ? 'border-yellow-400 bg-yellow-50'
                                : 'border-gray-200 hover:border-yellow-300'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className={`text-lg ${font.style} text-gray-900`}>{font.name}</div>
                                <div className="text-xs text-gray-500">{font.preview}</div>
                              </div>
                              <div className={`text-2xl ${font.style} text-gray-700`}>Aa</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 font-serif">
                    Logo Companie
                  </h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-yellow-400 transition-colors duration-300">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2 text-sm">Încarcă logo-ul companiei</p>
                    <p className="text-xs text-gray-500 mb-3">PNG, JPG, SVG până la 5MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 text-sm"
                    >
                      Selectează Fișier
                    </label>
                  </div>
                  
                  {logoFile && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                            <Upload className="h-3 w-3 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium text-green-800 text-sm">{logoFile.name}</div>
                            <div className="text-xs text-green-600">+50 € pentru logo personalizat</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setLogoFile(null)}
                          className="text-green-600 hover:text-green-800 transition-colors duration-200"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300"
                  >
                    Înapoi
                  </button>
                  <button
                    onClick={() => {/* Complete configuration */}}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Finalizează
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Price Summary */}
          <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-white">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Vin de bază:</span>
                <span className="font-medium text-gray-900">{selectedWineData?.price} €</span>
              </div>
              {selectedRegionData?.premium > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Regiunea {selectedRegionData.name}:</span>
                  <span className="font-medium text-gray-900">+{selectedRegionData.premium} €</span>
                </div>
              )}
              {selectedColorData?.premium > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Culoare sticlă:</span>
                  <span className="font-medium text-gray-900">+{selectedColorData.premium} €</span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Design artistic:</span>
                <span className="font-medium text-gray-900">+{selectedArtistData?.price} €</span>
              </div>
              {customText && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Text personalizat:</span>
                  <span className="font-medium text-gray-900">+25 €</span>
                </div>
              )}
              {logoFile && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Logo companie:</span>
                  <span className="font-medium text-gray-900">+50 €</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-yellow-600">{getTotalPrice()} €</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Include TVA • Timp realizare: 7-14 zile
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main 3D Preview Area */}
        <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          {/* 3D Controls */}
          <div className="absolute top-6 right-6 z-10 flex flex-col space-y-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2 flex space-x-2">
              <button
                onClick={() => setBottleRotation(prev => prev - 90)}
                className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-200"
                title="Rotește stânga"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              <button
                onClick={() => setBottleRotation(prev => prev + 90)}
                className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-200"
                title="Rotește dreapta"
              >
                <RotateCw className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isRotating 
                    ? 'text-yellow-600 bg-yellow-50' 
                    : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                }`}
                title="Auto-rotație"
              >
                <Sparkles className="h-5 w-5" />
              </button>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2 flex flex-col space-y-2">
              <button
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2))}
                className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-200"
                title="Zoom in"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.5))}
                className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-200"
                title="Zoom out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-6 left-6 z-10 flex space-x-2">
            <button
              onClick={handleSaveDesign}
              className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-yellow-600 p-3 rounded-lg shadow-lg transition-all duration-200 flex items-center space-x-2"
              title="Salvează designul"
            >
              <Save className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-medium">Salvează</span>
            </button>
            <button
              onClick={handleEmailDesign}
              className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-yellow-600 p-3 rounded-lg shadow-lg transition-all duration-200 flex items-center space-x-2"
              title="Trimite pe email"
            >
              <Mail className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-medium">Email</span>
            </button>
            <button
              onClick={handleExportImage}
              className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-yellow-600 p-3 rounded-lg shadow-lg transition-all duration-200 flex items-center space-x-2"
              title="Descarcă imagine"
            >
              <Download className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-medium">Export</span>
            </button>
          </div>

          {/* 3D Bottle Preview */}
          <div className="flex items-center justify-center h-full p-8">
            <div className="relative">
              {/* Bottle Container */}
              <div 
                className={`relative transition-all duration-1000 ${isRotating ? 'animate-spin' : ''}`}
                style={{ 
                  transform: `scale(${zoomLevel}) rotateY(${bottleRotation}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Main Bottle */}
                <div className="relative w-48 h-96 mx-auto">
                  {/* Bottle Shadow */}
                  <div className="absolute inset-0 bg-black/20 blur-xl transform translate-y-8 scale-110 rounded-full" />
                  
                  {/* Bottle Body */}
                  <div 
                    className="relative w-full h-full rounded-t-full rounded-b-lg shadow-2xl transition-all duration-500 border-2"
                    style={{ 
                      background: `linear-gradient(180deg, ${selectedColorData?.color}30, ${selectedColorData?.color}60, ${selectedColorData?.color})`,
                      borderColor: `${selectedColorData?.color}80`
                    }}
                  >
                    {/* Bottle Neck */}
                    <div 
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-20 rounded-t-lg shadow-lg"
                      style={{ backgroundColor: selectedColorData?.color }}
                    />
                    
                    {/* Cap */}
                    <div 
                      className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-8 rounded-t-lg shadow-lg border-2 border-gray-300"
                      style={{ backgroundColor: selectedCapData?.color }}
                    />
                    
                    {/* Art Pattern Overlay */}
                    <div 
                      className="absolute inset-6 rounded-lg opacity-70 transition-all duration-500 shadow-inner"
                      style={{ background: selectedArtistData?.pattern }}
                    />
                    
                    {/* Label */}
                    <div className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white/95 rounded-lg border shadow-lg transition-all duration-500 ${
                      selectedLabel === 'luxury' ? 'border-yellow-400 bg-gradient-to-b from-yellow-50 to-white' :
                      selectedLabel === 'modern' ? 'border-gray-300 bg-white' :
                      selectedLabel === 'artistic' ? 'border-transparent bg-white/80' :
                      'border-gray-200 bg-white/90'
                    } ${
                      selectedLabel === 'classic' ? 'w-28 h-16' :
                      selectedLabel === 'modern' ? 'w-32 h-12' :
                      selectedLabel === 'luxury' ? 'w-30 h-18' :
                      'w-26 h-14'
                    }`}>
                      <div className="p-2 text-center h-full flex flex-col justify-center">
                        <div className={`text-xs font-bold text-gray-800 mb-1 ${
                          selectedLabel === 'luxury' ? 'text-yellow-700' : ''
                        }`}>
                          VinArt
                        </div>
                        <div className="text-xs text-gray-600 leading-tight">
                          {selectedWineData?.name.split(' ')[0]}
                        </div>
                        {customText && (
                          <div className={`text-xs text-gray-700 mt-1 leading-tight ${
                            selectedFont === 'playfair' ? 'font-serif' : 
                            selectedFont === 'script' ? 'italic' : 'font-sans'
                          }`}>
                            {customText.slice(0, 15)}
                          </div>
                        )}
                        {selectedLabel === 'luxury' && (
                          <div className="absolute inset-0 border border-yellow-400 rounded-lg pointer-events-none" />
                        )}
                      </div>
                    </div>
                    
                    {/* Wine Level */}
                    <div 
                      className="absolute bottom-6 left-6 right-6 h-24 rounded-b-lg transition-all duration-500 shadow-inner"
                      style={{ backgroundColor: selectedWineData?.color }}
                    >
                      {/* Wine Surface Reflection */}
                      <div className="absolute top-0 left-0 right-0 h-2 bg-white/20 rounded-t-lg" />
                    </div>

                    {/* Bottle Highlights */}
                    <div className="absolute top-8 left-4 w-2 h-32 bg-white/30 rounded-full blur-sm" />
                    <div className="absolute top-12 right-6 w-1 h-24 bg-white/20 rounded-full blur-sm" />
                  </div>
                </div>
              </div>

              {/* Product Info Overlay */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 min-w-80">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 font-serif">
                    {selectedWineData?.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {selectedArtistData?.name} • {selectedArtistData?.specialty}
                  </p>
                  <div className="text-2xl font-bold text-yellow-600 mb-3">
                    {getTotalPrice()} €
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <span className="flex items-center justify-center space-x-2">
                        <ShoppingCart className="h-4 w-4" />
                        <span>Adaugă în Coș</span>
                      </span>
                    </button>
                    <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-red-500 rounded-lg transition-all duration-200">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-blue-500 rounded-lg transition-all duration-200">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="absolute bottom-6 right-6">
            <button
              onClick={() => {
                setCurrentStep(1);
                setSelectedWine('merlot');
                setSelectedRegion('bordeaux');
                setSelectedColor('deep-red');
                setSelectedArtist('maria-ionescu');
                setSelectedLabel('classic');
                setSelectedCap('gold');
                setCustomText('');
                setLogoFile(null);
                setBottleRotation(0);
                setZoomLevel(1);
              }}
              className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-red-500 p-3 rounded-lg shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <RotateCcw className="h-5 w-5" />
              <span className="text-sm font-medium">Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Missing X component
const X: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default ConfiguratorPage;