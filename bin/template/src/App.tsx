import { useEffect, useState } from 'react'
import { useTheme } from './components/theme-provider'
import Header from './components/header';
const APP_NAME = '{{APP_NAME}}';

export default function App() {
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const renderAppName = () => {
    try {
      return APP_NAME;
    } catch (e) {
      return 'My App';
    }
  }

  return (
    <>
      <Header name={APP_NAME} />
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300'
        : 'bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50'
        }`}>
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="...">
                Welcome to {isMounted && <span className="...">{renderAppName()}</span>}
              </h1>

              <p className="text-xl dark:text-gray-500 mt-4">
                Your beautiful React app is ready to go! 🚀
              </p>
            </div>

            <div className="inline-block dark:bg-purple-400 rounded-2xl shadow-lg p-8 animate-float">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Get Started
                  </h2>
                  <p className="text-gray-600">
                    Edit this component in:{' '}
                    <code className="font-mono bg-gray-100 px-2 py-1 rounded">
                      src/App.tsx
                    </code>
                  </p>
                </div>

                <div className="flex justify-center space-x-6 mt-8">
                  <a href="https://twitter.com/ifeelsam"
                    target="_blank"
                    className="text-purple-700 hover:text-purple-900 transition-colors">
                    🐦 Twitter
                  </a>
                  <a href="https://github.com/ifeelsam"
                    target="_blank"
                    className="text-purple-700 hover:text-purple-900 transition-colors">
                    💻 GitHub
                  </a>
                  <a href="https://sanskarsharma.me"
                    target="_blank"
                    className="text-purple-700 hover:text-purple-900 transition-colors">
                    🌐 Portfolio
                  </a>
                </div>
              </div>
            </div>
            <div className='flex justify-center'>
              <button
                onClick={() => alert("Let's build something amazing!")}
                className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full hover:scale-105 transition-transform">
                Click Me ✨
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
