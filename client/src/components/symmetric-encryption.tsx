import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Key, Trash2, Copy, Check } from "lucide-react";
import { useCrypto } from "@/hooks/use-crypto";
import { useToast } from "@/hooks/use-toast";

type SymmetricAlgorithm = "DES" | "3DES" | "AES" | "Blowfish";
type EncryptionMode = "CBC" | "ECB" | "CFB" | "OFB";

export default function SymmetricEncryption() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SymmetricAlgorithm>("Blowfish");
  const [mode, setMode] = useState<EncryptionMode>("CBC");
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const { encryptSymmetric, decryptSymmetric, generateKey } = useCrypto();
  const { toast } = useToast();

  const algorithms = [
    { id: "DES" as SymmetricAlgorithm, name: "DES", description: "Data Encryption Standard" },
    { id: "3DES" as SymmetricAlgorithm, name: "3DES", description: "Triple Data Encryption Standard" },
    { id: "AES" as SymmetricAlgorithm, name: "AES", description: "Advanced Encryption Standard" },
    { id: "Blowfish" as SymmetricAlgorithm, name: "Blowfish", description: "Fast Block Cipher" },
  ];

  const handleGenerateKey = () => {
    const newKey = generateKey(selectedAlgorithm);
    setKey(newKey);
    toast({
      title: "Key Generated",
      description: "A new secret key has been generated.",
    });
  };

  const handleEncrypt = async () => {
    if (!text || !key) {
      toast({
        title: "Missing Information",
        description: "Please enter both text and key.",
        variant: "destructive",
      });
      return;
    }

    try {
      const encrypted = await encryptSymmetric(text, key, selectedAlgorithm, mode);
      setResult(encrypted);
      toast({
        title: "Encryption Successful",
        description: "Your text has been encrypted.",
      });
    } catch (error) {
      toast({
        title: "Encryption Failed",
        description: error instanceof Error ? error.message : "An error occurred during encryption.",
        variant: "destructive",
      });
    }
  };

  const handleDecrypt = async () => {
    if (!text || !key) {
      toast({
        title: "Missing Information",
        description: "Please enter both encrypted text and key.",
        variant: "destructive",
      });
      return;
    }

    try {
      const decrypted = await decryptSymmetric(text, key, selectedAlgorithm, mode);
      setResult(decrypted);
      toast({
        title: "Decryption Successful",
        description: "Your text has been decrypted.",
      });
    } catch (error) {
      toast({
        title: "Decryption Failed",
        description: error instanceof Error ? error.message : "An error occurred during decryption.",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setText("");
    setKey("");
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
        description: "Result copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const showModeSelection = selectedAlgorithm === "AES" || selectedAlgorithm === "DES" || selectedAlgorithm === "3DES";

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Lock className="w-4 h-4 mr-2" />
          Symmetric Encryption Algorithms
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Symmetric Encryption Algorithms</h2>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Select Encryption Algorithm:
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

      <Card className="mb-6">
        <CardContent className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Text to Encrypt/Decrypt:
          </label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your message here..."
            className="min-h-[120px] resize-none"
          />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Secret Key:
          </label>
          <div className="flex gap-3">
            <Input
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter or generate a secret key..."
              className="flex-1"
            />
            <Button onClick={handleGenerateKey} className="bg-green-600 hover:bg-green-700">
              <Key className="w-4 h-4 mr-2" />
              Generate Random Key
            </Button>
          </div>
        </CardContent>
      </Card>

      {showModeSelection && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Encryption Mode:
            </label>
            <Select value={mode} onValueChange={(value: EncryptionMode) => setMode(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select encryption mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CBC">CBC (Cipher Block Chaining)</SelectItem>
                <SelectItem value="ECB">ECB (Electronic Codebook)</SelectItem>
                <SelectItem value="CFB">CFB (Cipher Feedback)</SelectItem>
                <SelectItem value="OFB">OFB (Output Feedback)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center gap-4 mb-8">
        <Button onClick={handleEncrypt} className="crypto-gradient text-white px-8 py-3">
          <Lock className="w-4 h-4 mr-2" />
          Encrypt
        </Button>
        <Button onClick={handleDecrypt} variant="destructive" className="px-8 py-3">
          <Lock className="w-4 h-4 mr-2" />
          Decrypt
        </Button>
        <Button onClick={handleClear} variant="secondary" className="px-8 py-3">
          <Trash2 className="w-4 h-4 mr-2" />
          Clear All
        </Button>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              Encryption Result:
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
          <div className="bg-white rounded-lg border p-4 min-h-[100px] result-box">
            {result || (
              <span className="text-gray-400">Results will appear here...</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
