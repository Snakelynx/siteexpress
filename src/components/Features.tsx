import React from 'react';
import { Timer, Zap, Rocket, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Timer className="h-8 w-8" />,
      title: t('features.list.1'),
      description: t('features.list.2')
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t('features.list.3'),
      description: t('features.list.4')
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: t('features.list.5'),
      description: t('features.list.6')
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: t('features.list.7'),
      description: t('features.list.6')
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-4">
            <span className="flex items-center gap-2 text-yellow-500 font-semibold text-sm uppercase tracking-wider bg-yellow-50 px-4 py-2 rounded-full">
              <Timer className="h-4 w-4" />
              {t('features.title')}
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
            {t('features.subtitle')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('features.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-yellow-500/10 rounded-full scale-150 blur-xl group-hover:bg-yellow-500/20 transition-colors duration-300"></div>
                <div className="relative bg-gradient-to-br from-yellow-400 to-orange-400 text-blue-900 p-4 rounded-xl transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {feature.icon}
                </div>
              </div>
              
              <div className="relative">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-500 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;