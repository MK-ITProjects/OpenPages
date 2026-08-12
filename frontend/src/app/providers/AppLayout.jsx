import { Outlet } from 'react-router-dom';
import { AppShell } from './AppShell.jsx';

export function AppLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
