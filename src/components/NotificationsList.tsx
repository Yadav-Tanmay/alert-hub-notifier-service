import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Mail, MessageSquare, BellRing, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface Notification {
  id: string;
  userId: string;
  type: 'email' | 'sms' | 'in-app';
  message: string;
  subject?: string;
  status: 'pending' | 'delivered' | 'failed';
  createdAt: string;
}

const NotificationsList = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setNotifications([
        {
          id: '1',
          userId: 'user123',
          type: 'email',
          subject: 'Welcome to our platform',
          message: "Thank you for signing up! We're excited to have you on board.",
          status: 'delivered',
          createdAt: '2023-05-15T14:30:00Z'
        },
        {
          id: '2',
          userId: 'user456',
          type: 'sms',
          message: 'Your order #12345 has been shipped!',
          status: 'delivered',
          createdAt: '2023-05-15T12:15:00Z'
        },
        {
          id: '3',
          userId: 'user789',
          type: 'in-app',
          message: 'You have a new message from Admin',
          status: 'pending',
          createdAt: '2023-05-15T10:45:00Z'
        },
        {
          id: '4',
          userId: 'user123',
          type: 'email',
          subject: 'Password reset requested',
          message: 'Click the link to reset your password',
          status: 'failed',
          createdAt: '2023-05-14T18:20:00Z'
        },
        {
          id: '5',
          userId: 'user456',
          type: 'in-app',
          message: 'Your subscription will expire in 3 days',
          status: 'delivered',
          createdAt: '2023-05-14T09:10:00Z'
        }
      ]);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      case 'in-app':
        return <BellRing className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No notifications found
        </div>
      ) : (
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      notification.type === 'email' ? 'default' :
                      notification.type === 'sms' ? 'secondary' : 'outline'
                    } className="flex gap-1 items-center">
                      {getTypeIcon(notification.type)}
                      {notification.type}
                    </Badge>
                    <Badge variant={
                      notification.status === 'delivered' ? 'success' :
                      notification.status === 'failed' ? 'destructive' : 'outline'
                    } className="flex gap-1 items-center">
                      {getStatusIcon(notification.status)}
                      {notification.status}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(notification.createdAt)}
                  </span>
                </div>
                
                <div className="space-y-1">
                  {notification.subject && (
                    <h4 className="font-medium">{notification.subject}</h4>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {notification.message}
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground pt-1">
                    <span>To: {notification.userId}</span>
                    {notification.status === 'failed' && (
                      <Button size="sm" variant="ghost" className="h-8 text-xs">
                        Retry
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default NotificationsList;
