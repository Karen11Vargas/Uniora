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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options
  });

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
    })
};
