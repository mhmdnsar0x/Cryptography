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
        <div className="flex bg-transparent space-x-8 relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => (tabsRef.current[tab.id] = el)}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-4 font-medium transition-all duration-300 relative border-b-2 ${
                activeTab === tab.id
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 hover:text-blue-500 border-transparent hover:border-blue-300"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animated-underline" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
