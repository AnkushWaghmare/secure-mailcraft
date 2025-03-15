
import { useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui-custom/Card';
import Button from '@/components/ui-custom/Button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Settings as SettingsIcon, Shield, Bell, RefreshCw, Lock, User, LogOut } from 'lucide-react';

const SettingRow = ({ 
  icon, 
  title, 
  description, 
  children 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  children: React.ReactNode 
}) => {
  return (
    <div className="flex items-start justify-between py-4">
      <div className="flex space-x-3">
        <div className="mt-1 text-primary">{icon}</div>
        <div>
          <h3 className="font-medium text-base">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

const Settings = () => {
  const [expirationDays, setExpirationDays] = useState([14]);
  
  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>
          
          <div className="space-y-6">
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User size={20} className="mr-2" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y">
                <SettingRow
                  icon={<User size={20} />}
                  title="Profile Information"
                  description="Manage your account details and preferences"
                >
                  <Button variant="outline" size="sm">Edit</Button>
                </SettingRow>
                
                <SettingRow
                  icon={<LogOut size={20} />}
                  title="Sign Out"
                  description="Log out from your current session"
                >
                  <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                    Sign Out
                  </Button>
                </SettingRow>
              </CardContent>
            </Card>
            
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield size={20} className="mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y">
                <SettingRow
                  icon={<Lock size={20} />}
                  title="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                >
                  <Switch id="two-factor" />
                </SettingRow>
              </CardContent>
            </Card>
            
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SettingsIcon size={20} className="mr-2" />
                  Credential Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y">
                <SettingRow
                  icon={<RefreshCw size={20} />}
                  title="Default Expiration"
                  description={`Temporary credentials expire after ${expirationDays[0]} days`}
                >
                  <div className="w-32">
                    <Slider 
                      defaultValue={expirationDays} 
                      max={30} 
                      step={1} 
                      min={1}
                      onValueChange={setExpirationDays}
                    />
                  </div>
                </SettingRow>
                
                <SettingRow
                  icon={<Shield size={20} />}
                  title="Generate Strong Passwords"
                  description="Always generate strong passwords by default"
                >
                  <Switch id="strong-passwords" defaultChecked />
                </SettingRow>
                
                <SettingRow
                  icon={<Bell size={20} />}
                  title="Expiration Reminders"
                  description="Get notified before credentials expire"
                >
                  <Switch id="expiration-reminders" defaultChecked />
                </SettingRow>
              </CardContent>
            </Card>
            
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell size={20} className="mr-2" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y">
                <SettingRow
                  icon={<Bell size={20} />}
                  title="Email Notifications"
                  description="Receive notifications for new emails"
                >
                  <Switch id="email-notifications" defaultChecked />
                </SettingRow>
                
                <SettingRow
                  icon={<Bell size={20} />}
                  title="Security Alerts"
                  description="Get notified about suspicious activities"
                >
                  <Switch id="security-alerts" defaultChecked />
                </SettingRow>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Settings;
