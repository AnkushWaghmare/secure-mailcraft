
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui-custom/Card';
import Button from '@/components/ui-custom/Button';
import { Eye, EyeOff, Copy, Trash, ExternalLink } from 'lucide-react';

interface CredentialCardProps {
  website: string;
  username: string;
  password: string;
  date: string;
  favicon?: string;
}

const CredentialCard = ({ website, username, password, date, favicon }: CredentialCardProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const maskPassword = (pass: string) => {
    return '•'.repeat(pass.length);
  };

  return (
    <Card variant="glass" hoverable className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3">
          {favicon ? (
            <img src={favicon} alt={website} className="w-8 h-8 rounded" />
          ) : (
            <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center text-primary font-semibold">
              {website.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <CardTitle className="text-base">{website}</CardTitle>
            <CardDescription className="text-xs">{date}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Username/Email</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium truncate max-w-[70%]">{username}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
              onClick={() => copyToClipboard(username)}
              icon={<Copy size={14} />}
            >
              Copy
            </Button>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Password</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium tracking-wider">
              {showPassword ? password : maskPassword(password)}
            </p>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
                icon={showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
                onClick={() => copyToClipboard(password)}
                icon={<Copy size={14} />}
              >
                Copy
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-1 justify-between">
        <AnimatePresence>
          {copied && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs"
            >
              Copied!
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-destructive hover:bg-destructive/10"
            icon={<Trash size={16} />}
          >
            Delete
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8"
          icon={<ExternalLink size={14} />}
        >
          Visit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CredentialCard;
