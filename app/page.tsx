import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to AIgency
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-powered content generation platform on the LUKSO blockchain
          </p>
          <p className="text-lg text-gray-700 mb-12">
            Create stunning AI-generated images with customizable prompts, powered by Google Gemini and secured on LUKSO.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/generator"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Generating
            </Link>
            <Link
              href="/generations"
              className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              View Generations
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">
                Leverage Google Gemini for high-quality content generation
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Blockchain Secured</h3>
              <p className="text-gray-600">
                Built on LUKSO for transparent and secure transactions
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Customizable</h3>
              <p className="text-gray-600">
                Fine-tune your generations with flexible prompt templates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
