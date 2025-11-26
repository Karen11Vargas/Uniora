import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Plus, TrendingUp, TrendingDown, DollarSign, CreditCard, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Expense {
  id: number;
  date: string;
  category: string;
  project: string;
  description: string;
  amount: number;
  type: 'gasto' | 'ingreso';
}

const monthlyTrend = [
  { month: 'Ene', ingresos: 45000, gastos: 32500, beneficio: 12500 },
  { month: 'Feb', ingresos: 52000, gastos: 33100, beneficio: 18900 },
  { month: 'Mar', ingresos: 48000, gastos: 32800, beneficio: 15200 },
  { month: 'Abr', ingresos: 61000, gastos: 38900, beneficio: 22100 },
  { month: 'May', ingresos: 58000, gastos: 32600, beneficio: 25400 },
  { month: 'Jun', ingresos: 65000, gastos: 45200, beneficio: 19800 }
];

const categoryData = [
  { month: 'Ene', desarrollo: 12000, diseño: 8500, marketing: 7000, operaciones: 5000 },
  { month: 'Feb', desarrollo: 13500, diseño: 7600, marketing: 6500, operaciones: 5500 },
  { month: 'Mar', desarrollo: 14200, diseño: 8100, marketing: 5500, operaciones: 5000 },
  { month: 'Abr', desarrollo: 16800, diseño: 9500, marketing: 7600, operaciones: 5000 },
  { month: 'May', desarrollo: 15200, diseño: 7400, marketing: 5000, operaciones: 5000 },
  { month: 'Jun', desarrollo: 18500, diseño: 11700, marketing: 9500, operaciones: 5500 }
];

const initialExpenses: Expense[] = [
  { id: 1, date: '2025-06-15', category: 'Desarrollo', project: 'Rediseño Web', description: 'Desarrollo Frontend', amount: 5000, type: 'gasto' },
  { id: 2, date: '2025-06-14', category: 'Diseño', project: 'App Móvil', description: 'Diseño UI/UX', amount: 3500, type: 'gasto' },
  { id: 3, date: '2025-06-12', category: 'Marketing', project: 'Campaña Digital', description: 'Google Ads', amount: 2000, type: 'gasto' },
  { id: 4, date: '2025-06-10', category: 'Operaciones', project: 'General', description: 'Licencias software', amount: 800, type: 'gasto' },
  { id: 5, date: '2025-06-08', category: 'Ingreso', project: 'Cliente A', description: 'Pago parcial proyecto', amount: 15000, type: 'ingreso' },
  { id: 6, date: '2025-06-05', category: 'Desarrollo', project: 'Sistema CRM', description: 'Backend development', amount: 4500, type: 'gasto' },
  { id: 7, date: '2025-06-03', category: 'Diseño', project: 'Rediseño Web', description: 'Diseño de prototipos', amount: 2800, type: 'gasto' },
  { id: 8, date: '2025-06-01', category: 'Ingreso', project: 'Cliente B', description: 'Pago proyecto completado', amount: 25000, type: 'ingreso' }
];

export function FinanceDashboard() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  
  const totalIncome = expenses.filter(e => e.type === 'ingreso').reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenses.filter(e => e.type === 'gasto').reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalIncome - totalExpenses;
  const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 dark:text-gray-100">Panel Financiero</h2>
          <p className="text-gray-500 dark:text-gray-400">Monitorea ingresos, gastos y presupuestos</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Registro
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Registrar Transacción</DialogTitle>
              <DialogDescription>
                Añade un nuevo ingreso o gasto
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ingreso">Ingreso</SelectItem>
                    <SelectItem value="gasto">Gasto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Monto</Label>
                <Input id="amount" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desarrollo">Desarrollo</SelectItem>
                    <SelectItem value="diseno">Diseño</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="operaciones">Operaciones</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">Proyecto</Label>
                <Input id="project" placeholder="Nombre del proyecto" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Input id="description" placeholder="Describe la transacción" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input id="date" type="date" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Ingresos Totales</CardTitle>
            <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 dark:text-gray-100">${totalIncome.toLocaleString()}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span className="text-green-600 dark:text-green-400 inline-flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12% vs mes anterior
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Gastos Totales</CardTitle>
            <ArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 dark:text-gray-100">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span className="text-red-600 dark:text-red-400 inline-flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +8% vs mes anterior
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Beneficio Neto</CardTitle>
            <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 dark:text-gray-100">${netProfit.toLocaleString()}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Margen de beneficio: {profitMargin}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Balance Mensual</CardTitle>
            <Wallet className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 dark:text-gray-100">$19,800</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span className="text-green-600 dark:text-green-400 inline-flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Junio 2025
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="trend" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trend">Tendencia Mensual</TabsTrigger>
          <TabsTrigger value="categories">Por Categorías</TabsTrigger>
        </TabsList>

        <TabsContent value="trend">
          <Card>
            <CardHeader>
              <CardTitle>Tendencia Financiera</CardTitle>
              <CardDescription>Comparativa de ingresos, gastos y beneficios</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyTrend}>
                  <defs>
                    <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorBeneficio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="ingresos" stroke="#10b981" fillOpacity={1} fill="url(#colorIngresos)" name="Ingresos" />
                  <Area type="monotone" dataKey="gastos" stroke="#ef4444" fillOpacity={1} fill="url(#colorGastos)" name="Gastos" />
                  <Area type="monotone" dataKey="beneficio" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBeneficio)" name="Beneficio" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Gastos por Categoría</CardTitle>
              <CardDescription>Distribución mensual de gastos</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="desarrollo" stroke="#3b82f6" strokeWidth={2} name="Desarrollo" />
                  <Line type="monotone" dataKey="diseño" stroke="#8b5cf6" strokeWidth={2} name="Diseño" />
                  <Line type="monotone" dataKey="marketing" stroke="#f59e0b" strokeWidth={2} name="Marketing" />
                  <Line type="monotone" dataKey="operaciones" stroke="#10b981" strokeWidth={2} name="Operaciones" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transacciones Recientes</CardTitle>
          <CardDescription>Últimos movimientos financieros</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Proyecto</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>
                    {new Date(expense.date).toLocaleDateString('es-ES', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{expense.category}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">{expense.project}</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">{expense.description}</TableCell>
                  <TableCell className="text-right">
                    <span className={expense.type === 'ingreso' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                      {expense.type === 'ingreso' ? '+' : '-'}${expense.amount.toLocaleString()}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
