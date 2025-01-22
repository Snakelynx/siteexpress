const { createClient } = require('@supabase/supabase-js');

// Images professionnelles pour les articles
const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
  'https://images.unsplash.com/photo-1552581234-26160f608093'
];

// Sujets orientés vente et conversion
const topics = [
  "Pourquoi votre entreprise a besoin d'un site web professionnel en 2024",
  "Comment un site web peut doubler vos ventes en 3 mois",
  "5 raisons de créer votre site web maintenant",
  "Les secrets d'un site web qui convertit",
  "Combien coûte vraiment un site web ? La vérité sur les prix"
];

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

exports.handler = async function(event, context) {
  console.log('Démarrage de la fonction generateArticle');
  console.log('Heure de déclenchement:', new Date().toISOString());

  try {
    // Vérification de la connexion Supabase
    console.log('Vérification de la connexion Supabase...');
    const { data: testData, error: testError } = await supabase
      .from('articles')
      .select('count')
      .limit(1);

    if (testError) {
      console.error('Erreur de connexion Supabase:', testError);
      throw testError;
    }
    console.log('Connexion Supabase OK');

    // Sélection aléatoire du sujet et de l'image
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const imageUrl = UNSPLASH_IMAGES[Math.floor(Math.random() * UNSPLASH_IMAGES.length)];
    console.log('Sujet sélectionné:', topic);

    // Création d'un article avec un contenu prédéfini
    console.log('Création de l\'article...');
    const article = {
      title: topic,
      content: `Dans un monde numérique en constante évolution, avoir un site web professionnel n'est plus une option, c'est une nécessité. ${topic} est un sujet crucial pour toute entreprise qui souhaite se développer en 2024.

Nos experts ont développé une solution unique qui vous permet d'obtenir un site web professionnel en seulement 1 heure. Plus besoin d'attendre des semaines ou de dépenser des milliers d'euros.

Pour seulement 499€, vous obtenez :
- Un design moderne et responsive
- Une optimisation SEO complète
- Un formulaire de contact professionnel
- Une mise en ligne express
- Un support prioritaire

Ne laissez pas passer cette opportunité de développer votre présence en ligne. Contactez-nous dès maintenant pour obtenir votre site web professionnel en 1 heure !`,
      image_url: imageUrl,
      slug: topic.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    };

    // Insertion dans Supabase
    console.log('Insertion dans Supabase...');
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select();

    if (error) {
      console.error('Erreur lors de l\'insertion:', error);
      throw error;
    }

    console.log('Article créé avec succès:', data);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Article créé avec succès',
        data,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Erreur complète:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Erreur lors de la création de l\'article',
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};