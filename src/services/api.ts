export type UserType = 'admin' | 'owner' | 'committee';

export interface LoginPayload {
  email: string;
  password: string;
  userType: UserType;
}

export interface LoginResponse {
  token: string;
  userType: UserType;
  user: {
    email: string;
    name: string;
  };
}

export interface CommunityRequest {
  communityName: string;
  address: string;
  city: string;
  postalCode: string;
  totalUnits: string;
  communityType: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  adminPosition: string;
  description?: string;
  currentSoftware?: string;
}

export interface FinanceRecord {
  id: string;
  date: string;
  category: string;
  project: string;
  description: string;
  amount: number;
  type: 'gasto' | 'ingreso';
}

export interface ProjectTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'pendiente' | 'en-progreso' | 'completado' | 'retrasado';
  priority: 'baja' | 'media' | 'alta';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  team: string[];
  tasks: ProjectTask[];
}

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  userType: UserType;
  status: 'activo' | 'inactivo';
}

export interface VotationOption {
  id: string;
  label: string;
  votes: number;
}

export interface Votation {
  id: string;
  title: string;
  description: string;
  status: 'abierta' | 'cerrada';
  closesAt: string;
  createdBy: string;
  options: VotationOption[];
}

const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
      ...options
    });
  } catch (error) {
    throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté en ejecución.');
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody.message || 'Error al comunicarse con el servidor';
    throw new Error(message);
  }

  return response.json();
}

export const api = {
  login: (payload: LoginPayload) =>
    request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  registerCommunity: (payload: CommunityRequest) =>
    request<{ message: string }>('/community', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  getFinances: () => request<FinanceRecord[]>('/finances'),

  createFinance: (payload: Omit<FinanceRecord, 'id'>) =>
    request<FinanceRecord>('/finances', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  getProjects: () => request<Project[]>('/projects'),

  createProject: (payload: Omit<Project, 'id' | 'tasks' | 'spent'> & { tasks?: ProjectTask[] }) =>
    request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  toggleTask: (projectId: string, taskId: string) =>
    request<Project>(`/projects/${projectId}/tasks/${taskId}`, {
      method: 'PATCH'
    }),

  // Usuarios
  getUsers: () => request<ManagedUser[]>('/users'),

  createUser: (payload: Omit<ManagedUser, 'id' | 'status'> & { password: string }) =>
    request<ManagedUser>('/users', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  updateUserStatus: (userId: string, status: ManagedUser['status']) =>
    request<ManagedUser>(`/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    }),

  // Votaciones
  getVotations: () => request<Votation[]>('/votations'),

  createVotation: (payload: { title: string; description: string; closesAt: string; options: { label: string }[]; createdBy?: string }) =>
    request<Votation>('/votations', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  submitVote: (votationId: string, optionId: string) =>
    request<Votation>(`/votations/${votationId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ optionId })
    })
};

