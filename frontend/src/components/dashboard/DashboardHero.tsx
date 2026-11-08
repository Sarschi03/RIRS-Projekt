import { CalendarDays } from 'lucide-react';
import PageHero from '../common/PageHero';
import { useMockUser } from '../../context/MockUserContext';
import useToday from '../../hooks/useToday';

export default function DashboardHero() {
  const {user} = useMockUser();
  const today = useToday();
  return <PageHero title="Jasen pregled za uspešen dan." description={`Zdravo, ${user.firstName}. Oglejte si pregled svojega dela.`} meta={<time className="dashboard-date" dateTime={today.dateTime}><CalendarDays size={15} />{today.label}</time>} />;
}
