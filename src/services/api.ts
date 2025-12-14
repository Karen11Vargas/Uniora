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
  const url = path.startsWith('http')
    ? path
    : path.startsWith(API_URL)
      ? path
      : `${API_URL}${path}`;
  let response: Response;

  try {
    response = await fetch(url, {
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

export function createApiClient(baseUrl = API_URL) {
  const withBase = (path: string) => {
    const normalizedBase = baseUrl.replace(/\/$/, '');
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${normalizedBase}${normalizedPath}`;
  };

  return {
    login: (payload: LoginPayload) =>
      request<LoginResponse>(withBase('/auth/login'), {
        method: 'POST',
        body: JSON.stringify(payload)
      }),

    registerCommunity: (payload: CommunityRequest) =>
      request<{ message: string }>(withBase('/community'), {
        method: 'POST',
        body: JSON.stringify(payload)
      }),

    getFinances: () => request<FinanceRecord[]>(withBase('/finances')),

    createFinance: (payload: Omit<FinanceRecord, 'id'>) =>
      request<FinanceRecord>(withBase('/finances'), {
        method: 'POST',
        body: JSON.stringify(payload)
      }),

    getProjects: () => request<Project[]>(withBase('/projects')),

    createProject: (payload: Omit<Project, 'id' | 'tasks' | 'spent'> & { tasks?: ProjectTask[] }) =>
      request<Project>(withBase('/projects'), {
        method: 'POST',
        body: JSON.stringify(payload)
      }),

    toggleTask: (projectId: string, taskId: string) =>
      request<Project>(withBase(`/projects/${projectId}/tasks/${taskId}`), {
        method: 'PATCH'
      }),

    // Usuarios
    getUsers: () => request<ManagedUser[]>(withBase('/users')),

    createUser: (payload: Omit<ManagedUser, 'id' | 'status'> & { password: string }) =>
      request<ManagedUser>(withBase('/users'), {
        method: 'POST',
        body: JSON.stringify(payload)
      }),

    updateUserStatus: (userId: string, status: ManagedUser['status']) =>
      request<ManagedUser>(withBase(`/users/${userId}/status`), {
        method: 'PATCH',
        body: JSON.stringify({ status })
      }),

    // Votaciones
    getVotations: () => request<Votation[]>(withBase('/votations')),

    createVotation: (payload: { title: string; description: string; closesAt: string; options: { label: string }[]; createdBy?: string }) =>
      request<Votation>(withBase('/votations'), {
        method: 'POST',
        body: JSON.stringify(payload)
      }),

    submitVote: (votationId: string, optionId: string) =>
      request<Votation>(withBase(`/votations/${votationId}/vote`), {
        method: 'POST',
        body: JSON.stringify({ optionId })
      })
  } as const;
}

export const api = createApiClient();

// Permite importar el cliente como default para compatibilidad con código previo
export default api;

