interface FooterProps {
  onNavigationChange?: (tab: "symmetric" | "asymmetric" | "hashing") => void;
}

export default function Footer({ onNavigationChange }: FooterProps) {
  const handleServiceClick = (service: "symmetric" | "asymmetric" | "hashing") => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Change the active tab if callback is provided
    if (onNavigationChange) {
      onNavigationChange(service);
    }
  };

  return (
    <footer className="text-gray-300 py-12 mt-20" style={{ backgroundColor: 'hsl(var(--footer-dark))' }}>
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
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleServiceClick("symmetric")}
                  className="footer-link text-gray-400 hover:text-blue-400 text-left"
                >
                  Symmetric Encryption
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleServiceClick("asymmetric")}
                  className="footer-link text-gray-400 hover:text-blue-400 text-left"
                >
                  Asymmetric Encryption
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleServiceClick("hashing")}
                  className="footer-link text-gray-400 hover:text-blue-400 text-left"
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
            <ul className="space-y-3">
              <li>
                <a href="#" className="footer-link text-gray-400 hover:text-blue-400">
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="mailto:mohamednassar0x@gmail.com" 
                  className="footer-link text-gray-400 hover:text-blue-400"
                >
                  Support
                </a>
              </li>
              <li>
                <a 
                  href="mailto:mohamednassar0x@gmail.com" 
                  className="footer-link text-gray-400 hover:text-blue-400"
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
