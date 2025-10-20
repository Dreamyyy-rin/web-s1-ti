# Chatbot UI Component

A modern, floating chatbot interface built with React, TypeScript, and shadcn/ui components.

## Features

- 🎨 **Modern UI/UX**: Clean, floating chat window with smooth animations
- 💬 **Real-time Chat**: Connect to your chatbot backend service
- 🔄 **Session Management**: Persistent chat sessions using localStorage
- ♿ **Accessible**: Keyboard shortcuts and ARIA labels
- 📱 **Responsive**: Works on desktop and mobile devices
- 🎯 **Easy Integration**: Drop-in component for any page

## Components

### `<Chatbot />`
Main component with floating toggle button and chat window.

**Usage:**
```tsx
import { Chatbot } from "@/components/ui/custom/chatbot";

function MyPage() {
  return (
    <div>
      {/* Your page content */}
      <Chatbot />
    </div>
  );
}
```

### `<ChatbotWindow />`
The chat window UI (used internally by Chatbot).

**Props:**
- `isOpen: boolean` - Controls window visibility
- `onClose: () => void` - Callback when close button is clicked

### `<MessageBubble />`
Individual message component (user/AI).

**Props:**
- `message: Message` - Message object with id, role, and text

## Configuration

Update your `.env` file with the chatbot backend URL:

```env
VITE_CHATBOT_URL=http://localhost:5000
```

## Backend Integration

The chatbot connects to a backend service with these endpoints:

### POST `/start_chat`
Initializes a new chat session.

**Response:**
```json
{
  "session_id": "unique-session-id"
}
```

### POST `/chat`
Sends a message and receives AI response.

**Request:**
```json
{
  "session_id": "unique-session-id",
  "message": "User message text"
}
```

**Response:**
```json
{
  "reply": "AI response text"
}
```

## Customization

### Styling
The chatbot uses Tailwind CSS and can be customized by modifying:
- Colors: Update the gradient classes in `ChatbotWindow.tsx`
- Size: Modify `w-[380px] h-[600px]` in the Card component
- Position: Change `bottom-4 right-4` for the floating position

### Behavior
- **Auto-scroll**: Messages automatically scroll to bottom
- **Keyboard shortcuts**: Press Enter to send messages
- **Loading state**: Animated dots while waiting for response
- **Reset chat**: Clear history and start fresh

## Files

```
chatbot/
├── Chatbot.tsx           # Main component with toggle button
├── ChatbotWindow.tsx     # Chat window UI
├── messageBubble.tsx     # Individual message component
├── chat.tsx              # Message type definition
├── chatService.tsx       # Backend API integration
└── index.ts              # Barrel exports
```

## API

### chatService

```tsx
// Initialize a new chat session
await startChat(): Promise<string>

// Send a message and get response
await sendMessage(message: string): Promise<string>

// Reset chat session
await resetChat(): Promise<void>
```

## Example Integration

```tsx
// Add to any page
import { Chatbot } from "@/components/ui/custom/chatbot";

export function VacancyPage() {
  return (
    <div>
      <h1>Vacancy List</h1>
      {/* Your content */}
      
      {/* Floating chatbot - appears bottom-right */}
      <Chatbot />
    </div>
  );
}
```

## Dependencies

- React 18+
- TypeScript
- @tanstack/react-router
- shadcn/ui components (Button, Input, Card, ScrollArea)
- lucide-react (icons)
- axios (HTTP client)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Troubleshooting

**Chatbot not appearing:**
- Check that `ENV.APP.CHATBOT_URL` is configured
- Verify backend service is running
- Check browser console for errors

**Messages not sending:**
- Verify backend endpoints are accessible
- Check CORS configuration on backend
- Inspect network tab for failed requests

**Session not persisting:**
- Check localStorage is enabled in browser
- Verify session_id is being stored correctly

## Future Enhancements

- [ ] File upload support
- [ ] Typing indicators
- [ ] Message timestamps
- [ ] Sound notifications
- [ ] Dark mode support
- [ ] Multiple chat sessions
- [ ] Export chat history
