import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  Icon,
  // UilChartPie,
  UilCube
  // UilDocumentLayoutRight,
  // UilFilesLandscapesAlt,
  // UilPuzzlePiece
} from '@iconscout/react-unicons';

export interface Route {
  name: string;
  icon?: IconProp | string | string[];
  iconSet?: 'font-awesome' | 'feather' | 'unicons';
  pages?: Route[];
  path?: string;
  pathName?: string;
  flat?: boolean;
  topNavIcon?: string;
  dropdownInside?: boolean;
  active?: boolean;
  new?: boolean;
  hasNew?: boolean;
}

export interface RouteItems {
  label: string;
  horizontalNavLabel?: string;
  icon: Icon;
  labelDisabled?: boolean;
  pages: Route[];
  megaMenu?: boolean;
  active?: boolean;
}

export const routes: RouteItems[] = [
  {
    label: 'Dashboard',
    icon: UilCube,
    pages: [
      {
        name: 'Default',
        path: '/dashboard/roxwealth',
        active: true,
        icon: 'home'
      }
    ]
  },
  {
    label: 'Hospitalmerch',
    icon: UilCube,
    pages: [
      {
        name: 'Product List',
        path: '/hospitalmerch/products',
        active: true,
        icon: 'tag'
      },
      {
        name: 'Add Batteries',
        path: '/hospitalmerch/add-product-batteries',
        active: true,
        icon: 'trello'
      },
      {
        name: 'Add Medical Equipments',
        path: '/hospitalmerch/add-product-equipments',
        active: true,
        icon: 'trello'
      }
    ]
  }
];
export default routes;
