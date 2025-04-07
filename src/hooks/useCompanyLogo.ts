import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Logo } from '../types';

const API_KEY = 'f090a778d74f4450a11ad417ad72740c';

export const useCompanyLogo = (ticker: string) => {
  return useQuery<Logo>({
    queryKey: ['logo', ticker],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.benzinga.com/api/v2/logos/search?token=${API_KEY}&search_keys=${ticker}&search_keys_type=symbol&fields=mark_vector_light`,
        {
          headers: {
            accept: 'application/json',
          },
        }
      );
      if (response.data.ok && response.data.data.length > 0) {
        return response.data.data[0];
      }
      throw new Error(`No logo found for ticker ${ticker}`);
    },
  });
};