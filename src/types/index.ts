export interface Earnings {
    ticker: string;
    date: string;
    time: string;
    currency: string;
    date_confirmed: number;
    eps: string;
    eps_est: string;
    eps_prior: string;
    eps_surprise: string;
    eps_surprise_percent: string;
    eps_type: string;
    exchange: string;
    id: string;
    importance: number;
    name: string;
    notes: string;
    period: string;
    period_year: number;
    revenue: string;
    revenue_est: string;
    revenue_prior: string;
    revenue_surprise: string;
    revenue_surprise_percent: string;
    revenue_type: string;
    updated: number;
  }
  
  export interface Logo {
    id: string;
    search_key: string;
    files: {
      mark_vector_light: string;
    };
    created_at: string;
    updated_at: string;
  }
  
  export interface CompanyEarnings {
    earnings: Earnings;
    logo: string;
  }