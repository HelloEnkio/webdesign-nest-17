
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const RESEND_KEY_STORAGE = 'resend_api_key';

export const getStoredResendKey = () => {
  return localStorage.getItem(RESEND_KEY_STORAGE);
};

export const ResendKeyManager = () => {
  const [apiKey, setApiKey] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedKey = getStoredResendKey();
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem(RESEND_KEY_STORAGE, apiKey.trim());
      toast({
        title: "Clé API sauvegardée",
        description: "Votre clé API Resend a été enregistrée localement.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="flex gap-2">
        <Input
          type={isVisible ? "text" : "password"}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Entrez votre clé API Resend"
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? "Masquer" : "Afficher"}
        </Button>
        <Button onClick={handleSave}>Sauvegarder</Button>
      </div>
    </div>
  );
};

