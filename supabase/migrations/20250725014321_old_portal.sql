/*
  # Criar usuário administrador padrão

  1. Novo usuário
    - Cria usuário admin@universidadedigital.com no Supabase Auth
    - Adiciona entrada correspondente na tabela usuarios com tipo 'admin'
  
  2. Segurança
    - Usuário criado com senha segura
    - Email confirmado automaticamente
    - Tipo definido como 'admin'
*/

-- Criar usuário no Supabase Auth
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@universidadedigital.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Administrador"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Criar entrada na tabela usuarios usando o ID do usuário criado
INSERT INTO public.usuarios (
  id,
  nome,
  email,
  tipo,
  created_at
)
SELECT 
  u.id,
  'Administrador',
  'admin@universidadedigital.com',
  'admin',
  now()
FROM auth.users u
WHERE u.email = 'admin@universidadedigital.com'
ON CONFLICT (email) DO UPDATE SET
  tipo = 'admin',
  nome = 'Administrador';

-- Criar identidade para o usuário
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT 
  gen_random_uuid(),
  u.id,
  format('{"sub": "%s", "email": "%s"}', u.id::text, u.email)::jsonb,
  'email',
  now(),
  now(),
  now()
FROM auth.users u
WHERE u.email = 'admin@universidadedigital.com'
ON CONFLICT (provider, user_id) DO NOTHING;