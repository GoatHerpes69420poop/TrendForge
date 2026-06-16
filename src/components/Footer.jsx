export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">TF</span>
            </div>
            <span className="font-semibold text-gray-700">TrendForge AI</span>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} TrendForge AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <span>AI-Powered Templates</span>
            <span>Instant Download</span>
            <span>Premium Quality</span>
          </div>
        </div>
      </div>
    </footer>
  )
}