import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Building2, Mail, Lock, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { UserType } from '../services/api';

interface LoginPageProps {
  onLogin: (payload: { email: string; password: string; userType: UserType }) => void;
  loading?: boolean;
  onBack?: () => void;
}

export function LoginPage({ onLogin, onBack, loading = false }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('owner');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password, userType });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Panel izquierdo - Formulario */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Botón volver si está disponible */}
          {onBack && (
            <Button variant="ghost" onClick={onBack} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          )}
          
          {/* Logo y título */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Building2 className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-gray-900">Bienvenido a Uniora</h2>
            <p className="mt-2 text-gray-600">
              Ingresa tus credenciales para acceder a tu comunidad
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userType">Tipo de Usuario</Label>
                <Select
                  value={userType}
                  onValueChange={(value: any) => setUserType(value)}
                >
                  <SelectTrigger id="userType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="owner">Propietario</SelectItem>
                    <SelectItem value="committee">Miembro del Comité</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Recordarme
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {loading ? 'Iniciando...' : 'Iniciar sesión'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Modo demo:</strong> Selecciona tu tipo de usuario e ingresa cualquier email y contraseña para acceder
            </p>
          </div>
        </div>
      </div>

      {/* Panel derecho - Información visual */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 items-center justify-center">
        <div className="max-w-lg">
          <div className="mb-8">
            <h2 className="text-white mb-4">
              Gestión transparente de tu comunidad
            </h2>
            <p className="text-blue-100 text-lg">
              Uniora centraliza toda la información financiera, proyectos y comunicación
              de tu comunidad en una plataforma segura e intuitiva.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'Reportes financieros en tiempo real',
              'Participación activa en decisiones comunitarias',
              'Transparencia total en gastos e ingresos',
              'Comunicación directa con la administración',
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-blue-50">{feature}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl overflow-hidden shadow-2xl border-4 border-blue-400/20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
              alt="Dashboard preview"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
