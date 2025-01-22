import React from 'react';
import { Check, Timer, Zap } from 'lucide-react';
import QuoteModal from './QuoteModal';
import { useTranslation } from 'react-i18next';

const Pricing = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = React.useState(false);
  const { t } = useTranslation();
  
  const features = [
    t('features.list.1'),
    t('features.list.2'),
    t('features.list.3'),
    t('features.list.4'),
    t('features.list.5'),
    t('features.list.6'),
    t('features.list.7')
  ];

  return (
    <>
      <section id="tarifs" className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>

              {/* Content */}
              <div className="relative">
                {/* Header */}
                <div className="text-center mb-12">
                  <div className="flex justify-center mb-6">
                    <span className="inline-flex items-center gap-2 bg-yellow-400/10 text-yellow-400 px-6 py-3 rounded-full text-lg font-medium">
                      <Timer className="h-6 w-6" />
                      {t('hero.deliveredIn')}
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    {t('pricing.title')}
                  </h2>
                  <div className="flex justify-center items-baseline mb-4">
                    <span className="text-6xl font-bold text-white">499€</span>
                    <span className="text-xl text-blue-200 ml-2">{t('pricing.perSite')}</span>
                  </div>
                  <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                    {t('pricing.description')}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 text-blue-100"
                    >
                      <div className="bg-gradient-to-br from-yellow-400 to-orange-400 p-2 rounded-lg">
                        <Check className="h-5 w-5 text-blue-900" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Time Highlight */}
                <div className="mb-12">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-gradient-to-br from-yellow-400 to-orange-400 p-4 rounded-xl">
                        <Zap className="h-8 w-8 text-blue-900" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      60 Minutes
                    </h3>
                    <p className="text-blue-200 text-lg">
                      {t('hero.description')}
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <button 
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-900 font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 text-lg"
                  >
                    {t('pricing.cta')}
                    <Timer className="ml-2 h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
};

export default Pricing;