export interface TavusConfig {
  apiKey: string;
  baseUrl: string;
}

export interface TavusAvatar {
  avatar_id: string;
  avatar_name: string;
  status: 'ready' | 'processing' | 'error';
  preview_video_url?: string;
  thumbnail_image_url?: string;
}

export interface TavusConversationRequest {
  replica_id: string;
  script?: string;
  background?: string;
  properties?: {
    voice_settings?: {
      stability: number;
      similarity_boost: number;
      style: number;
    };
  };
}

export interface TavusConversationResponse {
  conversation_id: string;
  conversation_url: string;
  status: 'processing' | 'completed' | 'error';
}

class TavusAPI {
  private config: TavusConfig;

  constructor(config: TavusConfig) {
    this.config = config;
  }

  private validateConfig(): boolean {
    if (!this.config.apiKey || this.config.apiKey === 'your_actual_tavus_api_key_here') {
      return false;
    }
    if (!this.config.baseUrl) {
      return false;
    }
    return true;
  }

  async getReplicas(): Promise<TavusAvatar[]> {
    if (!this.validateConfig()) {
      return [];
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/replicas`, {
        method: 'GET',
        headers: {
          'x-api-key': this.config.apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Tavus API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      return [];
    }
  }

  async createConversation(request: TavusConversationRequest): Promise<TavusConversationResponse> {
    if (!this.validateConfig()) {
      throw new Error('Tavus API is not properly configured');
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/conversations`, {
        method: 'POST',
        headers: {
          'x-api-key': this.config.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Tavus API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async testConnection(): Promise<boolean> {
    if (!this.validateConfig()) {
      return false;
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/replicas`, {
        method: 'GET',
        headers: {
          'x-api-key': this.config.apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async getReplica(replicaId: string): Promise<TavusAvatar | null> {
    if (!this.validateConfig()) {
      return null;
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/replicas/${replicaId}`, {
        method: 'GET',
        headers: {
          'x-api-key': this.config.apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  }
}

let tavusInstance: TavusAPI | null = null;

export const getTavusAPI = (): TavusAPI => {
  if (!tavusInstance) {
    const config: TavusConfig = {
      apiKey: process.env.NEXT_PUBLIC_TAVUS_API_KEY || '85dd7fbe21be401ca4b5a9efa90bb26f',
      baseUrl: process.env.NEXT_PUBLIC_TAVUS_BASE_URL || 'https://tavusapi.com/v2'
    };
    
    tavusInstance = new TavusAPI(config);
  }
  
  return tavusInstance;
};

export const getCompanionAvatarId = (companionName: string): string => {
  const avatarMapping: Record<string, string> = {
    'SAGE': process.env.NEXT_PUBLIC_SAGE_AVATAR_ID || 'p666fe2bf389',
    'MAYA': 'maya-replica-id',
    'ALEX': 'alex-replica-id',
    'VITA': 'vita-replica-id',
    'FELIX': 'felix-replica-id',
    'LUNA': 'luna-replica-id'
  };
  
  const avatarId = avatarMapping[companionName] || 'p666fe2bf389';
  return avatarId;
};

export const getVoiceSettings = (companionName: string) => {
  const voiceMapping: Record<string, any> = {
    'SAGE': { stability: 0.8, similarity_boost: 0.7, style: 0.3 },
    'MAYA': { stability: 0.7, similarity_boost: 0.8, style: 0.6 },
    'ALEX': { stability: 0.9, similarity_boost: 0.6, style: 0.8 },
    'VITA': { stability: 0.6, similarity_boost: 0.9, style: 0.9 },
    'FELIX': { stability: 0.9, similarity_boost: 0.7, style: 0.4 },
    'LUNA': { stability: 0.5, similarity_boost: 0.8, style: 0.9 }
  };
  
  const settings = voiceMapping[companionName] || { stability: 0.7, similarity_boost: 0.7, style: 0.5 };
  return settings;
};