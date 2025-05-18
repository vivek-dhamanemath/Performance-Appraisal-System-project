"use client";

import { useEffect, useState } from 'react';

export default function EnvTest() {
  const [envVars, setEnvVars] = useState<Record<string, string>>({});
  
  useEffect(() => {
    // Collect all NEXT_PUBLIC environment variables
    const vars: Record<string, string> = {};
    
    // These are the specific Firebase variables we need
    const requiredVars = [
      'NEXT_PUBLIC_FIREBASE_API_KEY',
      'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
      'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
      'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
      'NEXT_PUBLIC_FIREBASE_APP_ID'
    ];
    
    requiredVars.forEach(key => {
      vars[key] = process.env[key] || 'NOT FOUND';
    });
    
    setEnvVars(vars);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-xl mb-2">Firebase Config Variables:</h2>
        <pre className="bg-black text-green-400 p-4 rounded overflow-auto">
          {Object.entries(envVars).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {value === 'NOT FOUND' ? 
                <span className="text-red-500">NOT FOUND</span> : 
                <span className="text-green-500">✓ FOUND</span>}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
