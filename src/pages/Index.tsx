
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import Button from '@/components/ui-custom/Button';
import { Shield, Mail, ArrowRight, Lock, Smartphone, RefreshCw } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container px-6 mx-auto">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Secure your online identity with temporary credentials
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Generate temporary emails and secure passwords to protect your privacy. 
                  Store and manage all credentials in one secure place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="text-lg font-medium"
                    icon={<ArrowRight size={20} />}
                    iconPosition="right"
                  >
                    <Link to="/dashboard">Get Started</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-lg font-medium"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-16 w-full max-w-4xl relative"
              >
                <div className="glass-card overflow-hidden rounded-2xl shadow-xl">
                  <div className="bg-primary/5 p-3 border-b border-border">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
                      <div className="w-3 h-3 rounded-full bg-primary/60"></div>
                      <div className="w-3 h-3 rounded-full bg-secondary/80"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 md:col-span-1 space-y-4">
                        <div className="glass-card p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <Shield size={20} className="text-primary" />
                            <h3 className="font-medium">Generated Credentials</h3>
                          </div>
                          <div className="space-y-2">
                            <div className="bg-background/50 p-2 rounded">
                              <p className="text-sm font-mono">temp-user293@securemail.com</p>
                            </div>
                            <div className="bg-background/50 p-2 rounded">
                              <p className="text-sm font-mono">•••••••••••••••</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="glass-card p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <Lock size={20} className="text-primary" />
                            <h3 className="font-medium">Security Status</h3>
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 flex-1 bg-background/50 rounded-full overflow-hidden">
                              <div className="h-full bg-primary w-[85%]"></div>
                            </div>
                            <span className="ml-2 text-sm font-medium">Secure</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-2 md:col-span-1">
                        <div className="glass-card p-4 h-full">
                          <div className="flex items-center space-x-3 mb-3">
                            <Mail size={20} className="text-primary" />
                            <h3 className="font-medium">Temporary Inbox</h3>
                          </div>
                          <div className="space-y-2">
                            <div className="bg-background/50 p-2 rounded">
                              <div className="flex justify-between items-center">
                                <p className="text-sm font-medium">Welcome Email</p>
                                <span className="text-xs text-muted-foreground">Just now</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">Your account has been created...</p>
                            </div>
                            <div className="bg-background/50 p-2 rounded">
                              <div className="flex justify-between items-center">
                                <p className="text-sm font-medium">Confirmation</p>
                                <span className="text-xs text-muted-foreground">5m ago</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">Please confirm your email address...</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-transparent to-secondary/20">
          <div className="container px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Everything you need to protect your privacy</h2>
              <p className="text-muted-foreground">Our app provides all the tools to keep your online identity secure and your inbox clean.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Mail size={24} />}
                title="Temporary Email"
                description="Generate disposable email addresses to keep your primary inbox spam-free."
              />
              <FeatureCard
                icon={<Lock size={24} />}
                title="Password Generation"
                description="Create strong, unique passwords for every site with our secure generator."
              />
              <FeatureCard
                icon={<Shield size={24} />}
                title="Credential Storage"
                description="Safely store and manage all your temporary credentials in one place."
              />
              <FeatureCard
                icon={<Smartphone size={24} />}
                title="Android Integration"
                description="Seamlessly integrate with Android's Autofill API for a native experience."
              />
              <FeatureCard
                icon={<RefreshCw size={24} />}
                title="Auto Expiration"
                description="Set credentials to automatically expire after a period of time for enhanced security."
              />
              <FeatureCard
                icon={<Shield size={24} />}
                title="End-to-End Encryption"
                description="All your data is encrypted on your device before being synced to our servers."
              />
            </div>
            
            <div className="mt-16 text-center">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="text-lg font-medium"
                  icon={<ArrowRight size={20} />}
                  iconPosition="right"
                >
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Index;
