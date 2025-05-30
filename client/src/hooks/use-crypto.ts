import { CryptoUtils } from "@/lib/crypto-utils";
import type { 
  SymmetricAlgorithm, 
  AsymmetricAlgorithm, 
  HashAlgorithm, 
  EncryptionMode 
} from "@/lib/crypto-utils";

export function useCrypto() {
  const generateKey = (algorithm: SymmetricAlgorithm): string => {
    return CryptoUtils.generateSymmetricKey(algorithm);
  };

  const encryptSymmetric = async (
    text: string,
    key: string,
    algorithm: SymmetricAlgorithm,
    mode: EncryptionMode = "CBC"
  ): Promise<string> => {
    return CryptoUtils.encryptSymmetric(text, key, algorithm, mode);
  };

  const decryptSymmetric = async (
    encryptedText: string,
    key: string,
    algorithm: SymmetricAlgorithm,
    mode: EncryptionMode = "CBC"
  ): Promise<string> => {
    return CryptoUtils.decryptSymmetric(encryptedText, key, algorithm, mode);
  };

  const generateAsymmetricKeyPair = async (algorithm: AsymmetricAlgorithm) => {
    return CryptoUtils.generateAsymmetricKeyPair(algorithm);
  };

  const encryptAsymmetric = async (
    text: string,
    publicKey: string,
    algorithm: AsymmetricAlgorithm
  ): Promise<string> => {
    return CryptoUtils.encryptAsymmetric(text, publicKey, algorithm);
  };

  const decryptAsymmetric = async (
    encryptedText: string,
    privateKey: string,
    algorithm: AsymmetricAlgorithm
  ): Promise<string> => {
    return CryptoUtils.decryptAsymmetric(encryptedText, privateKey, algorithm);
  };

  const generateHash = async (
    text: string,
    algorithm: HashAlgorithm
  ): Promise<string> => {
    return CryptoUtils.generateHash(text, algorithm);
  };

  return {
    generateKey,
    encryptSymmetric,
    decryptSymmetric,
    generateAsymmetricKeyPair,
    encryptAsymmetric,
    decryptAsymmetric,
    generateHash,
  };
}
