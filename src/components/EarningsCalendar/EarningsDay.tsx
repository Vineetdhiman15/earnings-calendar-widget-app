import { CompanyEarnings } from '../../types';
import CompanyItem from './CompanyItem';
import './EarningsCalendar.scss';

interface EarningsDayProps {
  companies: CompanyEarnings[];
}

const EarningsDay: React.FC<EarningsDayProps> = ({ companies }) => {
  return (
    <div className="company-list">
      {companies.map((company) => (
        <CompanyItem key={company.earnings.ticker} company={company} />
      ))}
    </div>
  );
};

export default EarningsDay;