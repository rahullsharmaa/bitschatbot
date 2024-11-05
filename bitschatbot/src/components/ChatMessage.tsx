import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
  const formatMessage = (text: string) => {
    // Split into paragraphs
    return text.split('\n').map((paragraph, idx) => {
      // Format bold text and headings
      let formattedText = paragraph.replace(
        /\*\*(.*?)\*\*/g,
        '<span class="font-bold">$1</span>'
      );

      // Format numbered points with headings
      formattedText = formattedText.replace(
        /^(\d+)\.\s+([^:]+):/gm,
        '<h3 class="font-bold text-lg mt-4 mb-2">$1. $2</h3>'
      );

      // Format bullet points with proper indentation and styling
      formattedText = formattedText.replace(
        /^\*\s+(.+)/gm,
        '<div class="ml-4 mb-1 flex items-start">' +
        '<span class="mr-2 text-blue-500">•</span>' +
        '<span>$1</span>' +
        '</div>'
      );

      // Add spacing between sections
      const hasHeading = formattedText.includes('</h3>');
      const className = hasHeading ? 'mb-4' : 'mb-2';

      return (
        <div
          key={idx}
          className={className}
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    });
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-blue-500' : 'bg-gray-600'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-800 leading-relaxed'
        }`}
      >
        {formatMessage(message)}
      </div>
    </div>
  );
}