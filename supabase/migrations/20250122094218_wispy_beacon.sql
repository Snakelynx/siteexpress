/*
  # Création de la table articles et configuration de la sécurité

  1. Nouvelle Table
    - `articles`
      - `id` (uuid, clé primaire)
      - `title` (text, non null)
      - `content` (text, non null)
      - `image_url` (text, non null)
      - `slug` (text, unique, non null)
      - `created_at` (timestamptz, par défaut now())

  2. Sécurité
    - Activation RLS sur la table articles
    - Politique de lecture publique
    - Politique d'écriture pour les administrateurs
*/

-- Création de la table articles
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Activation de la sécurité niveau ligne
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique
CREATE POLICY "Les articles sont publics"
  ON articles
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Politique d'écriture pour les administrateurs
CREATE POLICY "Seuls les administrateurs peuvent modifier les articles"
  ON articles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.id = auth.uid()
    )
  );