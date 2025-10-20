# Chatbot UI Design Specification

## Visual Layout

### 1. Floating Toggle Button (Closed State)
```
┌─────────────────────────────────────┐
│                                     │
│  Your Page Content                  │
│                                     │
│                              ┌────┐ │
│                              │ 💬 │ │ <- Blue circular button
│                              └────┘ │    (bottom-right corner)
└─────────────────────────────────────┘
```

### 2. Chat Window (Open State)
```
┌─────────────────────────────────────┐
│                                     │
│  Your Page Content                  │
│                  ┌────────────────┐ │
│                  │ 💬 AI Chat  ↻ ✕│ │ <- Header (blue gradient)
│                  ├────────────────┤ │
│                  │ 🤖 Hi! I'm    │ │
│                  │    your AI... │ │ <- AI message (gray)
│                  │               │ │
│                  │    Hello! 👤  │ │ <- User message (blue)
│                  │               │ │
│                  │ 🤖 How can I  │ │
│                  │    help you?  │ │
│                  ├────────────────┤ │
│                  │ Type message…🗨│ │ <- Input + send button
│                  │ Press Enter    │ │
│                  └────────────────┘ │
└─────────────────────────────────────┘
```

## Component Hierarchy

```
<Chatbot>
  ├── Floating Button (when closed)
  │   └── MessageCircle Icon
  │
  └── <ChatbotWindow> (when open)
      ├── Header
      │   ├── Title + Icon
      │   ├── Reset Button
      │   └── Close Button
      │
      ├── Messages Area (ScrollArea)
      │   ├── <MessageBubble> (AI)
      │   ├── <MessageBubble> (User)
      │   ├── <MessageBubble> (AI)
      │   └── Loading Indicator (3 dots)
      │
      └── Input Area
          ├── Text Input
          ├── Send Button
          └── Helper Text
```

## Color Scheme

### Light Mode (Default)
- **Primary Blue**: `bg-blue-500` (buttons, user messages)
- **Hover Blue**: `bg-blue-600`
- **AI Messages**: `bg-gray-200` with `text-black`
- **User Messages**: `bg-blue-500` with `text-white`
- **Header**: Gradient from `blue-500` to `blue-600`
- **Input Area**: `bg-gray-50`

### Shadows & Borders
- **Window**: `shadow-2xl` + `border-2`
- **Button**: `shadow-2xl`
- **Card Hover**: `hover:shadow-xl`

## Dimensions

### Desktop
- **Window**: 380px × 600px
- **Toggle Button**: 56px × 56px (h-14 w-14)
- **Position**: 16px from bottom, 16px from right
- **Header Height**: ~64px
- **Input Area Height**: ~80px
- **Messages Area**: Flexible (fills remaining space)

### Responsive Behavior
- Window maintains fixed size on mobile
- Scrollable message area
- Fixed header and input

## Interactions

### Animations
1. **Toggle Button Hover**: Scale up 110%
2. **Typing Indicator**: 3 bouncing dots (staggered)
3. **Message Entry**: Slide in from bottom
4. **Auto-scroll**: Smooth scroll to latest message

### States
- **Idle**: Blue button visible
- **Open**: Window visible, button hidden
- **Loading**: Animated dots in message area
- **Error**: Red error message bubble
- **Empty Input**: Send button disabled

## Icons (lucide-react)

- `MessageCircle` - Toggle button & header
- `Send` - Send message button
- `X` - Close window button
- `RotateCcw` - Reset chat button

## Accessibility

- **ARIA Labels**: "Open chat", "Close chat", "Send message"
- **Keyboard Navigation**: Tab through all interactive elements
- **Enter to Send**: Press Enter to submit message
- **Focus Management**: Auto-focus input when window opens
- **Screen Reader**: Semantic HTML with proper roles

## Message Bubble Styles

### AI Message (Left-aligned)
```
┌─────────────────────┐
│ Hello! How can I    │  <- Gray background
│ help you today?     │     Black text
└─┘                   │     Left tail (rounded-bl-none)
```

### User Message (Right-aligned)
```
                  ┌─────────────────────┐
                  │ I need help with... │  <- Blue background
                  │                     │     White text
                  │                   └─┘     Right tail (rounded-br-none)
```

## Loading States

### Typing Indicator
```
🤖  ● ● ●  <- Three dots bouncing
```

### Empty State
```
🤖  Hi! I'm your AI assistant.
    How can I help you today?
```

## Error Handling

### Network Error
```
🤖  Sorry, I encountered an error.
    Please try again.
```

### Empty Message
- Send button remains disabled
- Input border stays neutral

## Backend Requirements

The UI expects these endpoints:

1. **POST** `/start_chat`
   - Returns: `{ session_id: string }`

2. **POST** `/chat`
   - Body: `{ session_id: string, message: string }`
   - Returns: `{ reply: string }`

## Usage Examples

### Simple Integration
```tsx
<YourPage>
  <Chatbot />  {/* That's it! */}
</YourPage>
```

### With Conditional Rendering
```tsx
{isAuthenticated && <Chatbot />}
```

### Multiple Pages
```tsx
// Add to layout component for site-wide availability
<RootLayout>
  <Outlet />
  <Chatbot />
</RootLayout>
```

## Performance Considerations

- **Lazy Loading**: Consider code-splitting for chatbot
- **Memoization**: Messages list uses React keys for efficient rendering
- **Debouncing**: Could add input debouncing for better performance
- **Session Persistence**: Uses localStorage for offline capability

## Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile Safari
✅ Chrome Mobile

## Testing Checklist

- [ ] Toggle button appears correctly
- [ ] Window opens/closes smoothly
- [ ] Messages send and receive
- [ ] Auto-scroll works
- [ ] Reset clears messages
- [ ] Session persists on reload
- [ ] Keyboard shortcuts work
- [ ] Mobile responsive
- [ ] Loading indicator shows
- [ ] Error handling works
