
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui-custom/Card';
import Button from '@/components/ui-custom/Button';
import { Archive, Trash, Mail } from 'lucide-react';

interface EmailCardProps {
  sender: string;
  subject: string;
  preview: string;
  date: string;
  isRead: boolean;
}

const EmailCard = ({ sender, subject, preview, date, isRead }: EmailCardProps) => {
  return (
    <Card 
      variant="glass" 
      hoverable
      className={`overflow-hidden ${!isRead ? 'border-l-4 border-l-primary' : ''}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base line-clamp-1">{subject}</CardTitle>
            <CardDescription className="text-xs">
              From: <span className="font-medium">{sender}</span> • {date}
            </CardDescription>
          </div>
          {!isRead && (
            <motion.div 
              className="w-2 h-2 rounded-full bg-primary"
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{preview}</p>
      </CardContent>
      
      <CardFooter className="pt-2 justify-end">
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            icon={<Mail size={16} />}
          />
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            icon={<Archive size={16} />}
          />
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
            icon={<Trash size={16} />}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default EmailCard;
