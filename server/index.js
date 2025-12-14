const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let users = [
  { id: uuidv4(), email: 'admin@uniora.com', password: 'admin123', userType: 'admin', name: 'Administradora Demo', status: 'activo', phone: '+57 300 000 0000' },
  { id: uuidv4(), email: 'propietario@uniora.com', password: 'owner123', userType: 'owner', name: 'Propietario Demo', status: 'activo', phone: '+57 300 000 0001' },
  { id: uuidv4(), email: 'comite@uniora.com', password: 'committee123', userType: 'committee', name: 'Miembro Comité Demo', status: 'activo', phone: '+57 300 000 0002' }
];

let votations = [
  {
    id: uuidv4(),
    title: 'Cambio de portería inteligente',
    description: 'Votación para aprobar la instalación de un sistema de ingreso biométrico',
    status: 'abierta',
    closesAt: '2025-07-15',
    createdBy: 'Miembro Comité Demo',
    options: [
      { id: uuidv4(), label: 'A favor', votes: 12 },
      { id: uuidv4(), label: 'En contra', votes: 3 },
      { id: uuidv4(), label: 'Necesita más información', votes: 1 }
    ]
  },
  {
    id: uuidv4(),
    title: 'Presupuesto de jardinería',
    description: 'Aprobación de mantenimiento trimestral de zonas verdes',
    status: 'cerrada',
    closesAt: '2025-06-30',
    createdBy: 'Administradora Demo',
    options: [
      { id: uuidv4(), label: 'A favor', votes: 22 },
      { id: uuidv4(), label: 'En contra', votes: 4 }
    ]
  }
];

let communityRequests = [];

let projects = [
  {
    id: '1',
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
      { id: '1', title: 'Diseño UI/UX', completed: true },
      { id: '2', title: 'Desarrollo Frontend', completed: true },
      { id: '3', title: 'Desarrollo Backend', completed: false },
      { id: '4', title: 'Testing y QA', completed: false }
    ]
  },
  {
    id: '2',
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
      { id: '1', title: 'Prototipo', completed: true },
      { id: '2', title: 'Desarrollo iOS', completed: false },
      { id: '3', title: 'Desarrollo Android', completed: false },
      { id: '4', title: 'Integración APIs', completed: false }
    ]
  },
  {
    id: '3',
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
      { id: '1', title: 'Análisis de requisitos', completed: true },
      { id: '2', title: 'Configuración base', completed: true },
      { id: '3', title: 'Personalización', completed: false },
      { id: '4', title: 'Migración de datos', completed: false }
    ]
  },
  {
    id: '4',
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
      { id: '1', title: 'Estrategia de contenido', completed: true },
      { id: '2', title: 'Diseño de creatividades', completed: true },
      { id: '3', title: 'Ejecución de campaña', completed: true },
      { id: '4', title: 'Análisis de resultados', completed: true }
    ]
  }
];

let finances = [
  { id: '1', date: '2025-06-15', category: 'Desarrollo', project: 'Rediseño Web', description: 'Desarrollo Frontend', amount: 5000, type: 'gasto' },
  { id: '2', date: '2025-06-14', category: 'Diseño', project: 'App Móvil', description: 'Diseño UI/UX', amount: 3500, type: 'gasto' },
  { id: '3', date: '2025-06-12', category: 'Marketing', project: 'Campaña Digital', description: 'Google Ads', amount: 2000, type: 'gasto' },
  { id: '4', date: '2025-06-10', category: 'Operaciones', project: 'General', description: 'Licencias software', amount: 800, type: 'gasto' },
  { id: '5', date: '2025-06-08', category: 'Ingreso', project: 'Cliente A', description: 'Pago parcial proyecto', amount: 15000, type: 'ingreso' },
  { id: '6', date: '2025-06-05', category: 'Desarrollo', project: 'Sistema CRM', description: 'Backend development', amount: 4500, type: 'gasto' },
  { id: '7', date: '2025-06-03', category: 'Diseño', project: 'Rediseño Web', description: 'Diseño de prototipos', amount: 2800, type: 'gasto' },
  { id: '8', date: '2025-06-01', category: 'Ingreso', project: 'Cliente B', description: 'Pago proyecto completado', amount: 25000, type: 'ingreso' }
];

app.post('/api/auth/login', (req, res) => {
  const { email, password, userType } = req.body || {};
  if (!email || !password || !userType) {
    return res.status(400).json({ message: 'Faltan credenciales' });
  }

  const user = users.find((u) => u.email === email && u.password === password && u.userType === userType);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  return res.json({
    token: uuidv4(),
    userType: user.userType,
    user: { email: user.email, name: user.name }
  });
});

app.get('/api/users', (_req, res) => {
  const sanitizedUsers = users.map(({ password, ...rest }) => rest);
  res.json(sanitizedUsers);
});

app.post('/api/users', (req, res) => {
  const { name, email, phone, userType, password } = req.body || {};
  if (!name || !email || !userType || !password) {
    return res.status(400).json({ message: 'Datos incompletos para crear el usuario' });
  }

  const exists = users.some((u) => u.email === email);
  if (exists) {
    return res.status(409).json({ message: 'Ya existe un usuario con ese correo' });
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    phone: phone || '',
    userType,
    password,
    status: 'activo'
  };

  users = [...users, newUser];
  const { password: _, ...safeUser } = newUser;
  res.status(201).json(safeUser);
});

app.patch('/api/users/:userId/status', (req, res) => {
  const { userId } = req.params;
  const { status } = req.body || {};

  if (!['activo', 'inactivo'].includes(status)) {
    return res.status(400).json({ message: 'Estado inválido' });
  }

  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) return res.status(404).json({ message: 'Usuario no encontrado' });

  users[userIndex] = { ...users[userIndex], status };
  const { password, ...safeUser } = users[userIndex];
  res.json(safeUser);
});

app.post('/api/community', (req, res) => {
  const request = { id: uuidv4(), ...req.body, createdAt: new Date().toISOString() };
  communityRequests.push(request);
  res.status(201).json({ message: 'Solicitud registrada', request });
});

app.get('/api/projects', (_req, res) => {
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  const { name, description, status, priority, startDate, endDate, budget, team } = req.body || {};
  if (!name || !description || !status || !priority || !startDate || !endDate || !budget) {
    return res.status(400).json({ message: 'Datos incompletos para el proyecto' });
  }

  const newProject = {
    id: uuidv4(),
    name,
    description,
    status,
    priority,
    startDate,
    endDate,
    budget: Number(budget),
    spent: 0,
    team: team || [],
    tasks: []
  };

  projects.push(newProject);
  res.status(201).json(newProject);
});

app.patch('/api/projects/:projectId/tasks/:taskId', (req, res) => {
  const { projectId, taskId } = req.params;
  const project = projects.find((p) => p.id === projectId);
  if (!project) return res.status(404).json({ message: 'Proyecto no encontrado' });

  const task = project.tasks.find((t) => t.id === taskId);
  if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

  task.completed = !task.completed;
  res.json(project);
});

app.get('/api/finances', (_req, res) => {
  res.json(finances);
});

app.post('/api/finances', (req, res) => {
  const { date, category, project, description, amount, type } = req.body || {};
  if (!date || !category || !description || !amount || !type) {
    return res.status(400).json({ message: 'Datos incompletos para la transacción' });
  }

  const newTransaction = {
    id: uuidv4(),
    date,
    category,
    project: project || 'General',
    description,
    amount: Number(amount),
    type
  };

  finances = [newTransaction, ...finances];
  res.status(201).json(newTransaction);
});

app.get('/api/votations', (_req, res) => {
  res.json(votations);
});

app.post('/api/votations', (req, res) => {
  const { title, description, closesAt, options, createdBy } = req.body || {};

  if (!title || !description || !closesAt || !options?.length) {
    return res.status(400).json({ message: 'Datos incompletos para la votación' });
  }

  const formattedOptions = options.map((option) => ({ id: uuidv4(), label: option.label || option, votes: 0 }));

  const newVotation = {
    id: uuidv4(),
    title,
    description,
    closesAt,
    createdBy: createdBy || 'Comité',
    status: 'abierta',
    options: formattedOptions
  };

  votations = [newVotation, ...votations];
  res.status(201).json(newVotation);
});

app.post('/api/votations/:votationId/vote', (req, res) => {
  const { votationId } = req.params;
  const { optionId } = req.body || {};

  const votation = votations.find((v) => v.id === votationId);
  if (!votation) return res.status(404).json({ message: 'Votación no encontrada' });
  if (votation.status !== 'abierta') return res.status(400).json({ message: 'La votación está cerrada' });

  const option = votation.options.find((o) => o.id === optionId);
  if (!option) return res.status(404).json({ message: 'Opción no encontrada' });

  option.votes += 1;
  res.json(votation);
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
