
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import NotificationForm from '@/components/NotificationForm';
import NotificationsList from '@/components/NotificationsList';
import StatsCards from '@/components/StatsCards';
import ProjectReadme from '@/components/ProjectReadme';
import { Loader2, Github } from 'lucide-react';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    delivered: 0,
    failed: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStats({
        total: 124,
        pending: 7,
        delivered: 112,
        failed: 5
      });
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleNotificationSent = () => {
    toast({
      title: "Notification queued",
      description: "Your notification has been added to the queue",
    });
    
    // Update stats
    setStats(prev => ({
      ...prev,
      total: prev.total + 1,
      pending: prev.pending + 1
    }));
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8 pb-16">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Notification Service</h1>
          <Button variant="outline" size="sm" className="gap-2">
            <Github className="h-4 w-4" />
            <span className="hidden md:inline">View on GitHub</span>
          </Button>
        </div>
        <p className="text-muted-foreground">
          A modern backend service for sending multi-channel notifications
        </p>
      </div>

      <StatsCards stats={stats} />
      
      <Tabs defaultValue="send" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="send">Send Notification</TabsTrigger>
          <TabsTrigger value="view">View Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="send" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Send a New Notification</CardTitle>
              <CardDescription>
                Create notifications for delivery via email, SMS, or in-app
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationForm onNotificationSent={handleNotificationSent} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="view" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                View and manage recently sent notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationsList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>
            Integrate with our notification service using these endpoints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">POST /notifications</h3>
              <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
{`{
  "userId": "user123",
  "type": "email",
  "message": "Hello, this is a test notification",
  "subject": "Test Notification"
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">GET /users/{'{id}'}/notifications</h3>
              <p className="text-muted-foreground">Returns all in-app notifications for the specified user.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" onClick={() => window.open('/api-docs', '_blank')}>
            View Full Documentation
          </Button>
        </CardFooter>
      </Card>

      <ProjectReadme />
    </div>
  );
};

export default Index;
