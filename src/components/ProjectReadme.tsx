
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProjectReadme = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Notification Service - Project Documentation</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold">Notification Service</h3>
            <p>
              This project implements a notification service that supports sending messages through
              multiple channels: email, SMS, and in-app notifications. The system uses a queue to 
              process notifications asynchronously and includes retry logic for failed deliveries.
            </p>
            <h4 className="font-medium mt-4">Key Features:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Multi-channel notification support (Email, SMS, In-app)</li>
              <li>Queueing system with Bull and Redis</li>
              <li>Retry mechanism with exponential backoff</li>
              <li>Admin dashboard for monitoring notification status</li>
              <li>RESTful API for integration with other services</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="setup" className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold">Setup Instructions</h3>
            <div className="space-y-2">
              <h4 className="font-medium">Prerequisites:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Node.js v16 or higher</li>
                <li>MongoDB running locally or connection string</li>
                <li>Redis server for Bull queue</li>
              </ul>
              
              <h4 className="font-medium mt-4">Environment Variables:</h4>
              <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
{`PORT=3000
MONGODB_URI=mongodb://localhost:27017/notification-service
REDIS_URL=redis://localhost:6379
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-phone`}
              </pre>
              
              <h4 className="font-medium mt-4">Installation:</h4>
              <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
{`# Clone the repository
git clone https://github.com/yourusername/notification-service.git

# Install dependencies
cd notification-service
npm install

# Start the service
npm run dev`}
              </pre>
            </div>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold">API Documentation</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium">POST /notifications</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Creates a new notification and adds it to the processing queue.
                </p>
                <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
{`// Request Body
{
  "userId": "user123",
  "type": "email", // "email", "sms", or "in-app"
  "message": "Your order has been shipped!",
  "subject": "Order Update" // required for email
}

// Response (201 Created)
{
  "id": "60d21b4667d0d8992e610c85",
  "status": "queued",
  "createdAt": "2023-05-15T14:30:00Z"
}`}
                </pre>
              </div>
              
              <div>
                <h4 className="font-medium">GET /users/{'{id}'}/notifications</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Returns all in-app notifications for a specific user.
                </p>
                <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
{`// Response (200 OK)
{
  "notifications": [
    {
      "id": "60d21b4667d0d8992e610c85",
      "message": "Your subscription will expire in 3 days",
      "status": "delivered",
      "createdAt": "2023-05-15T14:30:00Z",
      "readAt": null
    },
    // More notifications...
  ]
}`}
                </pre>
              </div>
              
              <div>
                <h4 className="font-medium">PUT /notifications/{'{id}'}/read</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Marks an in-app notification as read.
                </p>
                <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
{`// Response (200 OK)
{
  "id": "60d21b4667d0d8992e610c85",
  "status": "read",
  "readAt": "2023-05-15T15:30:00Z"
}`}
                </pre>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="architecture" className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold">Architecture</h3>
            <p>
              The notification service follows a clean, modular architecture with clearly separated responsibilities:
            </p>
            
            <div className="space-y-2 mt-4">
              <h4 className="font-medium">Project Structure:</h4>
              <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
{`notification-service/
├── src/
│   ├── controllers/     # Request handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── workers/         # Queue processors
│   ├── config/          # Configuration
│   └── utils/           # Helper functions
├── .env                 # Environment variables
└── server.js            # Application entry point`}
              </pre>
            </div>
            
            <div className="space-y-2 mt-4">
              <h4 className="font-medium">Flow:</h4>
              <ol className="list-decimal pl-6 space-y-2">
                <li>API receives notification request</li>
                <li>Request is validated and stored in MongoDB</li>
                <li>Job is added to appropriate queue (email, SMS, in-app)</li>
                <li>Worker processes pick up jobs from queues</li>
                <li>Notifications are sent through respective providers</li>
                <li>Status is updated in the database</li>
                <li>Failed notifications are retried with exponential backoff</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProjectReadme;
