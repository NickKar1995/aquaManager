export interface MenuItem {
  text: string;
  icon: string;
  route: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { text: 'Cages', icon: 'home', route: '/cages' },
  { text: 'Fish Stocking', icon: 'box', route: '/fish-stocking' },
  { text: 'Mortalities', icon: 'preferences', route: '/mortalities' },
  { text: 'Fish Transfers', icon: 'home', route: '/fish-transfers' },
  { text: 'Daily Stock Balance', icon: 'home', route: '/daily-stock-balance' },
  { text: 'Pivot Analysis', icon: 'box', route: '/pivot-analysis' },
];
