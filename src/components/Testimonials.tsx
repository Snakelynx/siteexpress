import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: 'Marie Dubois',
      role: t('testimonials.roles.shopOwner'),
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      content: t('testimonials.quotes.1')
    },
    {
      name: 'Pierre Martin',
      role: t('testimonials.roles.consultant'),
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      content: t('testimonials.quotes.2')
    },
    {
      name: 'Sophie Laurent',
      role: t('testimonials.roles.designer'),
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      content: t('testimonials.quotes.3')
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">{t('testimonials.title')}</span>
          <h2 className="text-4xl font-bold text-white mt-4 mb-6">
            {t('testimonials.subtitle')}
          </h2>
          <p className="text-blue-100/80 text-lg">
            {t('testimonials.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-3 rounded-xl">
                  <Quote className="h-5 w-5 text-white" />
                </div>
              </div>

              <div className="relative">
                <p className="text-blue-100 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-xl object-cover mr-4 ring-2 ring-blue-400/20"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-blue-300 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mt-4 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;