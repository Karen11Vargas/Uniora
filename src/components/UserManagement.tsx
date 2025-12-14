import { useEffect, useMemo, useState } from 'react';
import { api, ManagedUser, UserType } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Plus, RefreshCcw, ShieldCheck, Users as UsersIcon } from 'lucide-react';

const statusStyles: Record<ManagedUser['status'], string> = {
  activo: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  inactivo: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
};

export function UserManagement() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newUser, setNewUser] = useState<{ name: string; email: string; phone: string; userType: UserType; password: string }>(
    { name: '', email: '', phone: '', userType: 'owner', password: '' }
  );

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await api.getUsers();
      setUsers(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'No se pudo cargar el listado de usuarios');
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const activos = users.filter((u) => u.status === 'activo').length;
    const inactivos = users.length - activos;
    const porRol = users.reduce<Record<UserType, number>>((acc, user) => {
      acc[user.userType] = (acc[user.userType] || 0) + 1;
      return acc;
    }, { admin: 0, owner: 0, committee: 0 });

    return { activos, inactivos, porRol };
  }, [users]);

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert('Completa nombre, correo y contraseña');
      return;
    }

    try {
      setCreating(true);
      const created = await api.createUser(newUser);
      setUsers((prev) => [...prev, created]);
      setDialogOpen(false);
      setNewUser({ name: '', email: '', phone: '', userType: 'owner', password: '' });
    } catch (err: any) {
      alert(err.message || 'No pudimos crear el usuario');
    } finally {
      setCreating(false);
    }
  };

  const handleToggleStatus = async (user: ManagedUser) => {
    const nextStatus = user.status === 'activo' ? 'inactivo' : 'activo';
    try {
      const updated = await api.updateUserStatus(user.id, nextStatus);
      setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
    } catch (err: any) {
      alert(err.message || 'No pudimos actualizar el estado');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 dark:text-gray-100">Gestión de usuarios</h2>
          <p className="text-gray-500 dark:text-gray-400">Administra propietarios, comité y perfiles administrativos</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={loadUsers}>
            <RefreshCcw className="w-4 h-4" />
            Actualizar
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Nuevo usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[520px]">
              <DialogHeader>
                <DialogTitle>Crear usuario</DialogTitle>
                <DialogDescription>Define el rol y acceso del nuevo integrante</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: Laura Gómez"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="usuario@uniora.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+57 300 000 0000"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Rol</Label>
                  <Select value={newUser.userType} onValueChange={(value: UserType) => setNewUser((prev) => ({ ...prev, userType: value }))}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="owner">Propietario</SelectItem>
                      <SelectItem value="committee">Comité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
                  />
                </div>
              </div>
              <Button onClick={handleCreateUser} disabled={creating} className="w-full">
                {creating ? 'Creando...' : 'Crear usuario'}
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="w-4 h-4" /> Usuarios activos
            </CardTitle>
            <CardDescription>Total habilitados en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{stats.activos}</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stats.inactivos} inactivos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Propietarios
            </CardTitle>
            <CardDescription>Cuentas con acceso a reportes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{stats.porRol.owner}</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stats.porRol.admin} admins | {stats.porRol.committee} comité</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" /> Estado general
            </CardTitle>
            <CardDescription>Última sincronización con el backend</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">{loading ? 'Cargando...' : 'Datos al día'}</p>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado</CardTitle>
          <CardDescription>Activa o suspende accesos en tiempo real</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {loading ? (
            <div className="text-gray-500 dark:text-gray-300">Cargando usuarios...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {user.userType === 'admin' ? 'Administrador' : user.userType === 'owner' ? 'Propietario' : 'Comité'}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.phone || 'Sin registrar'}</TableCell>
                    <TableCell>
                      <Badge className={statusStyles[user.status]}>{user.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStatus(user)}
                      >
                        {user.status === 'activo' ? 'Suspender' : 'Reactivar'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
