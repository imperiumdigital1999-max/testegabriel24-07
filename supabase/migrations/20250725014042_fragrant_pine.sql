/*
  # Criar usuário administrador padrão

  1. Inserção de dados
    - Adiciona um usuário administrador padrão na tabela `usuarios`
    - Email: admin@universidadedigital.com
    - Tipo: admin
    - Nome: Administrador

  2. Observações
    - Este usuário precisa ser criado também na autenticação do Supabase
    - A senha deve ser definida através do painel do Supabase ou via código
*/

-- Inserir usuário administrador padrão
INSERT INTO public.usuarios (
  id,
  nome,
  email,
  tipo,
  created_at
) VALUES (
  gen_random_uuid(),
  'Administrador',
  'admin@universidadedigital.com',
  'admin',
  now()
) ON CONFLICT (email) DO UPDATE SET
  tipo = 'admin',
  nome = 'Administrador';