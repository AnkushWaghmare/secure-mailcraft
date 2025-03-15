
import React, { useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof HTMLMotionProps<"div">> {
  variant?: 'default' | 'glass';
  hoverable?: boolean;
  pressable?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    className, 
    variant = 'default',
    hoverable = false,
    pressable = false,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const handleMouseEnter = () => hoverable && setIsHovered(true);
    const handleMouseLeave = () => {
      hoverable && setIsHovered(false);
      pressable && setIsPressed(false);
    };
    const handleMouseDown = () => pressable && setIsPressed(true);
    const handleMouseUp = () => pressable && setIsPressed(false);

    const variants = {
      default: 'bg-card text-card-foreground shadow border',
      glass: 'glass-card',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-lg p-6',
          variants[variant],
          className,
          hoverable && 'transition-all duration-300',
        )}
        style={{
          transform: isHovered ? 'translateY(-4px)' : (isPressed ? 'translateY(2px)' : 'translateY(0)'),
          boxShadow: isHovered 
            ? '0 10px 30px rgba(0, 0, 0, 0.08)' 
            : '0 4px 10px rgba(0, 0, 0, 0.05)',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props as any} // Type assertion to avoid conflicts
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
