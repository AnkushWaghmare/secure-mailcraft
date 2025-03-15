
import { useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui-custom/Card';
import Button from '@/components/ui-custom/Button';
import Input from '@/components/ui-custom/Input';
import EmailCard from '@/components/dashboard/EmailCard';
import { Plus, Search, Mail, Archive, Trash, Inbox } from 'lucide-react';

// Sample data for demonstration
const sampleEmails = [
  { 
    sender: 'Twitter Team <no-reply@twitter.com>',
    subject: 'Confirm your Twitter account',
    preview: 'Please confirm your email address to complete your Twitter account setup. Click the link below to verify your email.',
    date: '10 minutes ago',
    isRead: false
  },
  { 
    sender: 'Netflix <info@mailer.netflix.com>',
    subject: 'Welcome to Netflix',
    preview: 'Welcome to Netflix! Your subscription has started. You can now start watching thousands of TV shows and movies.',
    date: '2 hours ago',
    isRead: true
  },
  { 
    sender: 'Amazon <auto-confirm@amazon.com>',
    subject: 'Your Amazon.com order confirmation',
    preview: "Hello, thank you for your order. We'll send a confirmation when your item ships.",
    date: '1 day ago',
    isRead: true
  },
  { 
    sender: 'Spotify <no-reply@spotify.com>',
    subject: 'Get more out of Spotify',
    preview: "Discover more music tailored to your taste. We've personalized some recommendations just for you.",
    date: '3 days ago',
    isRead: false
  }
];

const Emails = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredEmails = sampleEmails.filter(email => 
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: 'inbox', label: 'Inbox', icon: <Inbox size={16} /> },
    { id: 'archived', label: 'Archived', icon: <Archive size={16} /> },
    { id: 'trash', label: 'Trash', icon: <Trash size={16} /> }
  ];

  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Temporary Email Inbox</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card variant="glass" className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Create New Temporary Email</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <Input 
                    placeholder="Enter prefix (optional)"
                    className="flex-grow"
                    icon={<Mail size={16} />}
                  />
                  <div className="flex items-center text-muted-foreground">
                    @securemail.com
                  </div>
                  <Button icon={<Plus size={16} />}>
                    Create
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card variant="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Active Addresses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-2 bg-background/50 rounded-md flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">temp_user29845@securemail.com</p>
                    <p className="text-xs text-muted-foreground">Expires in 6 days</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Copy size={14} />
                  </Button>
                </div>
                <div className="p-2 bg-background/50 rounded-md flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">temp_netflix42@securemail.com</p>
                    <p className="text-xs text-muted-foreground">Expires in 3 days</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Copy size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <div className="flex bg-secondary/50 p-1 rounded-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  placeholder="Search emails..."
                  className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredEmails.map((email, index) => (
                <EmailCard
                  key={index}
                  sender={email.sender}
                  subject={email.subject}
                  preview={email.preview}
                  date={email.date}
                  isRead={email.isRead}
                />
              ))}
              
              {filteredEmails.length === 0 && (
                <div className="text-center py-12 bg-background/50 rounded-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <Mail size={32} />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No emails found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery
                      ? `No results matching "${searchQuery}"`
                      : "Your inbox is empty"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const Copy = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

export default Emails;
