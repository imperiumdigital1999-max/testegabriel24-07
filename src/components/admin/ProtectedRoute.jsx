import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';

const ProtectedRoute = ({ children }) => {
  const { userProfile, loading, session } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Se não há sessão, redirecionar para login
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // Verificar tanto o userProfile quanto o localStorage para maior confiabilidade
  const userRole = localStorage.getItem('userRole') || userProfile?.tipo;
  
  if (userRole !== 'admin') {
    // Mostrar toast de acesso negado
    toast({
      title: 'Acesso Negado',
      description: 'Você não tem permissão para acessar o painel de administrador.',
      variant: 'destructive',
      duration: 4000,
    });
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;