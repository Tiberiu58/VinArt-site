import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      details: ['+40 21 123 4567', '+40 21 123 4568'],
      description: 'Luni - Vineri: 9:00 - 18:00',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['contact@vinart.ro', 'comenzi@vinart.ro'],
      description: 'Răspundem în maxim 24 ore',
    },
    {
      icon: MapPin,
      title: 'Adresa',
      details: ['Str. Viticultorilor 1', 'București 012345, România'],
      description: 'Vizite cu programare',
    },
    {
      icon: Clock,
      title: 'Program',
      details: ['Luni - Vineri: 9:00 - 18:00', 'Sâmbătă: 10:00 - 14:00'],
      description: 'Duminică închis',
    },
  ];

  const faqItems = [
    {
      question: 'Care este timpul de livrare pentru comenzile personalizate?',
      answer: 'Pentru comenzile personalizate, timpul de realizare este între 7-14 zile lucrătoare, în funcție de complexitatea designului ales.',
    },
    {
      question: 'Oferă certificat de autenticitate pentru vinurile din colecție?',
      answer: 'Da, fiecare sticlă vine cu certificat de autenticitate care atestă calitatea vinului și originalitatea designului artistic.',
    },
    {
      question: 'Pot returna o comandă personalizată?',
      answer: 'Având în vedere natura personalizată a produselor, retururile sunt posibile doar în caz de defecte de fabricație sau erori din partea noastră.',
    },
    {
      question: 'Organizați degustări private?',
      answer: 'Da, organizăm degustări private la sediul nostru sau la locația dumneavoastră. Contactați-ne pentru detalii și disponibilitate.',
    },
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Suntem aici să vă ajutăm. Contactați-ne pentru orice întrebare sau solicitare specială.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg">
                  <Send className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 font-serif">
                  Trimite-ne un Mesaj
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipul solicitării
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    <option value="general">Întrebare generală</option>
                    <option value="order">Comandă/Personalizare</option>
                    <option value="corporate">Cadouri corporate</option>
                    <option value="partnership">Parteneriat</option>
                    <option value="press">Media/Presă</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nume complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subiect *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mesaj *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <Send className="h-5 w-5" />
                    <span>Trimite Mesajul</span>
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information & FAQ */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex-shrink-0">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-700 font-medium">{detail}</p>
                      ))}
                      <p className="text-gray-500 text-sm mt-1">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Chat */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <MessageCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-bold text-green-800">Chat Live</h3>
              </div>
              <p className="text-green-700 mb-4">
                Consultanții noștri sunt online și gata să vă ajute cu orice întrebare.
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                Începe Chat-ul
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
              Întrebări Frecvente
            </h2>
            <p className="text-xl text-gray-600">
              Răspunsuri la cele mai comune întrebări despre produsele și serviciile noastre
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;