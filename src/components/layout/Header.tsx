
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Mail, Settings, Home } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/dashboard', label: 'Credentials', icon: <Shield size={20} /> },
    { path: '/emails', label: 'Inbox', icon: <Mail size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 glass shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-primary font-bold text-xl">SecureMail</span>
        </Link>
        
        <nav className="hidden md:flex">
          <ul className="flex space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.li key={item.path} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 rounded-full flex items-center space-x-2 transition-all ${
                      isActive
                        ? 'text-primary-foreground'
                        : 'text-foreground/80 hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-primary rounded-full -z-10"
                        initial={false}
                        transition={{ type: 'spring', duration: 0.3 }}
                      />
                    )}
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>
        
        <div className="md:hidden flex">
          <button className="p-2 rounded-full bg-secondary">
            <span className="sr-only">Open menu</span>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="block md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border z-50">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`p-3 rounded-full flex flex-col items-center transition-all ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
                {isActive && (
                  <span className="absolute top-2 w-1 h-1 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
