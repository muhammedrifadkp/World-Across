// Simple JWT implementation for demo purposes
// Note: This is NOT secure for production use!

const SECRET_KEY = 'world-across-demo-secret-key-2024';

// Base64 URL encode
function base64UrlEncode(str) {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Base64 URL decode
function base64UrlDecode(str) {
  // Add padding if needed
  str += '='.repeat((4 - str.length % 4) % 4);
  return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
}

// Simple hash function for demo (NOT cryptographically secure)
function simpleHash(data) {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
}

// Generate JWT token
export function generateToken(payload, expiresIn = '24h') {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  // Calculate expiration time
  const now = Math.floor(Date.now() / 1000);
  let exp;
  
  if (expiresIn.endsWith('h')) {
    const hours = parseInt(expiresIn.slice(0, -1));
    exp = now + (hours * 60 * 60);
  } else if (expiresIn.endsWith('d')) {
    const days = parseInt(expiresIn.slice(0, -1));
    exp = now + (days * 24 * 60 * 60);
  } else {
    exp = now + (24 * 60 * 60); // Default 24 hours
  }

  const tokenPayload = {
    ...payload,
    iat: now,
    exp: exp
  };

  // Encode header and payload
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(tokenPayload));

  // Create signature (simple demo version)
  const signatureData = `${encodedHeader}.${encodedPayload}.${SECRET_KEY}`;
  const signature = base64UrlEncode(simpleHash(signatureData));

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Verify and decode JWT token
export function verifyToken(token) {
  try {
    if (!token) {
      return { valid: false, error: 'No token provided' };
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, error: 'Invalid token format' };
    }

    const [encodedHeader, encodedPayload, signature] = parts;

    // Verify signature
    const signatureData = `${encodedHeader}.${encodedPayload}.${SECRET_KEY}`;
    const expectedSignature = base64UrlEncode(simpleHash(signatureData));
    
    if (signature !== expectedSignature) {
      return { valid: false, error: 'Invalid signature' };
    }

    // Decode payload
    const payload = JSON.parse(base64UrlDecode(encodedPayload));

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return { valid: false, error: 'Token expired' };
    }

    return { valid: true, payload };
  } catch (error) {
    return { valid: false, error: 'Token verification failed' };
  }
}

// Get token from localStorage
export function getStoredToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('world_across_token');
  }
  return null;
}

// Store token in localStorage
export function storeToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('world_across_token', token);
  }
}

// Remove token from localStorage
export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('world_across_token');
  }
}

// Check if user is authenticated
export function isAuthenticated() {
  const token = getStoredToken();
  if (!token) return false;
  
  const verification = verifyToken(token);
  return verification.valid;
}

// Get current user from token
export function getCurrentUser() {
  const token = getStoredToken();
  if (!token) return null;
  
  const verification = verifyToken(token);
  if (!verification.valid) return null;
  
  return verification.payload.user;
}

// Demo function to create a token for john@example.com
export function createDemoToken() {
  const demoUser = {
    id: 1,
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'user'
  };
  
  return generateToken({ user: demoUser }, '24h');
}
