import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Building2, ArrowLeft, CheckCircle2, User, Mail, Phone } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { api } from '../services/api';

interface CommunityRegistrationFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function CommunityRegistrationForm({ onBack, onSubmit }: CommunityRegistrationFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Datos de la comunidad
    communityName: '',
    address: '',
    city: '',
    postalCode: '',
    totalUnits: '',
    communityType: '',
    
    // Datos del administrador
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    adminPosition: '',
    
    // Información adicional
    description: '',
    currentSoftware: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        setSubmitting(true);
        await api.registerCommunity(formData);
        onSubmit();
      } catch (error: any) {
        alert(error.message || 'No pudimos registrar la comunidad');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-gray-100">Registro de Nueva Comunidad</h1>
              <p className="text-gray-600 dark:text-gray-400">Paso {step} de 3</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${
                  s <= step
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Datos de la Comunidad */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Información de la Comunidad</CardTitle>
                <CardDescription>
                  Ingresa los datos básicos de tu comunidad residencial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="communityName">Nombre de la Comunidad *</Label>
                  <Input
                    id="communityName"
                    value={formData.communityName}
                    onChange={(e) => handleChange('communityName', e.target.value)}
                    placeholder="Ej: Residencial Los Pinos"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Calle, número, etc."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      placeholder="Ciudad"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Código Postal *</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleChange('postalCode', e.target.value)}
                      placeholder="00000"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalUnits">Número de Unidades *</Label>
                    <Input
                      id="totalUnits"
                      type="number"
                      value={formData.totalUnits}
                      onChange={(e) => handleChange('totalUnits', e.target.value)}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="communityType">Tipo de Comunidad *</Label>
                    <Select
                      value={formData.communityType}
                      onValueChange={(value) => handleChange('communityType', value)}
                    >
                      <SelectTrigger id="communityType">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residencial">Residencial</SelectItem>
                        <SelectItem value="edificio">Edificio</SelectItem>
                        <SelectItem value="urbanizacion">Urbanización</SelectItem>
                        <SelectItem value="conjunto">Conjunto Cerrado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Datos del Administrador */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Información del Administrador</CardTitle>
                <CardDescription>
                  Datos de la persona que administrará la comunidad en Uniora
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminName">Nombre Completo *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="adminName"
                      value={formData.adminName}
                      onChange={(e) => handleChange('adminName', e.target.value)}
                      placeholder="Juan Pérez García"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Correo Electrónico *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="adminEmail"
                      type="email"
                      value={formData.adminEmail}
                      onChange={(e) => handleChange('adminEmail', e.target.value)}
                      placeholder="admin@comunidad.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminPhone">Teléfono *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="adminPhone"
                      type="tel"
                      value={formData.adminPhone}
                      onChange={(e) => handleChange('adminPhone', e.target.value)}
                      placeholder="+34 600 000 000"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminPosition">Cargo/Posición *</Label>
                  <Select
                    value={formData.adminPosition}
                    onValueChange={(value) => handleChange('adminPosition', value)}
                  >
                    <SelectTrigger id="adminPosition">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="administrador">Administrador de Fincas</SelectItem>
                      <SelectItem value="presidente">Presidente de la Comunidad</SelectItem>
                      <SelectItem value="secretario">Secretario</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Información Adicional y Confirmación */}
          {step === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información Adicional</CardTitle>
                  <CardDescription>
                    Ayúdanos a conocer mejor las necesidades de tu comunidad
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción de la Comunidad</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder="Describe brevemente tu comunidad, servicios, áreas comunes, etc."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentSoftware">¿Actualmente usan algún software de gestión?</Label>
                    <Input
                      id="currentSoftware"
                      value={formData.currentSoftware}
                      onChange={(e) => handleChange('currentSoftware', e.target.value)}
                      placeholder="Nombre del software actual (opcional)"
                    />
                  </div>
                </CardContent>
              </Card>

              <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  <strong>¿Qué sigue después del registro?</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Nuestro equipo revisará tu solicitud en 24-48 horas</li>
                    <li>Recibirás un correo de confirmación con los próximos pasos</li>
                    <li>Te ayudaremos con la configuración inicial de tu comunidad</li>
                    <li>Podrás comenzar a usar Uniora inmediatamente después de la aprobación</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                Anterior
              </Button>
            )}
            <Button type="submit" className="ml-auto" disabled={submitting}>
              {submitting ? 'Enviando...' : step < 3 ? 'Siguiente' : 'Enviar Solicitud'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
