import { CalendarDays } from 'lucide-react';
import PageHero from '../common/PageHero';
import { useAuth } from '../../context/AuthContext';
import useToday from '../../hooks/useToday';

export default function DashboardHero() {
  const {user} = useAuth();
  const today = useToday();
  return <PageHero title="Jasen pregled za uspešen dan." description={`Zdravo, ${user?.firstName || ""}. Oglejte si pregled svojega dela.`} meta={<time className="dashboard-date" dateTime={today.dateTime}><CalendarDays size={15} />{today.label}</time>} />;
}
