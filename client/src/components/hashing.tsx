import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Hash, Trash2, Copy, Check } from "lucide-react";
import { useCrypto } from "@/hooks/use-crypto";
import { useToast } from "@/hooks/use-toast";

type HashAlgorithm = "MD5" | "SHA1" | "SHA256" | "SHA3";

export default function Hashing() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<HashAlgorithm>("SHA256");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const { generateHash } = useCrypto();
  const { toast } = useToast();

  const algorithms = [
    { id: "MD5" as HashAlgorithm, name: "MD5", description: "Message Digest 5" },
    { id: "SHA1" as HashAlgorithm, name: "SHA-1", description: "Secure Hash Algorithm 1" },
    { id: "SHA256" as HashAlgorithm, name: "SHA-256", description: "SHA-2 Family (256-bit)" },
    { id: "SHA3" as HashAlgorithm, name: "SHA-3", description: "Keccac-based Algorithm" },
  ];

  const handleGenerateHash = async () => {
    if (!text) {
      toast({
        title: "Missing Text",
        description: "Please enter text to hash.",
        variant: "destructive",
      });
      return;
    }

    try {
      const hash = await generateHash(text, selectedAlgorithm);
      setResult(hash);
      toast({
        title: "Hash Generated",
        description: "Your text has been hashed successfully.",
      });
    } catch (error) {
      toast({
        title: "Hash Generation Failed",
        description: error instanceof Error ? error.message : "An error occurred during hashing.",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setText("");
    setResult("");
    toast({
      title: "Cleared",
      description: "All fields have been cleared.",
    });
  };

  const copyToClipboard = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied",
        description: "Hash copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Hash className="w-4 h-4 mr-2" />
          Cryptographic Hashing Functions
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Cryptographic Hashing Functions</h2>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Select Hash Algorithm:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {algorithms.map((algorithm) => (
              <div
                key={algorithm.id}
                onClick={() => setSelectedAlgorithm(algorithm.id)}
                className={`crypto-card-hover p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedAlgorithm === algorithm.id
                    ? "crypto-card-selected border-blue-500"
                    : "border-gray-200 hover:border-blue-400"
                }`}
              >
                <h3 className={`font-semibold text-lg mb-2 ${
                  selectedAlgorithm === algorithm.id ? "text-blue-600" : "text-gray-900"
                }`}>
                  {algorithm.name}
                </h3>
                <p className={`text-sm ${
                  selectedAlgorithm === algorithm.id ? "text-blue-600" : "text-gray-600"
                }`}>
                  {algorithm.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Text to Hash:
          </label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text to hash..."
            className="min-h-[120px] resize-none"
          />
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4 mb-8">
        <Button onClick={handleGenerateHash} className="crypto-gradient text-white px-8 py-3">
          <Hash className="w-4 h-4 mr-2" />
          Generate Hash
        </Button>
        <Button onClick={handleClear} variant="secondary" className="px-8 py-3">
          <Trash2 className="w-4 h-4 mr-2" />
          Clear All
        </Button>
      </div>

      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Hash className="w-4 h-4 mr-2" />
              Hash Result:
            </label>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white border-green-600"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <div className="bg-white rounded-lg border p-4 min-h-[80px] result-box break-all">
            {result || (
              <span className="text-gray-400">Hash will appear here...</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
