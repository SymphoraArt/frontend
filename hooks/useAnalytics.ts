/**
 * Analytics tracking hook for user interactions
 */

import React, { useCallback } from 'react';

export interface AnalyticsEvent {
  eventType: 'view' | 'preview_click' | 'unlock_intent' | 'unlock' | 'generation' | 'rating' | 'share' | 'favorite' | 'download';
  promptId?: string;
  creatorId?: string;
  sessionId?: string;
  referrer?: string;
  source?: string;
  campaign?: string;
  metadata?: Record<string, any>;
}

export function useAnalytics() {
  const trackEvent = useCallback(async (event: AnalyticsEvent) => {
    try {
      // Get session ID from localStorage or generate one
      const sessionId = event.sessionId ||
        (typeof window !== 'undefined' ? localStorage.getItem('analytics_session') : null) ||
        generateSessionId();

      // Store session ID
      if (typeof window !== 'undefined') {
        localStorage.setItem('analytics_session', sessionId);
      }

      // Get referrer
      const referrer = event.referrer ||
        (typeof window !== 'undefined' ? document.referrer : undefined) ||
        undefined;

      const eventData = {
        ...event,
        sessionId,
        referrer,
      };

      const response = await fetch('/api/analytics/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        console.warn('Analytics tracking failed:', response.status);
      }

      return response.ok;
    } catch (error) {
      console.warn('Analytics tracking error:', error);
      return false;
    }
  }, []);

  // Convenience methods for common events
  const trackPromptView = useCallback((promptId: string, source = 'marketplace') => {
    return trackEvent({
      eventType: 'view',
      promptId,
      source,
    });
  }, [trackEvent]);

  const trackPromptUnlock = useCallback((promptId: string, creatorId?: string) => {
    return trackEvent({
      eventType: 'unlock',
      promptId,
      creatorId,
    });
  }, [trackEvent]);

  const trackGeneration = useCallback((promptId: string, creatorId?: string, settings?: any) => {
    return trackEvent({
      eventType: 'generation',
      promptId,
      creatorId,
      metadata: { settings },
    });
  }, [trackEvent]);

  const trackRating = useCallback((promptId: string, rating: number, review?: string) => {
    return trackEvent({
      eventType: 'rating',
      promptId,
      metadata: { rating, review },
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPromptView,
    trackPromptUnlock,
    trackGeneration,
    trackRating,
  };
}

// Generate a simple session ID
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Analytics context provider (optional, for more advanced tracking)
// Note: This function should be moved to a .tsx file if JSX is needed
export function AnalyticsProvider({ children }: { children: React.ReactNode }): React.ReactNode {
  // Could add global analytics context here
  return children;
}