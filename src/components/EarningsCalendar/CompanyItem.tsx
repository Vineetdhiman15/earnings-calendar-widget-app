import { useCompanyLogo } from '../../hooks/useCompanyLogo';
import './EarningsCalendar.scss';
import { CompanyEarnings } from '../../types';

interface CompanyItemProps {
  company: CompanyEarnings;
}

const CompanyItem: React.FC<CompanyItemProps> = ({ company }) => {
  const { data: logoData, isLoading, error } = useCompanyLogo(company.earnings.ticker);

  const handleClick = () => {
    window.open(`https://www.benzinga.com/quote/${company.earnings.ticker.toLowerCase()}`, '_blank');
  };

  return (
    <div className="company-item" onClick={handleClick}>
      {isLoading ? (
        <span className="ticker">Loading...</span>
      ) : error || !logoData?.files?.mark_vector_light ? (
        <span className="ticker">{company.earnings.ticker}</span>
      ) : (
        <img
          className="logo"
          src={logoData.files.mark_vector_light}
          alt={`${company.earnings.ticker} logo`}
        />
      )}
    </div>
  );
};

export default CompanyItem;