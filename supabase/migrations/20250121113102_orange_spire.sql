/*
  # Fix RLS policies for clients table
  
  1. Changes
    - Drop existing policies
    - Create new simplified policies for anonymous inserts and admin access
    - Fix policy naming and conditions
  
  2. Security
    - Allow anonymous users to insert new records
    - Allow admins to view all records
    - Maintain data security while fixing access issues
*/

-- Drop existing policies to start fresh
DROP POLICY IF EXISTS "allow_anon_inserts" ON clients;
DROP POLICY IF EXISTS "allow_admin_select" ON clients;
DROP POLICY IF EXISTS "Les administrateurs peuvent tout voir" ON clients;
DROP POLICY IF EXISTS "Permettre les insertions anonymes" ON clients;
DROP POLICY IF EXISTS "Tout le monde peut créer une demande" ON clients;

-- Create a simple policy for anonymous inserts
CREATE POLICY "enable_insert_for_anon"
ON clients
FOR INSERT
TO anon
WITH CHECK (true);

-- Create a policy for admin access
CREATE POLICY "enable_all_for_admin"
ON clients
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.id = auth.uid()
  )
);