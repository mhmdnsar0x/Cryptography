import { useEffect, useRef } from "react";

type TabType = "symmetric" | "asymmetric" | "hashing";

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    updateIndicator();
  }, [activeTab]);

  const updateIndicator = () => {
    const activeTabElement = tabsRef.current[activeTab];
    const indicator = indicatorRef.current;
    
    if (activeTabElement && indicator) {
      const rect = activeTabElement.getBoundingClientRect();
      const containerRect = activeTabElement.parentElement?.getBoundingClientRect();
      
      if (containerRect) {
        indicator.style.left = `${rect.left - containerRect.left}px`;
        indicator.style.width = `${rect.width}px`;
      }
    }
  };

  const tabs = [
    { id: "symmetric" as TabType, label: "Symmetric Encryption" },
    { id: "asymmetric" as TabType, label: "Asymmetric Encryption" },
    { id: "hashing" as TabType, label: "Hashing" },
  ];

  return (
    <nav className="container mx-auto px-6 mt-8 mb-12">
      <div className="flex justify-center">
        <div className="flex bg-white rounded-xl shadow-lg p-2 space-x-2 relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => (tabsRef.current[tab.id] = el)}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 relative z-10 ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <div
            ref={indicatorRef}
            className="absolute top-2 bottom-2 crypto-gradient rounded-lg transition-all duration-300 ease-in-out tab-indicator"
            style={{ left: 0, width: 0 }}
          />
        </div>
      </div>
    </nav>
  );
}
