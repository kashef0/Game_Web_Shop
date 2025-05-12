

export interface User {
  id: string;
  name: string;
  email: string;
  profilePic: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthLogin {
    id: string;
    name: string;
    email: string;
    role: 'user';
    profilePic: string;
}


export interface UserOrder {
    _id: string;
    name: string;
    email: string;
    role: 'user';
    profilePic?: string;
  }