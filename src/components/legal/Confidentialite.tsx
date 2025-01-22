import React from 'react';

const Confidentialite = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Collecte des données</h2>
              <p>
                Nous collectons uniquement les données nécessaires à la création de votre site
                et à la communication avec vous concernant votre projet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Utilisation des données</h2>
              <p>
                Les données collectées sont utilisées exclusivement dans le cadre de la création
                de votre site web et ne sont jamais partagées avec des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Protection des données</h2>
              <p>
                Nous mettons en œuvre toutes les mesures nécessaires pour protéger vos données
                personnelles contre tout accès non autorisé.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confidentialite;