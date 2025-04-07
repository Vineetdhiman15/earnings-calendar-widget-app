import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Earnings } from '../types';
import { getCurrentWeekRange } from '../utils/dateUtils';

const API_KEY = 'f090a778d74f4450a11ad417ad72740c';

export const useEarningsData = () => {
  return useQuery<Earnings[]>({
    queryKey: ['earnings'],
    queryFn: async () => {
      const { startDate, endDate } = getCurrentWeekRange();

      const response = await axios.get(`https://api.benzinga.com/api/v2.1/calendar/earnings`, {
        headers: {
          accept: 'application/json',
        },
        params: {
          token: API_KEY,
          'parameters[date_from]': startDate,
          'parameters[date_to]': endDate,
        },
      });

      return response.data.earnings || [];
    },
  });
};

export default useEarningsData;