import React from 'react';

const RGPD = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Conformité RGPD</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Vos droits</h2>
              <p>
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Exercice de vos droits</h2>
              <p>
                Pour exercer vos droits ou pour toute question relative à la protection de vos données,
                vous pouvez nous contacter via notre formulaire de contact.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Conservation des données</h2>
              <p>
                Vos données sont conservées uniquement pendant la durée nécessaire à la réalisation
                de votre projet et conformément aux obligations légales.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RGPD;