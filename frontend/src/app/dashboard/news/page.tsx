// Redirect to main dashboard since Live News is now the default view
import { redirect } from 'next/navigation';

export default function NewsPage() {
  redirect('/dashboard');
}
