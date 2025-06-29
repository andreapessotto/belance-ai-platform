# BELANCE - AI Life Balance Council

Your personal AI support network with 6 specialized companions designed to transform urban loneliness into personal growth.

## Features

- **6 AI Companions**: SAGE, MAYA, ALEX, VITA, FELIX, and LUNA - each specialized in different life areas
- **Video Conversations**: Face-to-face interactions with AI avatars powered by Tavus
- **Life Wheel Assessment**: Track your balance across 6 key life areas
- **Proactive Support**: Calendar integration for timely interventions
- **Cross-Companion Memory**: Your companions remember and share relevant context

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Video AI**: Tavus API for realistic avatar conversations
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Netlify

## Tavus Integration

BELANCE uses Tavus to create realistic AI avatar conversations. To enable Tavus:

1. Sign up for a Tavus account at [tavus.io](https://tavus.io)
2. Get your API key from the Tavus dashboard
3. Copy `.env.example` to `.env.local` and add your Tavus credentials:

```bash
NEXT_PUBLIC_TAVUS_API_KEY=your_tavus_api_key_here
NEXT_PUBLIC_TAVUS_BASE_URL=https://api.tavus.io/v1
```

### Tavus Features Used

- **Avatar Creation**: Custom AI avatars for each companion
- **Real-time Conversations**: WebSocket-based live video interactions
- **Voice Customization**: Different voice settings per companion
- **Background Settings**: Studio backgrounds for professional appearance

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (copy `.env.example` to `.env.local`)
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Companion Profiles

### SAGE (Free Tier)
- **Specialty**: Mental Health & Personal Development
- **Voice**: Calm, deep tone
- **Approach**: Mindful, philosophical

### MAYA (Premium)
- **Specialty**: Relationships & Love
- **Voice**: Warm, caring tone
- **Approach**: Heart-centered, empathetic

### ALEX (Premium)
- **Specialty**: Career & Professional Growth
- **Voice**: Confident, encouraging tone
- **Approach**: Goal-focused, strategic

### VITA (Premium Plus)
- **Specialty**: Health & Wellness
- **Voice**: Energetic, positive tone
- **Approach**: Holistic wellness, motivational

### FELIX (Premium Plus)
- **Specialty**: Finance & Life Organization
- **Voice**: Professional, reassuring tone
- **Approach**: Data-driven, systematic

### LUNA (Premium Plus)
- **Specialty**: Creativity & Social Life
- **Voice**: Playful, inspiring tone
- **Approach**: Creative exploration, spontaneous

## Video Call Features

- **HD/4K Video Quality**: Based on subscription tier
- **Real-time Interaction**: Live conversation with AI avatars
- **Voice Controls**: Mute/unmute, camera toggle
- **Captions**: Real-time transcription
- **Mirror Mode**: Practice conversations
- **Background Customization**: Professional studio settings

## Development

### File Structure

```
components/
├── video/
│   ├── video-call.tsx          # Main video call component
│   └── tavus-video-call.tsx    # Tavus-powered video calls
├── onboarding/
│   └── comprehensive-onboarding.tsx
└── ...

lib/
├── tavus.ts                    # Tavus API integration
├── types.ts                    # TypeScript definitions
└── ...
```

### Environment Variables

```bash
# Tavus Configuration
NEXT_PUBLIC_TAVUS_API_KEY=your_api_key
NEXT_PUBLIC_TAVUS_BASE_URL=https://api.tavus.io/v1

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

The app is configured for deployment on Netlify with static export:

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support with Tavus integration or general questions, please open an issue or contact the development team.