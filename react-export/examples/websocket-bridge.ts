import mitt from "mitt";

type MessagePayload = { type: string; payload: unknown };

type BridgeEvents = {
  message: MessagePayload;
  activity: { sent: number; received: number };
  error: Error;
};

export interface ConnectOptions {
  url: string;
  playerId: string;
  token?: string;
}

export interface SessionHandle {
  id: string;
}

export class WebSocketBridge {
  private socket: WebSocket | null = null;
  private activity = { sent: 0, received: 0 };
  private emitter = mitt<BridgeEvents>();

  async connect(options: ConnectOptions): Promise<SessionHandle> {
    if (this.socket) {
      await this.disconnect();
    }
    const socket = new WebSocket(options.url);
    this.socket = socket;
    return new Promise((resolve, reject) => {
      const onError = (event: Event) => {
        const error = event instanceof ErrorEvent ? event.error ?? new Error(event.message) : new Error("Connection failed");
        this.emitter.emit("error", error);
        socket.close();
        reject(error);
      };
      const onOpen = () => {
        const hello = {
          type: "handshake",
          payload: { playerId: options.playerId, token: options.token },
        };
        socket.send(JSON.stringify(hello));
        this.activity.sent += 1;
        this.emitter.emit("activity", { ...this.activity });
      };
      const onMessage = (event: MessageEvent) => {
        this.activity.received += 1;
        this.emitter.emit("activity", { ...this.activity });
        const data = JSON.parse(event.data as string) as MessagePayload;
        if (data.type === "handshake:ack") {
          cleanup();
          resolve({ id: (data.payload as { sessionId: string }).sessionId });
          return;
        }
        this.emitter.emit("message", data);
      };
      const cleanup = () => {
        socket.removeEventListener("error", onError);
        socket.removeEventListener("open", onOpen);
        socket.removeEventListener("message", onMessage);
      };
      socket.addEventListener("error", onError);
      socket.addEventListener("open", onOpen);
      socket.addEventListener("message", onMessage);
    });
  }

  async disconnect(): Promise<void> {
    if (!this.socket) return;
    const socket = this.socket;
    return new Promise(resolve => {
      socket.addEventListener("close", () => {
        this.socket = null;
        resolve();
      }, { once: true });
      socket.close();
    });
  }

  send(type: string, payload: unknown) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error("Socket is not open");
    }
    this.socket.send(JSON.stringify({ type, payload }));
    this.activity.sent += 1;
    this.emitter.emit("activity", { ...this.activity });
  }

  onMessage(listener: (payload: MessagePayload) => void) {
    const handler = (payload: MessagePayload) => listener(payload);
    this.emitter.on("message", handler);
    return () => this.emitter.off("message", handler);
  }

  onActivity(listener: (stats: { sent: number; received: number }) => void) {
    const handler = (stats: { sent: number; received: number }) => listener(stats);
    this.emitter.on("activity", handler);
    return () => this.emitter.off("activity", handler);
  }

  onError(listener: (error: Error) => void) {
    const handler = (error: Error) => listener(error);
    this.emitter.on("error", handler);
    return () => this.emitter.off("error", handler);
  }
}
