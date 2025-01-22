import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { config } from '../config.js';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Utilisation de la clé API depuis les variables d'environnement
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const topics = [
  "création de sites web",
  "web design",
  "SEO",
  "marketing digital",
  "e-commerce",
  "expérience utilisateur",
  "responsive design",
  "performance web",
  "tendances web",
  "accessibilité web"
];

async function generateArticle(topic) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{
          role: "system",
          content: "Tu es un expert en création de sites web et marketing digital."
        }, {
          role: "user",
          content: `Écris un article de blog informatif et engageant sur le thème : ${topic}. 
                   L'article doit faire environ 500 mots et inclure un titre accrocheur.
                   Format : JSON avec "title" et "content"`
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur API OpenAI: ${response.status}`);
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Erreur lors de la génération de l\'article:', error);
    throw error;
  }
}

async function getRandomUnsplashImage(query) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Erreur API Unsplash: ${response.status}`);
    }

    const data = await response.json();
    return data.urls.regular;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'image:', error);
    // Image par défaut en cas d'erreur
    return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f';
  }
}

async function createArticleInSupabase(article, imageUrl) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([{
        title: article.title,
        content: article.content,
        image_url: imageUrl,
        slug: article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      }]);

    if (error) throw error;
    console.log('Article créé avec succès:', article.title);
    return data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('Début de la génération d\'articles...');
    
    // Choisir un sujet au hasard
    const topic = topics[Math.floor(Math.random() * topics.length)];
    console.log('Sujet choisi:', topic);
    
    // Générer l'article
    console.log('Génération de l\'article...');
    const article = await generateArticle(topic);
    
    // Obtenir une image en rapport avec le sujet
    console.log('Récupération de l\'image...');
    const imageUrl = await getRandomUnsplashImage(topic);
    
    // Créer l'article dans Supabase
    console.log('Création de l\'article dans Supabase...');
    await createArticleInSupabase(article, imageUrl);
    
    console.log('Article généré et publié avec succès!');
  } catch (error) {
    console.error('Erreur lors du processus de génération:', error);
  }
}

// Exécuter le script toutes les 12 heures
setInterval(main, 12 * 60 * 60 * 1000);

// Première exécution
main();