import React from 'react';
import { ArrowRight, ChevronDown, Timer, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import QuoteModal from './QuoteModal';

const Hero = () => {
  const { t } = useTranslation();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = React.useState(false);

  return (
    <>
      <section id="accueil" className="min-h-screen relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row items-center min-h-screen pt-20 pb-12">
            <div className="md:w-1/2 mb-12 md:mb-0 relative z-10">
              <div className="space-y-6 max-w-xl">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-yellow-400 animate-pulse" />
                  <span className="inline-block px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-medium">
                    {t('hero.deliveredIn')}
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  <span className="flex items-center gap-3">
                    <Zap className="h-12 w-12 text-yellow-400" />
                    {t('hero.title')}
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                    {t('hero.subtitle')}
                  </span>
                </h1>
                <p className="text-xl text-blue-100/90 leading-relaxed">
                  {t('hero.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="group flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-900 font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
                  >
                    {t('hero.startNow')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300">
                    {t('hero.seeProjects')}
                  </button>
                </div>
                <div className="pt-8">
                  <div className="bg-blue-800/50 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Timer className="h-5 w-5 text-yellow-400" />
                      {t('hero.howItWorks')}
                    </h3>
                    <ol className="text-blue-100/80 space-y-2 list-decimal list-inside">
                      <li>{t('hero.steps.1')}</li>
                      <li>{t('hero.steps.2')}</li>
                      <li>{t('hero.steps.3')}</li>
                      <li>{t('hero.steps.4')}</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-orange-400 rounded-2xl transform rotate-6 blur opacity-30"></div>
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Site vitrine professionnel"
                  className="relative rounded-2xl shadow-2xl transform hover:-translate-y-2 transition-transform duration-300"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-900 font-bold px-6 py-3 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Timer className="h-5 w-5" />
                    {t('hero.deliveredIn')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
};

export default Hero;