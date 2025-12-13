import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { Plus, MoreVertical, Calendar, Users, DollarSign, CheckCircle2, Circle, Clock } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { api, Project } from '../services/api';

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'pendiente' as Project['status'],
    priority: 'media' as Project['priority'],
    startDate: '',
    endDate: '',
    budget: '',
    team: ''
  });

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await api.getProjects();
        setProjects(data);
      } catch (error: any) {
        alert(error.message || 'No pudimos cargar los proyectos');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateProject = async () => {
    try {
      const payload = {
        ...formData,
        budget: Number(formData.budget),
        team: formData.team ? formData.team.split(',').map((member) => member.trim()).filter(Boolean) : [],
        spent: 0
      } as any;

      const created = await api.createProject(payload);
      setProjects((prev) => [created, ...prev]);
      setDialogOpen(false);
      setFormData({ name: '', description: '', status: 'pendiente', priority: 'media', startDate: '', endDate: '', budget: '', team: '' });
    } catch (error: any) {
      alert(error.message || 'No pudimos crear el proyecto');
    }
  };

  const toggleTask = async (projectId: string, taskId: string) => {
    try {
      const updated = await api.toggleTask(projectId, taskId);
      setProjects((prev) => prev.map((project) => (project.id === updated.id ? updated : project)));
    } catch (error: any) {
      alert(error.message || 'No pudimos actualizar la tarea');
    }
  };

  const getProgress = (project: Project) => {
    const completed = project.tasks.filter(t => t.completed).length;
    return project.tasks.length ? (completed / project.tasks.length) * 100 : 0;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completado':
        return <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />;
      case 'en-progreso':
        return <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'retrasado':
        return <Circle className="w-4 h-4 text-red-600 dark:text-red-400" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  if (loading) {
    return <div className="text-gray-500 dark:text-gray-300">Cargando proyectos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 dark:text-gray-100">Gestión de Proyectos</h2>
          <p className="text-gray-500 dark:text-gray-400">Administra tus proyectos y tareas</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Proyecto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
              <DialogDescription>
                Ingresa los detalles del nuevo proyecto
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Proyecto</Label>
                <Input
                  id="name"
                  placeholder="Ej: Nuevo sitio web"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe el proyecto..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Presupuesto</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="0"
                    value={formData.budget}
                    onChange={(e) => handleChange('budget', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Fecha Inicio</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Fecha Fin</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="team">Equipo (separa por comas)</Label>
                <Input
                  id="team"
                  placeholder="Ej: Ana García, Carlos López"
                  value={formData.team}
                  onChange={(e) => handleChange('team', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="en-progreso">En progreso</SelectItem>
                    <SelectItem value="completado">Completado</SelectItem>
                    <SelectItem value="retrasado">Retrasado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleCreateProject}>Crear Proyecto</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => {
          const progress = getProgress(project);
          const budgetUsage = (project.spent / project.budget) * 100;

          return (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(project.status)}
                      <CardTitle>{project.name}</CardTitle>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedProject(project)}>
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Badge
                    variant={
                      project.priority === 'alta'
                        ? 'destructive'
                        : project.priority === 'media'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                  </Badge>
                  <Badge
                    variant={
                      project.status === 'completado'
                        ? 'default'
                        : project.status === 'retrasado'
                        ? 'destructive'
                        : 'outline'
                    }
                  >
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Progreso</span>
                    <span className="text-gray-900 dark:text-gray-100">{progress.toFixed(0)}%</span>
                  </div>
                  <Progress value={progress} />
                </div>

                <div className="grid grid-cols-3 gap-4 py-3 border-t border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Fecha límite</div>
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {new Date(project.endDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Equipo</div>
                      <div className="text-sm text-gray-900 dark:text-gray-100">{project.team.length} miembros</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Presupuesto</div>
                      <div className="text-sm text-gray-900 dark:text-gray-100">{budgetUsage.toFixed(0)}%</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-900 dark:text-gray-100">Tareas ({project.tasks.filter(t => t.completed).length}/{project.tasks.length})</div>
                  {project.tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-2">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(project.id, task.id)}
                      />
                      <span className={task.completed ? 'text-sm text-gray-500 dark:text-gray-400 line-through' : 'text-sm text-gray-700 dark:text-gray-300'}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
