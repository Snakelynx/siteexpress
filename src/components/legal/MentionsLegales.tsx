import React from 'react';

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentions Légales</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Informations légales</h2>
              <p>
                Nom de la société : SiteExpress148770<br />
                Siège social : Londres<br />
                Forme juridique : Limited Company
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Hébergement</h2>
              <p>
                Le site est hébergé par une société spécialisée dans l'hébergement de sites web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site est protégé par les lois relatives à la propriété intellectuelle.
                Toute reproduction, totale ou partielle, est strictement interdite sans autorisation préalable.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;