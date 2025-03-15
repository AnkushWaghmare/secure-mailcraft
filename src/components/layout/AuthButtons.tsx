
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, LogIn, UserPlus } from 'lucide-react';

const AuthButtons: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={logout}
        className="flex items-center gap-1"
      >
        <LogOut size={16} />
        <span className="hidden md:inline">Logout</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link to="/login">
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <LogIn size={16} />
          <span className="hidden md:inline">Login</span>
        </Button>
      </Link>
      <Link to="/signup">
        <Button variant="default" size="sm" className="flex items-center gap-1">
          <UserPlus size={16} />
          <span className="hidden md:inline">Sign Up</span>
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
