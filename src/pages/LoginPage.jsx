import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock, UserPlus, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';

const LoginPage = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { signIn, signUp } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleAuthAction = async () => {
        setIsLoading(true);

        if (isSignUp && !fullName) {
            toast({
                variant: "destructive",
                title: "Campo obrigatório",
                description: "Por favor, insira seu nome completo.",
                duration: 3000,
            });
            setIsLoading(false);
            return;
        }

        if (isSignUp) {
            // Processo de cadastro
            const { error } = await signUp(email, password, { data: { full_name: fullName } });

            if (!error) {
                toast({
                    title: "Cadastro bem-sucedido!",
                    description: "Confirme seu e-mail para continuar.",
                    duration: 3000,
                });
                setIsSignUp(false);
                setEmail('');
                setPassword('');
                setFullName('');
            }
        } else {
            // Processo de login
            const { error } = await signIn(email, password);

            if (!error) {
                // Buscar o perfil do usuário para determinar o redirecionamento
                try {
                    const { data: { user } } = await supabase.auth.getUser();

                    if (user) {
                        const { data: profiles, error: profileError } = await supabase
                            .from('usuarios')
                            .select('tipo')
                            .eq('id', user.id)
                            .limit(1);

                        if (!profileError && profiles && profiles.length > 0) {
                            const profile = profiles[0];
                            localStorage.setItem('userRole', profile.tipo); // <-- LINHA ADICIONADA

                            // Redirecionar baseado no tipo de usuário
                            if (profile.tipo === 'admin') {
                                navigate('/admin/dashboard');
                                toast({
                                    title: "Login bem-sucedido!",
                                    description: "Bem-vindo ao painel administrativo!",
                                    duration: 3000,
                                });
                            } else {
                                navigate('/');
                                toast({
                                    title: "Login bem-sucedido!",
                                    description: "Bem-vindo de volta!",
                                    duration: 3000,
                                });
                            }
                        } else {
                            navigate('/');
                            toast({
                                title: "Login bem-sucedido!",
                                description: "Bem-vindo de volta!",
                                duration: 3000,
                            });
                        }
                    }
                } catch (error) {
                    console.error('Erro ao buscar perfil do usuário:', error);
                    navigate('/');
                    toast({
                        title: "Login bem-sucedido!",
                        description: "Bem-vindo de volta!",
                        duration: 3000,
                    });
                }
            }
        }

        setIsLoading(false);
    };

    return (
        <>
            <Helmet>
                <title>{isSignUp ? 'Cadastro' : 'Login'} - Universidade Digital</title>
                <meta name="description" content="Acesse a plataforma da Universidade Digital." />
            </Helmet>

            <div className="flex items-center justify-center min-h-screen p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md glass rounded-2xl p-8 border border-white/10"
                >
                    <div className="text-center mb-8">
                        <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 neon-glow mb-4">
                            <span className="text-white font-bold text-2xl">UD</span>
                        </div>
                        <h1 className="text-3xl font-bold gradient-text">{isSignUp ? 'Crie sua Conta' : 'Bem-vindo!'}</h1>
                        <p className="text-gray-400">{isSignUp ? 'Comece sua jornada de aprendizado.' : 'Acesse sua conta para continuar.'}</p>
                    </div>

                    <div className="space-y-4">
                        {isSignUp && (
                            <div className="relative">
                                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Nome Completo"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        )}
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <Button
                            onClick={handleAuthAction}
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    {isSignUp ? 'Criando conta...' : 'Entrando...'}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    {isSignUp ? <UserPlus className="mr-2 h-5 w-5" /> : <LogIn className="mr-2 h-5 w-5" />}
                                    {isSignUp ? 'Criar Conta' : 'Entrar'}
                                </div>
                            )}
                        </Button>
                    </div>

                    <div className="text-center mt-6">
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                        >
                            {isSignUp ? 'Já tem uma conta? Faça login' : 'Não tem conta? Cadastre-se'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default LoginPage;