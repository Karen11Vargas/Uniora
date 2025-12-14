import { useEffect, useMemo, useState } from 'react';
import { api, ServiceRequest } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RefreshCcw, Send, FileText, Wrench, Shield, Building2 } from 'lucide-react';

const statusStyles: Record<ServiceRequest['status'], string> = {
  abierto: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
  'en-progreso': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
  cerrado: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
};

const categoryIcons: Record<ServiceRequest['category'], JSX.Element> = {
  mantenimiento: <Wrench className="w-4 h-4" />,
  seguridad: <Shield className="w-4 h-4" />,
  administrativo: <Building2 className="w-4 h-4" />,
  otro: <FileText className="w-4 h-4" />
};

export function RequestCenter() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'mantenimiento' as ServiceRequest['category'],
    requestedBy: ''
  });

  useEffect(() => {
    loadRequests();
  }, []);

  const stats = useMemo(() => {
    const abiertos = requests.filter((r) => r.status === 'abierto').length;
    const enCurso = requests.filter((r) => r.status === 'en-progreso').length;
    const cerrados = requests.filter((r) => r.status === 'cerrado').length;
    return { abiertos, enCurso, cerrados };
  }, [requests]);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await api.getRequests();
      setRequests(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'No se pudieron cargar las solicitudes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!form.title || !form.description) {
      alert('Completa título y descripción');
      return;
    }

    try {
      setCreating(true);
      const created = await api.createRequest(form);
      setRequests((prev) => [created, ...prev]);
      setDialogOpen(false);
      setForm({ title: '', description: '', category: 'mantenimiento', requestedBy: '' });
    } catch (err: any) {
      alert(err.message || 'No pudimos registrar la solicitud');
    } finally {
      setCreating(false);
    }
  };

  const handleStatus = async (req: ServiceRequest, status: ServiceRequest['status']) => {
    try {
      const updated = await api.updateRequestStatus(req.id, status);
      setRequests((prev) => prev.map((r) => (r.id === req.id ? updated : r)));
    } catch (err: any) {
      alert(err.message || 'No pudimos actualizar el estado');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 dark:text-gray-100">Solicitudes y PQRS</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Registra requerimientos, asigna prioridades y monitorea su estado
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadRequests} className="gap-2">
            <RefreshCcw className="w-4 h-4" />
            Actualizar
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Send className="w-4 h-4" />
                Nueva solicitud
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[560px]">
              <DialogHeader>
                <DialogTitle>Crear solicitud</DialogTitle>
                <DialogDescription>Describe el caso y selecciona su categoría</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Ej: Daño en ascensor de torre 1"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Explica el detalle, impacto y fotos si aplica"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Categoría</Label>
                  <Select
                    value={form.category}
                    onValueChange={(value: ServiceRequest['category']) =>
                      setForm((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                      <SelectItem value="seguridad">Seguridad</SelectItem>
                      <SelectItem value="administrativo">Administrativo</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="requestedBy">Reportado por</Label>
                  <Input
                    id="requestedBy"
                    value={form.requestedBy}
                    onChange={(e) => setForm((prev) => ({ ...prev, requestedBy: e.target.value }))}
                    placeholder="Ej: Torres 1 apto 301"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreate} disabled={creating} className="gap-2">
                  <Send className="w-4 h-4" />
                  {creating ? 'Enviando...' : 'Crear solicitud'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Abiertas</CardTitle>
            <CardDescription>Solicitudes nuevas pendientes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{stats.abiertos}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>En progreso</CardTitle>
            <CardDescription>Asignadas a personal</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{stats.enCurso}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cerradas</CardTitle>
            <CardDescription>Resueltas en el periodo</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{stats.cerrados}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {loading && <p className="text-sm text-gray-500">Cargando solicitudes...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && requests.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Sin solicitudes</CardTitle>
              <CardDescription>Cuando alguien reporte un caso aparecerá aquí</CardDescription>
            </CardHeader>
          </Card>
        )}

        {requests.map((req) => (
          <Card key={req.id} className="border border-gray-200 dark:border-gray-800">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="gap-1">
                    {categoryIcons[req.category]}
                    <span className="capitalize">{req.category}</span>
                  </Badge>
                  <Badge className={statusStyles[req.status]}>{req.status}</Badge>
                </div>
                <CardTitle className="text-lg">{req.title}</CardTitle>
                <CardDescription>{req.description}</CardDescription>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>{new Date(req.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-400">{req.requestedBy}</p>
              </div>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatus(req, 'abierto')}
                disabled={req.status === 'abierto'}
              >
                Marcar abierto
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatus(req, 'en-progreso')}
                disabled={req.status === 'en-progreso'}
              >
                En progreso
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatus(req, 'cerrado')}
                disabled={req.status === 'cerrado'}
              >
                Cerrar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
