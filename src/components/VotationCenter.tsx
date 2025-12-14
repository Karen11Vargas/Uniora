import { useEffect, useMemo, useState } from 'react';
import { api, Votation } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CalendarClock, CheckCircle2, Plus, Vote } from 'lucide-react';

interface DraftOption {
  id: string;
  label: string;
}

const statusBadge: Record<Votation['status'], string> = {
  abierta: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  cerrada: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
};

export function VotationCenter() {
  const [votations, setVotations] = useState<Votation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<{ title: string; description: string; closesAt: string; options: DraftOption[] }>(
    {
      title: '',
      description: '',
      closesAt: '',
      options: [
        { id: crypto.randomUUID(), label: 'A favor' },
        { id: crypto.randomUUID(), label: 'En contra' }
      ]
    }
  );

  useEffect(() => {
    loadVotations();
  }, []);

  const loadVotations = async () => {
    try {
      setLoading(true);
      const data = await api.getVotations();
      setVotations(data);
    } catch (err: any) {
      setError(err.message || 'No se pudo cargar el módulo de votaciones');
    } finally {
      setLoading(false);
    }
  };

  const openCount = useMemo(() => votations.filter((v) => v.status === 'abierta').length, [votations]);

  const handleCreate = async () => {
    if (!draft.title || !draft.description || !draft.closesAt || draft.options.some((o) => !o.label.trim())) {
      alert('Completa título, descripción, fecha de cierre y opciones');
      return;
    }

    try {
      setCreating(true);
      const payload = {
        title: draft.title,
        description: draft.description,
        closesAt: draft.closesAt,
        options: draft.options.map((o) => ({ label: o.label }))
      };
      const created = await api.createVotation(payload);
      setVotations((prev) => [created, ...prev]);
      setDialogOpen(false);
      setDraft({
        title: '',
        description: '',
        closesAt: '',
        options: [
          { id: crypto.randomUUID(), label: 'A favor' },
          { id: crypto.randomUUID(), label: 'En contra' }
        ]
      });
    } catch (err: any) {
      alert(err.message || 'No pudimos crear la votación');
    } finally {
      setCreating(false);
    }
  };

  const handleVote = async (votationId: string, optionId: string) => {
    try {
      const updated = await api.submitVote(votationId, optionId);
      setVotations((prev) => prev.map((v) => (v.id === votationId ? updated : v)));
    } catch (err: any) {
      alert(err.message || 'No pudimos registrar tu voto');
    }
  };

  const totalVotes = (v: Votation) => v.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 dark:text-gray-100">Votaciones y asambleas</h2>
          <p className="text-gray-500 dark:text-gray-400">Crea votaciones formales y da seguimiento en tiempo real</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nueva votación
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[640px]">
            <DialogHeader>
              <DialogTitle>Crear votación</DialogTitle>
              <DialogDescription>Define las opciones y la fecha de cierre</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Tema</Label>
                <Input
                  id="title"
                  value={draft.title}
                  onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej: Remodelación de piscina"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={draft.description}
                  onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Contexto, presupuesto y responsables"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="closesAt">Fecha de cierre</Label>
                <Input
                  id="closesAt"
                  type="date"
                  value={draft.closesAt}
                  onChange={(e) => setDraft((prev) => ({ ...prev, closesAt: e.target.value }))}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label>Opciones</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    onClick={() => setDraft((prev) => ({ ...prev, options: [...prev.options, { id: crypto.randomUUID(), label: '' }] }))}
                  >
                    <Plus className="w-4 h-4" /> Agregar opción
                  </Button>
                </div>
                <div className="grid gap-2">
                  {draft.options.map((option, index) => (
                    <Input
                      key={option.id}
                      value={option.label}
                      onChange={(e) =>
                        setDraft((prev) => {
                          const updated = [...prev.options];
                          updated[index] = { ...option, label: e.target.value };
                          return { ...prev, options: updated };
                        })
                      }
                      placeholder={`Opción ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <Button className="w-full" onClick={handleCreate} disabled={creating}>
              {creating ? 'Creando...' : 'Publicar votación'}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="w-4 h-4" /> Votaciones activas
            </CardTitle>
            <CardDescription>Disponibles para votar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{openCount}</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{votations.length} totales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="w-4 h-4" /> Próximo cierre
            </CardTitle>
            <CardDescription>Fecha más cercana de finalización</CardDescription>
          </CardHeader>
          <CardContent>
            {votations.length ? (
              <p className="text-sm text-gray-900 dark:text-gray-100">
                {votations
                  .filter((v) => v.status === 'abierta')
                  .sort((a, b) => a.closesAt.localeCompare(b.closesAt))[0]?.closesAt || 'Sin fecha próxima'}
              </p>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Sin registros</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Seguimiento
            </CardTitle>
            <CardDescription>Conteo actualizado en vivo</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">Recarga la página para sincronizar con nuevos votos.</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="text-gray-500 dark:text-gray-300">Cargando votaciones...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {votations.map((votation) => (
            <Card key={votation.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{votation.title}</CardTitle>
                    <CardDescription>{votation.description}</CardDescription>
                  </div>
                  <Badge className={statusBadge[votation.status]}>{votation.status}</Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cierra: {votation.closesAt}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2">
                  {votation.options.map((option) => (
                    <div key={option.id} className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 p-3">
                      <div>
                        <p className="text-gray-900 dark:text-gray-100 font-medium">{option.label}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{option.votes} votos</p>
                      </div>
                      {votation.status === 'abierta' && (
                        <Button size="sm" onClick={() => handleVote(votation.id, option.id)}>Votar</Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={votation.options} margin={{ top: 10, left: 0, right: 0 }}>
                      <XAxis dataKey="label" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="votes" fill="#2563eb" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">Total de votos: {totalVotes(votation)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
