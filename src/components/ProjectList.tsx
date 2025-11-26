import { useState } from 'react';
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

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: 'pendiente' | 'en-progreso' | 'completado' | 'retrasado';
  priority: 'baja' | 'media' | 'alta';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  team: string[];
  tasks: Task[];
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: 'Rediseño Web Corporativo',
    description: 'Actualización completa del sitio web corporativo con nuevo diseño responsive',
    status: 'en-progreso',
    priority: 'alta',
    startDate: '2025-01-15',
    endDate: '2025-03-30',
    budget: 15000,
    spent: 9750,
    team: ['Ana García', 'Carlos López', 'María Fernández'],
    tasks: [
      { id: 1, title: 'Diseño UI/UX', completed: true },
      { id: 2, title: 'Desarrollo Frontend', completed: true },
      { id: 3, title: 'Desarrollo Backend', completed: false },
      { id: 4, title: 'Testing y QA', completed: false }
    ]
  },
  {
    id: 2,
    name: 'App Móvil E-commerce',
    description: 'Desarrollo de aplicación móvil para plataforma de ventas',
    status: 'en-progreso',
    priority: 'alta',
    startDate: '2025-02-01',
    endDate: '2025-05-15',
    budget: 25000,
    spent: 10000,
    team: ['Pedro Martínez', 'Laura Ruiz'],
    tasks: [
      { id: 1, title: 'Prototipo', completed: true },
      { id: 2, title: 'Desarrollo iOS', completed: false },
      { id: 3, title: 'Desarrollo Android', completed: false },
      { id: 4, title: 'Integración APIs', completed: false }
    ]
  },
  {
    id: 3,
    name: 'Sistema CRM',
    description: 'Implementación de sistema de gestión de relaciones con clientes',
    status: 'retrasado',
    priority: 'media',
    startDate: '2024-12-01',
    endDate: '2025-02-28',
    budget: 18000,
    spent: 12000,
    team: ['José Torres', 'Carmen Silva'],
    tasks: [
      { id: 1, title: 'Análisis de requisitos', completed: true },
      { id: 2, title: 'Configuración base', completed: true },
      { id: 3, title: 'Personalización', completed: false },
      { id: 4, title: 'Migración de datos', completed: false }
    ]
  },
  {
    id: 4,
    name: 'Campaña Marketing Digital',
    description: 'Campaña de marketing en redes sociales y Google Ads',
    status: 'completado',
    priority: 'media',
    startDate: '2024-11-01',
    endDate: '2025-01-31',
    budget: 8000,
    spent: 7500,
    team: ['Sandra Morales'],
    tasks: [
      { id: 1, title: 'Estrategia de contenido', completed: true },
      { id: 2, title: 'Diseño de creatividades', completed: true },
      { id: 3, title: 'Ejecución de campaña', completed: true },
      { id: 4, title: 'Análisis de resultados', completed: true }
    ]
  }
];

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const toggleTask = (projectId: number, taskId: number) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      }
      return project;
    }));
  };

  const getProgress = (project: Project) => {
    const completed = project.tasks.filter(t => t.completed).length;
    return (completed / project.tasks.length) * 100;
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 dark:text-gray-100">Gestión de Proyectos</h2>
          <p className="text-gray-500 dark:text-gray-400">Administra tus proyectos y tareas</p>
        </div>
        <Dialog>
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
                <Input id="name" placeholder="Ej: Nuevo sitio web" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" placeholder="Describe el proyecto..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select>
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
                  <Input id="budget" type="number" placeholder="0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Fecha Inicio</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Fecha Fin</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancelar</Button>
              <Button>Crear Proyecto</Button>
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
