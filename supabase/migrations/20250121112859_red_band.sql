/*
  # Correction des politiques RLS pour la table clients

  1. Changements
    - Suppression des anciennes politiques
    - Création d'une nouvelle politique pour les insertions anonymes
    - Création d'une politique pour la lecture par les administrateurs
*/

-- Suppression des politiques existantes
DROP POLICY IF EXISTS "Les administrateurs peuvent tout voir" ON clients;
DROP POLICY IF EXISTS "Permettre les insertions anonymes" ON clients;
DROP POLICY IF EXISTS "Tout le monde peut créer une demande" ON clients;

-- Création de la nouvelle politique pour les insertions anonymes
CREATE POLICY "allow_anon_inserts"
ON clients
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Politique pour permettre aux administrateurs de lire les données
CREATE POLICY "allow_admin_select"
ON clients
FOR SELECT
TO authenticated
USING (auth.jwt() ->> 'email' IN (
  SELECT email FROM admins
));