import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const projectStats = [
  { name: 'En progreso', value: 5, color: '#3b82f6' },
  { name: 'Completados', value: 8, color: '#10b981' },
  { name: 'Pendientes', value: 3, color: '#f59e0b' },
  { name: 'Retrasados', value: 2, color: '#ef4444' }
];

const monthlyData = [
  { month: 'Ene', proyectos: 4, gastos: 12500 },
  { month: 'Feb', proyectos: 6, gastos: 18900 },
  { month: 'Mar', proyectos: 5, gastos: 15200 },
  { month: 'Abr', proyectos: 7, gastos: 22100 },
  { month: 'May', proyectos: 8, gastos: 25400 },
  { month: 'Jun', proyectos: 6, gastos: 19800 }
];

const recentProjects = [
  { id: 1, name: 'Rediseño Web Corporativo', status: 'en-progreso', progress: 65, budget: 15000, spent: 9750 },
  { id: 2, name: 'App Móvil E-commerce', status: 'en-progreso', progress: 40, budget: 25000, spent: 10000 },
  { id: 3, name: 'Sistema CRM', status: 'retrasado', progress: 30, budget: 18000, spent: 12000 },
  { id: 4, name: 'Campaña Marketing Digital', status: 'completado', progress: 100, budget: 8000, spent: 7500 }
];

export function ProjectDashboard() {
  const totalBudget = recentProjects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = recentProjects.reduce((sum, p) => sum + p.spent, 0);
  const budgetUsage = (totalSpent / totalBudget) * 100;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Proyectos Activos</CardTitle>
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 dark:text-gray-100">5</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span className="text-green-600 dark:text-green-400 inline-flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +2 este mes
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Tareas Completadas</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 dark:text-gray-100">127</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span className="text-green-600 dark:text-green-400 inline-flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +15 esta semana
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Presupuesto Total</CardTitle>
            <DollarSign className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 dark:text-gray-100">${totalBudget.toLocaleString()}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Usado: ${totalSpent.toLocaleString()} ({budgetUsage.toFixed(0)}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Alertas</CardTitle>
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 dark:text-gray-100">2</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span className="text-red-600 dark:text-red-400 inline-flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                Proyectos retrasados
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Estado de Proyectos</CardTitle>
            <CardDescription>Distribución actual de proyectos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividad Mensual</CardTitle>
            <CardDescription>Proyectos y gastos por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="proyectos" fill="#3b82f6" name="Proyectos" />
                <Bar yAxisId="right" dataKey="gastos" fill="#10b981" name="Gastos ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Proyectos Recientes</CardTitle>
          <CardDescription>Estado y progreso de proyectos activos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="text-gray-900 dark:text-gray-100">{project.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          project.status === 'completado'
                            ? 'default'
                            : project.status === 'retrasado'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {project.status === 'en-progreso' && 'En Progreso'}
                        {project.status === 'completado' && 'Completado'}
                        {project.status === 'retrasado' && 'Retrasado'}
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Presupuesto: ${project.budget.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-900 dark:text-gray-100">{project.progress}%</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Gastado: ${project.spent.toLocaleString()}
                    </div>
                  </div>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
