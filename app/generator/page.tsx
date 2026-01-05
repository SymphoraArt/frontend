import { GeneratorInterface } from '../components/GeneratorInterface';

// Force dynamic rendering - don't statically generate this page
export const dynamic = 'force-dynamic';

// Sample prompt data for demonstration
const samplePrompt = {
  id: 'sample-prompt-1',
  title: 'Futuristic Cityscape',
  description: 'Generate stunning images of futuristic cities with advanced technology, neon lights, and towering skyscrapers.',
  price: '0.1', // Price in LYX
  creatorAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', // Sample LUKSO address
  variables: [
    {
      id: 'style',
      name: 'style',
      type: 'select' as const,
      label: 'Art Style',
      required: true,
      options: [
        { label: 'Cyberpunk', promptValue: 'cyberpunk' },
        { label: 'Minimalist', promptValue: 'minimalist' },
        { label: 'Realistic', promptValue: 'realistic' },
        { label: 'Anime', promptValue: 'anime' }
      ]
    },
    {
      id: 'time',
      name: 'time',
      type: 'select' as const,
      label: 'Time of Day',
      required: true,
      options: [
        { label: 'Daytime', promptValue: 'daytime' },
        { label: 'Night', promptValue: 'night' },
        { label: 'Sunset', promptValue: 'sunset' },
        { label: 'Dawn', promptValue: 'dawn' }
      ]
    },
    {
      id: 'weather',
      name: 'weather',
      type: 'multi-select' as const,
      label: 'Weather Effects',
      required: false,
      options: [
        { label: 'Rain', promptValue: 'rain' },
        { label: 'Fog', promptValue: 'fog' },
        { label: 'Lightning', promptValue: 'lightning' },
        { label: 'Snow', promptValue: 'snow' }
      ]
    },
    {
      id: 'intensity',
      name: 'intensity',
      type: 'slider' as const,
      label: 'Technology Intensity',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      defaultValue: 7
    },
    {
      id: 'buildings',
      name: 'buildings',
      type: 'text' as const,
      label: 'Building Types',
      required: false,
      defaultValue: 'skyscrapers, flying vehicles'
    },
    {
      id: 'colors',
      name: 'colors',
      type: 'text' as const,
      label: 'Color Scheme',
      required: false,
      defaultValue: 'neon blue, purple, green'
    },
    {
      id: 'include_vehicles',
      name: 'include_vehicles',
      type: 'checkbox' as const,
      label: 'Include Flying Vehicles',
      required: false,
      defaultValue: true
    }
  ]
};

export default function GeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Image Generator</h1>
          <p className="text-lg text-gray-600">
            Create stunning AI-generated images powered by Google Gemini
          </p>
        </div>

        <GeneratorInterface prompt={samplePrompt} />
      </div>
    </div>
  );
}
