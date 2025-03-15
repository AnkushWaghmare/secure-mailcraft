
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui-custom/Card';
import Input from '@/components/ui-custom/Input';
import Button from '@/components/ui-custom/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { AuthService, SignUpData } from '@/services/auth.service';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast({
        title: "Terms agreement required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const signUpData: SignUpData = {
        name,
        email,
        password
      };
      
      const user = await AuthService.signUp(signUpData);
      
      toast({
        title: "Account created!",
        description: `Welcome, ${user.name}!`,
      });
      
      // Redirect to dashboard after successful signup
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      toast({
        title: "Sign up failed",
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
          <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
          <p className="mt-2 text-muted-foreground">
            Sign up to get access to all features
          </p>
        </div>
        
        <Card variant="glass" className="overflow-hidden p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              icon={<User size={18} />}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            
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
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
              />
              <label 
                htmlFor="terms" 
                className="text-sm cursor-pointer"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            
            <Button 
              fullWidth 
              type="submit"
              disabled={isLoading}
              icon={<User size={18} />}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Log in
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

export default SignUp;
