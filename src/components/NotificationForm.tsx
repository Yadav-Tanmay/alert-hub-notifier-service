
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, MessageSquare, BellRing } from 'lucide-react';

interface NotificationFormProps {
  onNotificationSent: () => void;
}

const NotificationForm = ({ onNotificationSent }: NotificationFormProps) => {
  const [userId, setUserId] = useState('');
  const [type, setType] = useState('email');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // In a real app, this would be an API call:
      // await fetch('/api/notifications', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId, type, subject, message }),
      // });
      
      setSending(false);
      onNotificationSent();
      
      // Reset form
      setUserId('');
      setSubject('');
      setMessage('');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="userId">User ID</Label>
          <Input 
            id="userId" 
            placeholder="Enter user identifier" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        
        <div>
          <Label>Notification Type</Label>
          <RadioGroup 
            value={type} 
            onValueChange={setType}
            className="flex flex-col space-y-1 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer">
                <Mail className="h-4 w-4" /> 
                <span>Email</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sms" id="sms" />
              <Label htmlFor="sms" className="flex items-center gap-2 cursor-pointer">
                <MessageSquare className="h-4 w-4" /> 
                <span>SMS</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="in-app" id="in-app" />
              <Label htmlFor="in-app" className="flex items-center gap-2 cursor-pointer">
                <BellRing className="h-4 w-4" /> 
                <span>In-App</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        {type === 'email' && (
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input 
              id="subject" 
              placeholder="Enter email subject"
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              required={type === 'email'}
            />
          </div>
        )}
        
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea 
            id="message" 
            placeholder="Enter your notification message"
            className="min-h-[120px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={sending}>
        {sending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>Send Notification</>
        )}
      </Button>
    </form>
  );
};

export default NotificationForm;
