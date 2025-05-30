export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-800 text-gray-300 py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">CryptoSuite Pro</h3>
            <p className="text-gray-400 leading-relaxed">
              Advanced cryptographic tools for secure communication and data protection.
            </p>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-blue-500 pb-2">
              Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => window.location.reload()}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-left"
                >
                  Symmetric Encryption
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.location.reload()}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-left"
                >
                  Asymmetric Encryption
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.location.reload()}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-left"
                >
                  Hash Functions
                </button>
              </li>
            </ul>
          </div>

          {/* Info Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-blue-500 pb-2">
              Info
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Support
                </a>
              </li>
              <li>
                <a 
                  href="mailto:mohamednassar0x@gmail.com" 
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2025 CryptoSuite Pro. All rights reserved.</p>
          <p className="text-gray-500 mt-2">
            Developed by <span className="text-blue-400">Mhmd Nassar</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
