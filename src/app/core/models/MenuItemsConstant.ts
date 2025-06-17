export interface MenuItem {
  text: string;
  icon: string;
  route: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { text: 'Cages', icon: 'box', route: '/cages' },
  { text: 'Fish Stocking', icon: 'add', route: '/fish-stocking' },
  { text: 'Mortalities', icon: 'minus', route: '/mortalities' },
  { text: 'Fish Transfers', icon: 'chevrondoubleright', route: '/fish-transfers' },
  { text: 'Daily Stock Balance', icon: 'eyeopen', route: '/daily-stock-balance' },
  { text: 'Pivot Analysis', icon: 'chart', route: '/pivot-analysis' },
];
