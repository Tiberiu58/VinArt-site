import React from 'react';
import { Award, Heart, Users, Palette, Wine, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  const team = [
    {
      name: 'Alexandru Vintilă',
      role: 'Fondator & Master Sommelier',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Cu o experiență de peste 20 de ani în industria vinului, Alexandru este sufletul companiei.',
    },
    {
      name: 'Gheorghe Munteanu',
      role: 'Master Vinificator',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Responsabil pentru selecția și calitatea vinurilor din portofoliul nostru.',
    },
  ];

  const artists = [
    {
      name: 'Maria Ionescu',
      specialty: 'Abstract Modern',
      achievements: 'Laureată a Bienalei de Artă București 2022',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Andrei Popescu',
      specialty: 'Clasic Romantic',
      achievements: 'Membru al Uniunii Artiștilor Plastici din România',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Elena Radu',
      specialty: 'Minimalist Elegant',
      achievements: 'Expozițiile la Galeria Națională de Artă',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
            {t('about.title')}
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">
                Începutul Unei Pasiuni
              </h2>
              <div className="prose prose-lg text-gray-600 space-y-6">
                <p>
                  WineArtist s-a născut din întâlnirea a două pasiuni: vinul de calitate și arta autentică. 
                  În 2018, Alexandru Vintilă, un sommelier cu experiență vastă, s-a întâlnit cu Maria Cristescu, 
                  o curatoare de artă renumită.
                </p>
                <p>
                  Împreună au conceput o viziune revoluționară: să transforme fiecare sticlă de vin într-o 
                  operă de artă unică, colaborând cu artiști locali și internaționali pentru a crea piese 
                  de colecție autentice.
                </p>
                <p>
                  Astăzi, WineArtist este recunoscut ca lider în segmentul premium al vinurilor artistice, 
                  cu o rețea de peste 25 de artiști colaboratori și mii de clienți mulțumiți din toată Europa.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Story"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl">
                <Heart className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Valorile Noastre</h2>
            <p className="text-xl text-gray-600">Principiile care ne ghidează în tot ceea ce facem</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Excelență',
                description: 'Căutăm permanent perfecțiunea în fiecare aspect al produselor noastre.',
              },
              {
                icon: Palette,
                title: 'Creativitate',
                description: 'Colaborăm cu artiști talentați pentru a crea design-uri unice și memorabile.',
              },
              {
                icon: Heart,
                title: 'Pasiune',
                description: 'Fiecare sticlă este realizată cu dedicare și atenție la cele mai mici detalii.',
              },
              {
                icon: Users,
                title: 'Comunitate',
                description: 'Construim relații autentice cu clienții, artiștii și partenerii noștri.',
              },
              {
                icon: Wine,
                title: 'Calitate',
                description: 'Selectăm doar vinurile de cea mai înaltă calitate de la producători de renume.',
              },
              {
                icon: Globe,
                title: 'Sustenabilitate',
                description: 'Ne angajăm pentru practici responsabile și respect pentru mediu.',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Echipa Noastră</h2>
            <p className="text-xl text-gray-600">Profesioniștii pasionați din spatele brandului VinArt</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-yellow-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Artiștii Noștri</h2>
            <p className="text-xl text-gray-600">Talentații creatori care dau viață designurilor unice</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{artist.name}</h3>
                  <p className="text-yellow-600 font-medium mb-3">{artist.specialty}</p>
                  <p className="text-gray-600 leading-relaxed">{artist.achievements}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;