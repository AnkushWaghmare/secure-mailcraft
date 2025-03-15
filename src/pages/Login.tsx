
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui-custom/Card';
import Input from '@/components/ui-custom/Input';
import Button from '@/components/ui-custom/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { AuthService, LoginCredentials } from '@/services/auth.service';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const credentials: LoginCredentials = { 
        email, 
        password, 
        rememberMe 
      };
      
      const user = await AuthService.login(credentials);
      
      toast({
        title: "Login successful!",
        description: `Welcome back, ${user.name}!`,
      });
      
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      toast({
        title: "Login failed",
        description: err instanceof Error ? err.message : 'An unexpected error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        
        <Card variant="glass" className="overflow-hidden p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="name@example.com"
              icon={<Mail size={18} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock size={18} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember-me" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <label 
                  htmlFor="remember-me" 
                  className="text-sm cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            
            <Button 
              fullWidth 
              type="submit"
              disabled={isLoading}
              icon={isLoading ? undefined : <LogIn size={18} />}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </Card>
        
        <div className="mt-8 flex justify-center">
          <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowRight size={16} className="mr-1 rotate-180" />
            Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
