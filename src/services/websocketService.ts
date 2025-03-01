import type { Match } from './matchService';

interface WebSocketResponse {
  type: 'update_matches';
  data: Match[];
}

const WS_URL = 'wss://app.ftoyd.com/fronttemp-service/ws';
const RECONNECT_DELAY = 3000;

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  private onUpdateCallback: ((matches: Match[]) => void) | null = null;
  private isLoading = false;

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    this.ws = new WebSocket(WS_URL);

    this.ws.onopen = () => {
      console.log('WebSocket соединение установлено');
    };

    this.ws.onmessage = (event) => {
      try {
        const response: WebSocketResponse = JSON.parse(event.data);

        if (response.type === 'update_matches' && response.data && this.onUpdateCallback && !this.isLoading) {
          this.onUpdateCallback(response.data);
        }
      } catch (error) {
        console.error('Ошибка при обработке WebSocket сообщения:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket соединение закрыто, переподключение...');
      this.scheduleReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket ошибка:', error);
      this.ws?.close();
    };
  }

  private scheduleReconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    this.reconnectTimeout = setTimeout(() => {
      this.connect();
    }, RECONNECT_DELAY);
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  subscribe(callback: (matches: Match[]) => void) {
    console.log('WebSocket: Подписка на обновления');
    this.onUpdateCallback = callback;
    console.log('WebSocket: Callback установлен', Boolean(this.onUpdateCallback));
    this.connect();

    return () => {
      console.log('WebSocket: Отписка от обновлений');
      this.onUpdateCallback = null;
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
      }
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
    };
  }
}

export const websocketService = new WebSocketService();
