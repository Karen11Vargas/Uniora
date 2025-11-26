import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { CommunityRegistrationForm } from './components/CommunityRegistrationForm';
import { ProjectDashboard } from './components/ProjectDashboard';
import { FinanceDashboard } from './components/FinanceDashboard';
import { ProjectList } from './components/ProjectList';
import { SettingsPanel } from './components/SettingsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Building2, LayoutDashboard, FolderKanban, DollarSign, Settings, LogOut, FileText, Vote, Users } from 'lucide-react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';

type UserType = 'admin' | 'owner' | 'committee' | null;
type AppView = 'home' | 'login' | 'register-community' | 'dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [userType, setUserType] = useState<UserType>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [language, setLanguage] = useState('es');

  // Aplicar tema
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  const handleLogin = (type: UserType) => {
    setUserType(type);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUserType(null);
    setCurrentView('home');
  };

  const handleRegistrationSubmit = () => {
    // Mostrar mensaje de éxito y volver al login
    alert('¡Solicitud enviada con éxito! Recibirás un correo de confirmación en las próximas 24-48 horas.');
    setCurrentView('login');
  };

  // Renderizar vista según el estado
  if (currentView === 'home') {
    return (
      <HomePage
        onLogin={() => setCurrentView('login')}
        onRegisterCommunity={() => setCurrentView('register-community')}
      />
    );
  }

  if (currentView === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'register-community') {
    return (
      <CommunityRegistrationForm
        onBack={() => setCurrentView('home')}
        onSubmit={handleRegistrationSubmit}
      />
    );
  }

  // Dashboard según tipo de usuario
  const getUserTypeLabel = () => {
    switch (userType) {
      case 'admin':
        return 'Administrador';
      case 'owner':
        return 'Propietario';
      case 'committee':
        return 'Miembro del Comité';
      default:
        return '';
    }
  };

  const getUserTypeBadgeColor = () => {
    switch (userType) {
      case 'admin':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'owner':
        return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300';
      case 'committee':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900 dark:text-gray-100">Uniora</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Residencial Los Pinos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getUserTypeBadgeColor()}>
                {getUserTypeLabel()}
              </Badge>
              <button 
                onClick={() => setSettingsOpen(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Cerrar sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {userType === 'admin' && (
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl grid-cols-4">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span>Panel</span>
              </TabsTrigger>
              <TabsTrigger value="finances" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>Reportes</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <FolderKanban className="w-4 h-4" />
                <span>Proyectos</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Usuarios</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <ProjectDashboard />
            </TabsContent>

            <TabsContent value="finances" className="space-y-6">
              <FinanceDashboard />
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <ProjectList />
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">Gestión de Usuarios</h3>
                <p className="text-gray-500 dark:text-gray-400">Administra propietarios y miembros del comité</p>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {userType === 'owner' && (
          <Tabs defaultValue="finances" className="space-y-6">
            <TabsList className="grid w-full max-w-xl grid-cols-3">
              <TabsTrigger value="finances" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>Finanzas</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Vote className="w-4 h-4" />
                <span>Proyectos</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Histórico</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="finances" className="space-y-6">
              <FinanceDashboard />
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <ProjectList />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">Histórico y Comparativas</h3>
                <p className="text-gray-500 dark:text-gray-400">Consulta el histórico de gastos y comparativas</p>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {userType === 'committee' && (
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full max-w-xl grid-cols-3">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span>Reportes</span>
              </TabsTrigger>
              <TabsTrigger value="votations" className="flex items-center gap-2">
                <Vote className="w-4 h-4" />
                <span>Votaciones</span>
              </TabsTrigger>
              <TabsTrigger value="communications" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Comunicados</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <ProjectDashboard />
            </TabsContent>

            <TabsContent value="votations" className="space-y-6">
              <div className="text-center py-12">
                <Vote className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">Gestión de Votaciones</h3>
                <p className="text-gray-500 dark:text-gray-400">Crea y gestiona votaciones formales</p>
              </div>
            </TabsContent>

            <TabsContent value="communications" className="space-y-6">
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">Comunicados Oficiales</h3>
                <p className="text-gray-500 dark:text-gray-400">Publica comunicados para la comunidad</p>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>

      {/* Settings Panel */}
      <SettingsPanel
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        theme={theme}
        onThemeChange={setTheme}
        notifications={notifications}
        onNotificationsChange={setNotifications}
        emailNotifications={emailNotifications}
        onEmailNotificationsChange={setEmailNotifications}
        language={language}
        onLanguageChange={setLanguage}
      />
    </div>
  );
}
