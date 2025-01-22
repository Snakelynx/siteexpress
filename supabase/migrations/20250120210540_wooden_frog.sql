/*
  # Ajout de la table des visites

  1. Nouvelle Table
    - `visits`
      - `id` (uuid, clé primaire)
      - `created_at` (timestamp)
      - `page` (text)
      - `referrer` (text)
      - `user_agent` (text)

  2. Sécurité
    - Active RLS sur la table `visits`
    - Ajoute une politique pour permettre l'insertion anonyme
    - Ajoute une politique pour permettre la lecture par les administrateurs
*/

CREATE TABLE IF NOT EXISTS visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  page text,
  referrer text,
  user_agent text
);

-- Activation de la sécurité niveau ligne
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion anonyme
CREATE POLICY "Tout le monde peut enregistrer une visite"
  ON visits
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Politique pour permettre la lecture par les administrateurs
CREATE POLICY "Les administrateurs peuvent voir les visites"
  ON visits
  FOR SELECT
  TO authenticated
  USING (is_admin(auth.uid()));