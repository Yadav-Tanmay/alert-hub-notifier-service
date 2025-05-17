
# Notification Service

A modern backend service for sending notifications through multiple channels (email, SMS, and in-app) with a queue-based architecture and retry logic.

## Features

- **Multi-channel Notifications**: Support for email, SMS, and in-app notifications
- **Queue System**: Uses Bull with Redis for reliable job processing
- **Retry Logic**: Implements exponential backoff for failed notifications
- **Clean Architecture**: Follows best practices with a modular structure
- **Modern Dashboard**: UI for monitoring and sending notifications
- **RESTful API**: Well-documented endpoints for integration

## Project Structure

```
notification-service/
├── src/
│   ├── controllers/    # Request handlers
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── workers/        # Queue processors
│   ├── config/         # Configuration
│   └── utils/          # Helper functions
├── .env                # Environment variables
└── server.js           # Application entry point
```

## API Endpoints

### POST /notifications

Create a new notification and add it to the processing queue.

```json
// Request Body
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
}
```

### GET /users/{id}/notifications

Returns all in-app notifications for a specific user.

```json
// Response (200 OK)
{
  "notifications": [
    {
      "id": "60d21b4667d0d8992e610c85",
      "message": "Your subscription will expire in 3 days",
      "status": "delivered", 
      "createdAt": "2023-05-15T14:30:00Z",
      "readAt": null
    }
    // More notifications...
  ]
}
```

## Setup Instructions

### Prerequisites

- Node.js v16 or higher
- MongoDB running locally or connection string
- Redis server for Bull queue

### Environment Variables

Create a `.env` file in the root directory with:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/notification-service
REDIS_URL=redis://localhost:6379
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-phone
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/notification-service.git

# Install dependencies
cd notification-service
npm install

# Start the service
npm run dev
```

## Assumptions

- Notification types are limited to email, SMS, and in-app
- Authentication and authorization are handled externally
- Each notification is sent to a single recipient
- In-app notifications are stored and retrieved from MongoDB
- Failed notifications will be retried up to 3 times with increasing delay

## Technologies Used

- **Node.js & Express**: Core backend framework
- **MongoDB**: Database for storing notification data
- **Redis & Bull**: For queue management and job processing
- **Nodemailer**: For sending email notifications
- **Twilio**: For sending SMS notifications (or mocked service)
- **React & Tailwind**: For the admin dashboard UI
