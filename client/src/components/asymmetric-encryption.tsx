import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Key, Lock, Trash2, Copy, Check, Plus } from "lucide-react";
import { useCrypto } from "@/hooks/use-crypto";
import { useToast } from "@/hooks/use-toast";

type AsymmetricAlgorithm = "RSA" | "ECC" | "ElGamal";

export default function AsymmetricEncryption() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AsymmetricAlgorithm>("RSA");
  const [text, setText] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState({ result: false, public: false, private: false });
  const { generateAsymmetricKeyPair, encryptAsymmetric, decryptAsymmetric } = useCrypto();
  const { toast } = useToast();

  const algorithms = [
    { id: "RSA" as AsymmetricAlgorithm, name: "RSA", description: "Rivest-Shamir-Adleman" },
    { id: "ECC" as AsymmetricAlgorithm, name: "ECC", description: "Elliptic Curve Cryptography" },
    { id: "ElGamal" as AsymmetricAlgorithm, name: "ElGamal", description: "ElGamal Encryption" },
  ];

  const handleGenerateKeys = async () => {
    try {
      const keyPair = await generateAsymmetricKeyPair(selectedAlgorithm);
      setPublicKey(keyPair.publicKey);
      setPrivateKey(keyPair.privateKey);
      toast({
        title: "Keys Generated",
        description: "New key pair has been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Key Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate keys.",
        variant: "destructive",
      });
    }
  };

  const handleClearKeys = () => {
    setPublicKey("");
    setPrivateKey("");
    setResult("");
    setText("");
    toast({
      title: "Cleared",
      description: "All fields have been cleared.",
    });
  };

  const handleEncrypt = async () => {
    if (!text || !publicKey) {
      toast({
        title: "Missing Information",
        description: "Please enter text and ensure you have a public key.",
        variant: "destructive",
      });
      return;
    }

    try {
      const encrypted = await encryptAsymmetric(text, publicKey, selectedAlgorithm);
      setResult(encrypted);
      toast({
        title: "Encryption Successful",
        description: "Your text has been encrypted with the public key.",
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
    if (!text || !privateKey) {
      toast({
        title: "Missing Information",
        description: "Please enter encrypted text and ensure you have a private key.",
        variant: "destructive",
      });
      return;
    }

    try {
      const decrypted = await decryptAsymmetric(text, privateKey, selectedAlgorithm);
      setResult(decrypted);
      toast({
        title: "Decryption Successful",
        description: "Your text has been decrypted with the private key.",
      });
    } catch (error) {
      toast({
        title: "Decryption Failed",
        description: error instanceof Error ? error.message : "An error occurred during decryption.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async (content: string, type: "result" | "public" | "private") => {
    if (!content) return;
    
    try {
      await navigator.clipboard.writeText(content);
      setCopied({ ...copied, [type]: true });
      setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
      toast({
        title: "Copied",
        description: `${type === "result" ? "Result" : type === "public" ? "Public key" : "Private key"} copied to clipboard.`,
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
          <Key className="w-4 h-4 mr-2" />
          Asymmetric Encryption Algorithms
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Asymmetric Encryption Algorithms</h2>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Select Encryption Algorithm:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <div className="flex justify-center gap-4 mb-8">
        <Button onClick={handleGenerateKeys} className="bg-green-600 hover:bg-green-700 px-8 py-3">
          <Plus className="w-4 h-4 mr-2" />
          Generate New Key Pair
        </Button>
        <Button onClick={handleClearKeys} variant="secondary" className="px-8 py-3">
          <Trash2 className="w-4 h-4 mr-2" />
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Key className="w-4 h-4 mr-2 text-orange-500" />
                Public Key:
              </label>
              <Button
                onClick={() => copyToClipboard(publicKey, "public")}
                variant="outline"
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white border-green-600"
              >
                {copied.public ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied.public ? "Copied!" : "Copy"}
              </Button>
            </div>
            <div className="bg-white rounded-lg border p-4 min-h-[120px] result-box text-xs">
              {publicKey || (
                <span className="text-gray-400">Public key will be generated here...</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Key className="w-4 h-4 mr-2 text-red-500" />
                Private Key:
              </label>
              <Button
                onClick={() => copyToClipboard(privateKey, "private")}
                variant="outline"
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white border-green-600"
              >
                {copied.private ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied.private ? "Copied!" : "Copy"}
              </Button>
            </div>
            <div className="bg-white rounded-lg border p-4 min-h-[120px] result-box text-xs">
              {privateKey || (
                <span className="text-gray-400">Private key will be generated here...</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
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

      <div className="flex justify-center gap-4 mb-8">
        <Button onClick={handleEncrypt} className="crypto-gradient text-white px-8 py-3">
          <Lock className="w-4 h-4 mr-2" />
          Encrypt with Public Key
        </Button>
        <Button onClick={handleDecrypt} variant="destructive" className="px-8 py-3">
          <Lock className="w-4 h-4 mr-2" />
          Decrypt with Private Key
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
              onClick={() => copyToClipboard(result, "result")}
              variant="outline"
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white border-green-600"
            >
              {copied.result ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              {copied.result ? "Copied!" : "Copy"}
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
