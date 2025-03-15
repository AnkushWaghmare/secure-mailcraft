
import { useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui-custom/Card';
import Button from '@/components/ui-custom/Button';
import Input from '@/components/ui-custom/Input';
import CredentialCard from '@/components/dashboard/CredentialCard';
import { Plus, RefreshCw, Search, KeyRound, Mail } from 'lucide-react';

// Sample data for demonstration
const sampleCredentials = [
  { 
    website: 'Twitter',
    username: 'temp_user29845@securemail.com',
    password: 'P@ssw0rd123!',
    date: 'Added 2 days ago',
    favicon: 'https://www.google.com/s2/favicons?domain=twitter.com&sz=64'
  },
  { 
    website: 'Netflix',
    username: 'temp_netflix42@securemail.com',
    password: 'Str0ngP@$$w0rd!',
    date: 'Added 5 days ago',
    favicon: 'https://www.google.com/s2/favicons?domain=netflix.com&sz=64'
  },
  { 
    website: 'Amazon',
    username: 'temp_shopper@securemail.com',
    password: 'Sh0pp!ng@m@z0n',
    date: 'Added 1 week ago',
    favicon: 'https://www.google.com/s2/favicons?domain=amazon.com&sz=64'
  }
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCredentials = sampleCredentials.filter(cred => 
    cred.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cred.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Credential Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card variant="glass" className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Generate New Credentials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <Input 
                    label="Website" 
                    placeholder="Enter website URL"
                    className="flex-1"
                  />
                  <Input 
                    label="Username/Email" 
                    placeholder="Generate or enter email"
                    className="flex-1"
                    icon={<Mail size={16} />}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <Input 
                    label="Password" 
                    type="password"
                    placeholder="Generate or enter password"
                    className="flex-1"
                    icon={<KeyRound size={16} />}
                  />
                  <div className="flex-1 flex flex-col justify-end">
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <Button 
                        variant="outline" 
                        icon={<RefreshCw size={16} />}
                        className="flex-1"
                      >
                        Generate
                      </Button>
                      <Button className="flex-1" icon={<Plus size={16} />}>
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card variant="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Credentials</p>
                  <p className="text-2xl font-semibold">{sampleCredentials.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Temporary Emails</p>
                  <p className="text-2xl font-semibold">2</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expiring Soon</p>
                  <p className="text-2xl font-semibold">1</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Saved Credentials</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  placeholder="Search credentials..."
                  className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCredentials.map((credential, index) => (
                <CredentialCard
                  key={index}
                  website={credential.website}
                  username={credential.username}
                  password={credential.password}
                  date={credential.date}
                  favicon={credential.favicon}
                />
              ))}
              
              {filteredCredentials.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <KeyRound size={32} />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No credentials found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery
                      ? `No results matching "${searchQuery}"`
                      : "You haven't saved any credentials yet"}
                  </p>
                  <Button icon={<Plus size={16} />}>Add New Credential</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
