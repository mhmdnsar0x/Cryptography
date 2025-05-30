import { useState } from "react";
import Header from "@/components/header";
import Navigation from "@/components/navigation";
import SymmetricEncryption from "@/components/symmetric-encryption";
import AsymmetricEncryption from "@/components/asymmetric-encryption";
import Hashing from "@/components/hashing";
import Footer from "@/components/footer";

type TabType = "symmetric" | "asymmetric" | "hashing";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("symmetric");

  const renderContent = () => {
    switch (activeTab) {
      case "symmetric":
        return <SymmetricEncryption />;
      case "asymmetric":
        return <AsymmetricEncryption />;
      case "hashing":
        return <Hashing />;
      default:
        return <SymmetricEncryption />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-6 py-12">
        <div className="fade-in">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
}
