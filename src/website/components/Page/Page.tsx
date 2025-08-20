import React from 'react';
import { NavButtonState } from '../BottomNavigation/BottomNavigation';

export type PageProps = React.PropsWithChildren<{
  initNavigationButtons?: (left?: NavButtonState, right?: NavButtonState) => void;
}>;

export default function Page({ children }: PageProps) {
  return <>{children}</>;
}
