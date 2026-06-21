import { useEffect, useRef, useCallback } from 'react';

export type RealtimeNotificationEvent = {
  id: string;
  title: string;
  message: string;
  type: string;
  link?: string;
  createdAt: string;
  isRead: boolean;
  [key: string]: any;
};

type Options = {
  onNotification: (n: RealtimeNotificationEvent) => void;
  enabled?: boolean;
};

/**
 * Connects to the backend SSE stream (/api/notifications/stream) and calls
 * onNotification for each incoming notification event.
 *
 * Uses the native EventSource API — works over plain HTTP/HTTPS through
 * any proxy (including Replit's), no WebSocket protocol upgrade needed.
 * EventSource auto-reconnects natively.
 */
export function useRealtimeNotifications({ onNotification, enabled = true }: Options) {
  const esRef = useRef<EventSource | null>(null);
  const mountedRef = useRef(true);
  const onNotificationRef = useRef(onNotification);
  onNotificationRef.current = onNotification;

  const connect = useCallback(() => {
    if (!mountedRef.current || !enabled) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    // SSE endpoint — auth via query param (EventSource doesn't support headers)
    const url = `/api/notifications/stream?token=${encodeURIComponent(token)}`;

    try {
      const es = new EventSource(url);
      esRef.current = es;

      es.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'notification' && msg.data) {
            onNotificationRef.current(msg.data as RealtimeNotificationEvent);
          }
        } catch {}
      };

      es.onerror = () => {
        // EventSource handles reconnection automatically — we just close the
        // current instance if the component is unmounted.
        if (!mountedRef.current) {
          es.close();
          esRef.current = null;
        }
      };
    } catch {}
  }, [enabled]);

  useEffect(() => {
    mountedRef.current = true;
    connect();

    return () => {
      mountedRef.current = false;
      esRef.current?.close();
      esRef.current = null;
    };
  }, [connect]);
}
