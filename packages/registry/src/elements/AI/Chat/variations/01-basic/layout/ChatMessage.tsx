interface ChatMessageProps {
  message: string;
  sender: 'user' | 'ai';
}

export function ChatMessage({ message, sender }: ChatMessageProps) {
  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
          sender === 'user'
            ? 'bg-accent-500 text-foreground-50'
            : 'bg-background-700 text-foreground-300'
        }`}
      >
        {message}
      </div>
    </div>
  );
}
