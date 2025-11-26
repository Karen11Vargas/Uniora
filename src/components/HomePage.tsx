import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Building2, Shield, Users, TrendingUp, FileText, Vote, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onLogin: () => void;
  onRegisterCommunity: () => void;
}

export function HomePage({ onLogin, onRegisterCommunity }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900 dark:text-gray-100">Uniora</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Gestión Inteligente de Comunidades</p>
              </div>
            </div>
            <Button onClick={onLogin} variant="outline">
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
              Plataforma de Gestión Comunitaria
            </div>
            <h1 className="text-4xl lg:text-5xl text-gray-900 dark:text-gray-100">
              Gestiona tu comunidad de forma{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                transparente y eficiente
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Uniora centraliza la gestión financiera, proyectos y comunicación de tu comunidad residencial en una sola plataforma intuitiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onRegisterCommunity} 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Registrar Mi Comunidad
              </Button>
              <Button onClick={onLogin} variant="outline" size="lg">
                Acceder a Mi Cuenta
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-3xl opacity-20"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
              alt="Modern residential community"
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-gray-900 dark:text-gray-100 mb-4">
              Funcionalidades para cada rol
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Uniora se adapta a las necesidades específicas de administradores, propietarios y comités
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Administrador */}
            <Card className="border-2 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Administrador</CardTitle>
                <CardDescription>Control total de la comunidad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Gestión de reportes financieros</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Administración de proyectos futuros</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Panel de control completo</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Estadísticas avanzadas</span>
                </div>
              </CardContent>
            </Card>

            {/* Propietario */}
            <Card className="border-2 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle>Propietario</CardTitle>
                <CardDescription>Transparencia y participación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Visualización financiera interactiva</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Participación en proyectos</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sistema de comentarios y votación</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Histórico y comparativas</span>
                </div>
              </CardContent>
            </Card>

            {/* Comité */}
            <Card className="border-2 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Vote className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Miembro Comité</CardTitle>
                <CardDescription>Gestión ejecutiva</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Reportes ejecutivos</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Gestión de votaciones formales</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Comunicados oficiales</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Seguimiento de decisiones</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-gray-900 dark:text-gray-100">Transparencia Total</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Acceso completo a la información financiera de tu comunidad
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-gray-900 dark:text-gray-100">Reportes Automáticos</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Generación automática de informes mensuales y anuales
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-gray-900 dark:text-gray-100">Participación Activa</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Facilita la comunicación entre propietarios y administración
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-gray-900 dark:text-gray-100">Seguridad Garantizada</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tus datos protegidos con los más altos estándares de seguridad
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-4">
            ¿Listo para transformar la gestión de tu comunidad?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a las comunidades que ya confían en Uniora para su gestión diaria
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onRegisterCommunity} 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Registrar Mi Comunidad Ahora
            </Button>
            <Button 
              onClick={onLogin} 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Ya Tengo Una Cuenta
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-600 dark:text-gray-400">© 2025 Uniora. Todos los derechos reservados.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Términos</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Privacidad</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Soporte</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
