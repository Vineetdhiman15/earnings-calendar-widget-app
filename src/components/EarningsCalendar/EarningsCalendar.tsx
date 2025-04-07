import { useEffect, useState } from 'react';
import { useEarningsData } from '../../hooks/useEarningsData';
import EarningsDay from './EarningsDay';
import './EarningsCalendar.scss';
import { CompanyEarnings } from '../../types';
import { getCurrentWeekRange } from '../../utils/dateUtils';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const EarningsCalendar: React.FC = () => {
  const { data: earnings, isLoading, error } = useEarningsData();
  const [calendarData, setCalendarData] = useState<
    Record<string, { before: CompanyEarnings[]; after: CompanyEarnings[] }>
  >({});

  useEffect(() => {
    if (!earnings) return;

    const groupedData = DAYS_OF_WEEK.reduce((acc, day) => ({
      ...acc,
      [day]: { before: [], after: [] },
    }), {} as Record<string, { before: CompanyEarnings[]; after: CompanyEarnings[] }>);

    const { startOfWeek, endOfWeek } = getCurrentWeekRange();

    earnings.forEach((earning) => {
      const earningDate = new Date(earning.date);
      if (earningDate < startOfWeek || earningDate > endOfWeek) {
        console.log(`Skipping ${earning.ticker} due to date outside range: ${earning.date}`);
        return;
      }

      const timeParts = earning.time.split(':').map(Number);
      if (timeParts.length !== 3 || timeParts.some(isNaN)) {
        console.warn(`Invalid time format for ${earning.ticker}: ${earning.time}`);
        return;
      }
      const [hours, minutes] = timeParts;
      const totalMinutes = hours * 60 + minutes;
      const marketOpen = 9 * 60 + 30;
      const afterHoursThreshold = 16 * 60 + 30;

      if (totalMinutes < marketOpen) {
        const dayIndex = earningDate.getDay() - 1;
        if (dayIndex >= 0 && dayIndex < 5) {
          const dayName = DAYS_OF_WEEK[dayIndex];
          groupedData[dayName].before.push({
            earnings: earning,
            logo: '',
          });
        }
      } else if (totalMinutes >= afterHoursThreshold) {
        const dayIndex = earningDate.getDay() - 1;
        if (dayIndex >= 0 && dayIndex < 5) {
          const dayName = DAYS_OF_WEEK[dayIndex];
          groupedData[dayName].after.push({
            earnings: earning,
            logo: '',
          });
        }
      }
    });

    setCalendarData(groupedData);
  }, [earnings]);

  const getWeekStartDate = () => {
    const { startOfWeek } = getCurrentWeekRange();
    return startOfWeek.toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });
  };

  if (isLoading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error loading earnings data</div>;

  return (
    <div className="container">
      <div className="header-wrapper">
        <h1 className="header">Earnings Whispers</h1>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <div className="sub-header">Most Anticipated Earnings Releases</div>
          <div className="sub-header-date">for the week beginning</div>
          <div className="sub-header">{getWeekStartDate()}</div>
        </div>
      </div>
      <div className="calendar-grid">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day}>
            <h3 className="day-header">{day}</h3>
            <div className={`day-container ${day === 'Friday' ? 'friday' : ''}`}>
              <div>
                <p className="section-title">Before Open</p>
                <div className="section">
                  <EarningsDay companies={calendarData[day]?.before || []} />
                </div>
              </div>
              {day !== 'Friday' && (
                <div>
                  <p className="section-title">After Close</p>
                  <div className="section">
                    <EarningsDay companies={calendarData[day]?.after || []} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        <a href="http://eps.sh/cal" target="_blank" className="footer-link">
          http://eps.sh/cal
        </a>
        <span>© 2025 Earnings Whispers</span>
      </div>
    </div>
  );
};

export default EarningsCalendar;