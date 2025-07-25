import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Users, BookOpen, Wrench, BarChart2, PlusCircle, Bell, User, TrendingUp, Activity, AlertCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
    const { toast } = useToast();

    const stats = [
        { title: 'Total de Usuários', value: '3,846', icon: Users, color: 'text-blue-400' },
        { title: 'Total de Cursos', value: '25', icon: BookOpen, color: 'text-purple-400' },
        { title: 'Ferramentas IA', value: '8', icon: Wrench, color: 'text-green-400' },
        { title: 'Novos Usuários (Mês)', value: '172', icon: BarChart2, color: 'text-yellow-400' },
    ];

    const systemStats = [
        { title: 'Uptime do Sistema', value: '99.9%', icon: Activity, color: 'text-green-400', trend: '+0.1%' },
        { title: 'Usuários Ativos', value: '2,341', icon: TrendingUp, color: 'text-blue-400', trend: '+12%' },
        { title: 'Alertas Pendentes', value: '3', icon: AlertCircle, color: 'text-red-400', trend: '-2' },
    ];
    const quickActions = [
        { title: 'Adicionar Curso', icon: PlusCircle, path: '/admin/courses' },
        { title: 'Adicionar Ferramenta', icon: PlusCircle, path: '/admin/tools' },
        { title: 'Gerenciar Usuários', icon: Users, path: '/admin/users' },
        { title: 'Enviar Notificação', icon: Bell, path: '#', onClick: () => toast({
            title: "🚧 Este recurso ainda não foi implementado—mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀",
            duration: 3000,
        }) },
    ];

    const recentActivities = [
        { user: 'João Silva', action: 'se inscreveu no curso React Avançado', time: '5 min atrás' },
        { user: 'Admin', action: 'adicionou a ferramenta Gerador de Imagens', time: '2 horas atrás' },
        { user: 'Maria Oliveira', action: 'completou o curso de UX/UI Design', time: '1 dia atrás' },
        { user: 'Carlos Souza', action: 'se tornou um novo usuário', time: '2 dias atrás' },
    ];

    const handleQuickAction = (action) => {
        if (action.onClick) {
            action.onClick();
        }
    };
    return (
        <>
            <Helmet>
                <title>Dashboard Admin - Universidade Digital</title>
                <meta name="description" content="Painel de controle para administradores da Universidade Digital." />
            </Helmet>
            <div className="p-4 lg:p-8 space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center neon-glow">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-white">Admin Dashboard</h1>
                            <p className="text-gray-400">Painel de controle administrativo</p>
                        </div>
                    </div>
                </motion.div>

                {/* Alert de Acesso Admin */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass rounded-2xl p-4 border border-red-500/20 bg-red-500/5"
                >
                    <div className="flex items-center space-x-3">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                        <div>
                            <p className="text-red-300 font-medium">🔒 Área Restrita - Apenas Administradores</p>
                            <p className="text-red-400/80 text-sm">Acesso exclusivo para usuários com tipo = "admin"</p>
                        </div>
                    </div>
                </motion.div>

                {/* Admin Menu Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <Link to="/admin/users">
                        <div className="glass rounded-2xl p-6 border border-white/10 card-hover cursor-pointer group">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30 transition-colors">
                                    <Users className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Gerenciar Usuários</h3>
                                    <p className="text-gray-400 text-sm">Adicionar, editar e remover usuários</p>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm">Controle total sobre contas de usuários da plataforma</p>
                        </div>
                    </Link>

                    <Link to="/admin/courses">
                        <div className="glass rounded-2xl p-6 border border-white/10 card-hover cursor-pointer group">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30 transition-colors">
                                    <BookOpen className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Gerenciar Cursos</h3>
                                    <p className="text-gray-400 text-sm">Criar e editar conteúdo educacional</p>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm">Administre todo o catálogo de cursos disponíveis</p>
                        </div>
                    </Link>

                    <Link to="/admin/tools">
                        <div className="glass rounded-2xl p-6 border border-white/10 card-hover cursor-pointer group">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="p-3 rounded-xl bg-green-500/20 text-green-400 group-hover:bg-green-500/30 transition-colors">
                                    <Wrench className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Ferramentas IA</h3>
                                    <p className="text-gray-400 text-sm">Configurar ferramentas de IA</p>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm">Gerencie as ferramentas de inteligência artificial</p>
                        </div>
                    </Link>
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="glass rounded-2xl p-6 border border-white/10 flex items-center space-x-4 card-hover"
                            whileHover={{ y: -5 }}
                        >
                            <div className={`p-3 rounded-xl bg-white/10 ${stat.color}`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                                <p className="text-sm text-gray-400">{stat.title}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* System Performance Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass rounded-2xl p-6 border border-white/10"
                >
                    <h2 className="text-xl font-bold text-white mb-4">Status do Sistema</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {systemStats.map((stat, index) => (
                            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg bg-white/10 ${stat.color}`}>
                                        <stat.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">{stat.value}</p>
                                        <p className="text-sm text-gray-400">{stat.title}</p>
                                    </div>
                                </div>
                                <div className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-400' : stat.trend.startsWith('-') && stat.title.includes('Alertas') ? 'text-green-400' : 'text-red-400'}`}>
                                    {stat.trend}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div
                        className="lg:col-span-2 space-y-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="glass rounded-2xl p-6 border border-white/10">
                            <h2 className="text-xl font-bold text-white mb-4">Ações Rápidas</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {quickActions.map((action, index) => (
                                    action.path !== '#' ? (
                                        <Link key={index} to={action.path}>
                                            <Button className="w-full h-24 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 flex flex-col items-center justify-center space-y-2">
                                                <action.icon className="h-6 w-6 text-purple-400" />
                                                <span className="text-sm text-center">{action.title}</span>
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button 
                                            key={index}
                                            onClick={() => handleQuickAction(action)}
                                            className="w-full h-24 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 flex flex-col items-center justify-center space-y-2"
                                        >
                                            <action.icon className="h-6 w-6 text-purple-400" />
                                            <span className="text-sm text-center">{action.title}</span>
                                        </Button>
                                    )
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="lg:col-span-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="glass rounded-2xl p-6 border border-white/10 h-full">
                            <h2 className="text-xl font-bold text-white mb-4">Atividade Recente</h2>
                            <ul className="space-y-4">
                                {recentActivities.map((activity, index) => (
                                    <li key={index} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                <User className="h-4 w-4 text-gray-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-white">
                                                <span className="font-semibold">{activity.user}</span> {activity.action}
                                            </p>
                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;