import React from 'react';

const CGV = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Conditions Générales de Vente</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Services proposés</h2>
              <p>
                SiteExpress148770 propose la création de sites vitrines professionnels en 1 heure.
                Le service comprend la conception, le développement et la mise en ligne du site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Prix et paiement</h2>
              <p>
                Le prix du service est de 499€ TTC par site.<br />
                Le paiement doit être effectué en totalité avant le début de la prestation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Délai de livraison</h2>
              <p>
                La livraison du site est garantie en 1 heure à compter de la validation du projet
                et de la réception de tous les éléments nécessaires.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Garanties</h2>
              <p>
                Le site livré est garanti conforme aux spécifications convenues.
                Une période de modification mineure de 24h est incluse après la livraison.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CGV;