import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  role: string;
  name?: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const storedUser = localStorage.getItem('user');
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    // }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // console.log('Function is running')
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      // console.log("Login response data: ", data);

      if (response.ok && data.role) {
        const userData = { role: data.role, name: data.name || 'Unnamed User' };

        
        localStorage.setItem('user', JSON.stringify(userData));
        
        const user_Data = localStorage.getItem('user')
        // console.log("response form context api",user_Data);
        // local.storage(Json.parse(user_Data));
        const user_data  = user_Data && JSON.parse(user_Data)
        setUser(user_data ?? null);

        setLoading(false)
        
        return userData;
      } else {
        console.error('Login failed: ', data.message);
        throw new Error(data.message || 'Failed to login');
      }
    } 
    

    
    catch (error) {
      console.error('Login error: ', error);
      throw error;
    }
  };


  useEffect(() => {
   const user_Data = localStorage.getItem('user')
  // console.log("response form context api",user_Data);
  // local.storage(Json.parse(user_Data));
  const user_data  = user_Data && JSON.parse(user_Data)
  setUser(user_data ?? null);
  }, []);

  

  const register = async (firstName: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, password, password_confirmation: confirmPassword }),
      });
  
      const data = await response.json();
      // console.log("Register response data: ", data);
  
      if (response.ok && data.role) {
        const userData = { role: data.role, name: data.name || 'Unnamed User' };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        console.error('Registration failed: ', data.message);
        throw new Error(data.message || 'Failed to register');
      }
    } catch (error) {
      console.error('Registration error: ', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};