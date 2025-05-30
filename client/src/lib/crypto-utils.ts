import CryptoJS from 'crypto-js';

export type SymmetricAlgorithm = "DES" | "3DES" | "AES" | "Blowfish";
export type AsymmetricAlgorithm = "RSA" | "ECC" | "ElGamal";
export type HashAlgorithm = "MD5" | "SHA1" | "SHA256" | "SHA3";
export type EncryptionMode = "CBC" | "ECB" | "CFB" | "OFB";

export class CryptoUtils {
  // Generate symmetric key
  static generateSymmetricKey(algorithm: SymmetricAlgorithm): string {
    let keyLength: number;
    
    switch (algorithm) {
      case "DES":
        keyLength = 8; // 64 bits
        break;
      case "3DES":
        keyLength = 24; // 192 bits
        break;
      case "AES":
        keyLength = 32; // 256 bits
        break;
      case "Blowfish":
        keyLength = 16; // 128 bits
        break;
      default:
        keyLength = 32;
    }
    
    return CryptoJS.lib.WordArray.random(keyLength).toString();
  }

  // Symmetric encryption
  static async encryptSymmetric(
    text: string,
    key: string,
    algorithm: SymmetricAlgorithm,
    mode: EncryptionMode = "CBC"
  ): Promise<string> {
    try {
      let encrypted: CryptoJS.lib.CipherParams;
      
      // Configure mode
      const modeConfig = this.getModeConfig(mode);
      
      switch (algorithm) {
        case "AES":
          encrypted = CryptoJS.AES.encrypt(text, key, modeConfig);
          break;
        case "DES":
          encrypted = CryptoJS.DES.encrypt(text, key, modeConfig);
          break;
        case "3DES":
          encrypted = CryptoJS.TripleDES.encrypt(text, key, modeConfig);
          break;
        case "Blowfish":
          // Blowfish simulation using AES as fallback
          encrypted = CryptoJS.AES.encrypt(text, key);
          break;
        default:
          throw new Error(`Unsupported algorithm: ${algorithm}`);
      }
      
      return encrypted.toString();
    } catch (error) {
      throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Symmetric decryption
  static async decryptSymmetric(
    encryptedText: string,
    key: string,
    algorithm: SymmetricAlgorithm,
    mode: EncryptionMode = "CBC"
  ): Promise<string> {
    try {
      let decrypted: CryptoJS.lib.WordArray;
      
      // Configure mode
      const modeConfig = this.getModeConfig(mode);
      
      switch (algorithm) {
        case "AES":
          decrypted = CryptoJS.AES.decrypt(encryptedText, key, modeConfig);
          break;
        case "DES":
          decrypted = CryptoJS.DES.decrypt(encryptedText, key, modeConfig);
          break;
        case "3DES":
          decrypted = CryptoJS.TripleDES.decrypt(encryptedText, key, modeConfig);
          break;
        case "Blowfish":
          // Blowfish simulation using AES as fallback
          decrypted = CryptoJS.AES.decrypt(encryptedText, key);
          break;
        default:
          throw new Error(`Unsupported algorithm: ${algorithm}`);
      }
      
      const result = decrypted.toString(CryptoJS.enc.Utf8);
      if (!result) {
        throw new Error('Decryption failed - invalid key or corrupted data');
      }
      
      return result;
    } catch (error) {
      throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get CryptoJS mode configuration
  private static getModeConfig(mode: EncryptionMode) {
    const iv = CryptoJS.lib.WordArray.random(16);
    
    switch (mode) {
      case "CBC":
        return { mode: CryptoJS.mode.CBC, iv };
      case "ECB":
        return { mode: CryptoJS.mode.ECB };
      case "CFB":
        return { mode: CryptoJS.mode.CFB, iv };
      case "OFB":
        return { mode: CryptoJS.mode.OFB, iv };
      default:
        return { mode: CryptoJS.mode.CBC, iv };
    }
  }

  // Generate asymmetric key pair (simulated)
  static async generateAsymmetricKeyPair(algorithm: AsymmetricAlgorithm): Promise<{
    publicKey: string;
    privateKey: string;
  }> {
    // For demonstration purposes, we'll generate simulated key pairs
    // In a real implementation, you would use WebCrypto API or a proper crypto library
    
    const keyId = CryptoJS.lib.WordArray.random(16).toString();
    
    const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA${keyId}
2K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z
9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K
3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J
8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z
9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K
3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J
8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z
9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8K3Z9J8QIDAQAB
-----END PUBLIC KEY-----`;

    const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDYrdn0nwrdn0nw
${keyId}rdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0
nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrd
n0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nw
rdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0
nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrd
n0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nw
rdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwIDAQ
ABAgEBAKrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nw
rdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0
nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrd
n0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nw
rdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0
nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrd
n0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nw
rdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0nwrdn0
-----END PRIVATE KEY-----`;

    return { publicKey, privateKey };
  }

  // Asymmetric encryption (simulated)
  static async encryptAsymmetric(
    text: string,
    publicKey: string,
    algorithm: AsymmetricAlgorithm
  ): Promise<string> {
    // Simulate asymmetric encryption
    const timestamp = Date.now().toString();
    const simulatedEncryption = btoa(`${text}_encrypted_with_${algorithm}_public_key_${timestamp}`);
    return simulatedEncryption;
  }

  // Asymmetric decryption (simulated)
  static async decryptAsymmetric(
    encryptedText: string,
    privateKey: string,
    algorithm: AsymmetricAlgorithm
  ): Promise<string> {
    try {
      // Simulate asymmetric decryption
      const decoded = atob(encryptedText);
      const parts = decoded.split(`_encrypted_with_${algorithm}_public_key_`);
      
      if (parts.length === 2) {
        return parts[0];
      } else {
        throw new Error('Invalid encrypted text format');
      }
    } catch (error) {
      throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Invalid encrypted text'}`);
    }
  }

  // Generate hash
  static async generateHash(text: string, algorithm: HashAlgorithm): Promise<string> {
    try {
      let hash: CryptoJS.lib.WordArray;
      
      switch (algorithm) {
        case "MD5":
          hash = CryptoJS.MD5(text);
          break;
        case "SHA1":
          hash = CryptoJS.SHA1(text);
          break;
        case "SHA256":
          hash = CryptoJS.SHA256(text);
          break;
        case "SHA3":
          hash = CryptoJS.SHA3(text);
          break;
        default:
          throw new Error(`Unsupported hash algorithm: ${algorithm}`);
      }
      
      return hash.toString();
    } catch (error) {
      throw new Error(`Hashing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
