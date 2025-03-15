
import { useToast } from "@/hooks/use-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Mock user database
const users: { [key: string]: User } = {
  "user1@example.com": {
    id: "user1",
    name: "John Doe",
    email: "user1@example.com",
    createdAt: new Date("2023-01-01"),
  },
};

// Mock password database (in a real app, passwords would be hashed)
const passwords: { [key: string]: string } = {
  "user1@example.com": "password123",
};

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export class AuthService {
  static isAuthenticated(): boolean {
    return localStorage.getItem("user") !== null;
  }

  static getCurrentUser(): User | null {
    const userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
  }

  static async login({ email, password, rememberMe }: LoginCredentials): Promise<User> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user exists and password matches
    if (!users[email] || passwords[email] !== password) {
      throw new Error("Invalid email or password");
    }

    const user = users[email];
    
    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(user));
    
    // If remember me is checked, save the session for a longer period
    if (rememberMe) {
      localStorage.setItem("sessionDuration", "30days");
    }

    return user;
  }

  static async signUp({ name, email, password }: SignUpData): Promise<User> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user already exists
    if (users[email]) {
      throw new Error("User with this email already exists");
    }

    // Create new user
    const newUser: User = {
      id: `user${Object.keys(users).length + 1}`,
      name,
      email,
      createdAt: new Date(),
    };

    // Save user to mock database
    users[email] = newUser;
    passwords[email] = password;

    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(newUser));

    return newUser;
  }

  static logout(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("sessionDuration");
  }
}
