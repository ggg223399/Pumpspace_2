import { useState, useEffect } from 'react';
import type { Token } from '../types/token';

export function useSearch(tokens: Token[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTokens, setFilteredTokens] = useState(tokens);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredTokens(tokens);
      return;
    }

    const filtered = tokens.filter(token => 
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredTokens(filtered);
  }, [searchTerm, tokens]);

  return { filteredTokens, searchTerm, setSearchTerm };
}