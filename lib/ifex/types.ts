export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequestBody {
  visitorId: string;
  conversationId?: string;
  messages: ChatMessage[];
  timezone?: string;
}

export interface WrapRequestBody {
  visitorId: string;
  conversationId: string;
  messages: ChatMessage[];
}

export type StreamEventType =
  | 'conversation_id'
  | 'token'
  | 'done'
  | 'error';

export interface StreamEvent {
  type: StreamEventType;
  content?: string;
  id?: string;
  message?: string;
}

export interface Conversation {
  id: string;
  visitor_id: string;
  started_at: string;
  last_message_at: string;
  ended_at: string | null;
  summary: string | null;
  key_points: KeyPoints | null;
}

export interface KeyPoints {
  problem?: string;
  role_type?: 'one_off_project' | 'monthly_contract' | 'full_time' | 'unclear';
  signals?: string[];
  contact?: string;
}
