import { debounce } from 'lodash';
import { Match } from './matchService';

export interface WebSocketMessage {
  type: string;
  data?: Match[];
}

const WS_URL = 'wss://app.ftoyd.com/fronttemp-service/ws';

export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private subscribers = new Set<(data: WebSocketMessage) => void>();
  private debouncedCallbacks = new Map<(data: WebSocketMessage) => void, (data: WebSocketMessage) => void>();

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(WS_URL);
    this.ws.onopen = this.handleOpen.bind(this);
    this.ws.onclose = this.handleClose.bind(this);
    this.ws.onerror = this.handleError.bind(this);
    this.ws.onmessage = this.handleMessage.bind(this);
  }

  subscribe(callback: (data: WebSocketMessage) => void) {
    if (!this.subscribers.has(callback)) {
      const debouncedCallback = debounce(callback, 1000);
      this.debouncedCallbacks.set(callback, debouncedCallback);
      this.subscribers.add(callback);
    }

    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.connect();
    }

    return () => this.unsubscribe(callback);
  }

  private unsubscribe(callback: (data: WebSocketMessage) => void) {
    this.subscribers.delete(callback);
    const debouncedCallback = this.debouncedCallbacks.get(callback);
    if (debouncedCallback) {
      this.debouncedCallbacks.delete(callback);
    }

    if (this.subscribers.size === 0 && this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private handleOpen() {
    this.reconnectAttempts = 0;
    this.reconnectDelay = 1000;
  }

  private handleClose() {
    if (this.subscribers.size > 0 && this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        this.reconnectAttempts++;
        this.reconnectDelay *= 2;
        this.connect();
      }, this.reconnectDelay);
    }
  }

  private handleError(error: Event) {
    console.error('WebSocket error:', error);
  }

  private handleMessage(event: MessageEvent) {
    try {
      const data = JSON.parse(event.data) as WebSocketMessage;
      this.subscribers.forEach((callback) => {
        const debouncedCallback = this.debouncedCallbacks.get(callback);
        if (debouncedCallback) {
          debouncedCallback(data);
        }
      });
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  }
}

export const websocketService = new WebSocketService();
