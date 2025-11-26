import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from './ui/sheet';
import { 
  Moon, 
  Sun, 
  Bell, 
  Mail, 
  Lock, 
  Globe, 
  Palette,
  Monitor
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

interface SettingsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
  notifications: boolean;
  onNotificationsChange: (enabled: boolean) => void;
  emailNotifications: boolean;
  onEmailNotificationsChange: (enabled: boolean) => void;
  language: string;
  onLanguageChange: (language: string) => void;
}

export function SettingsPanel({
  open,
  onOpenChange,
  theme,
  onThemeChange,
  notifications,
  onNotificationsChange,
  emailNotifications,
  onEmailNotificationsChange,
  language,
  onLanguageChange,
}: SettingsPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Configuración</SheetTitle>
          <SheetDescription>
            Personaliza tu experiencia en ProyectoHub
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Apariencia */}
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-900 dark:text-gray-100 mb-1">Apariencia</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Personaliza cómo se ve la aplicación
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : theme === 'light' ? (
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Monitor className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                  <div>
                    <Label>Tema</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Selecciona tu tema preferido
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  className="flex flex-col items-center gap-2 h-auto py-3"
                  onClick={() => onThemeChange('light')}
                >
                  <Sun className="w-5 h-5" />
                  <span className="text-sm">Claro</span>
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  className="flex flex-col items-center gap-2 h-auto py-3"
                  onClick={() => onThemeChange('dark')}
                >
                  <Moon className="w-5 h-5" />
                  <span className="text-sm">Oscuro</span>
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  className="flex flex-col items-center gap-2 h-auto py-3"
                  onClick={() => onThemeChange('system')}
                >
                  <Monitor className="w-5 h-5" />
                  <span className="text-sm">Sistema</span>
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Notificaciones */}
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-900 dark:text-gray-100 mb-1">Notificaciones</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gestiona cómo recibes actualizaciones
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <Label htmlFor="notifications">Notificaciones push</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Recibe alertas en tiempo real
                    </p>
                  </div>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={onNotificationsChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <Label htmlFor="email-notifications">Email</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Recibe resúmenes por correo
                    </p>
                  </div>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={onEmailNotificationsChange}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Idioma y Región */}
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-900 dark:text-gray-100 mb-1">Idioma y Región</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Configura tu preferencia de idioma
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-2" />
              <div className="flex-1 space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select value={language} onValueChange={onLanguageChange}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Selecciona idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Privacidad y Seguridad */}
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-900 dark:text-gray-100 mb-1">Privacidad y Seguridad</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Protege tu cuenta y datos
              </p>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Lock className="w-4 h-4 mr-2" />
                Cambiar contraseña
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Palette className="w-4 h-4 mr-2" />
                Preferencias de datos
              </Button>
            </div>
          </div>

          <Separator />

          {/* Información */}
          <div className="space-y-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>ProyectoHub v1.0.0</p>
              <p className="mt-1">© 2024 Todos los derechos reservados</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
