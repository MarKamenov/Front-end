import * as React from 'react';
import PhotoView from './components/PhotoView'
import HomePage from './components/Home'
import Form from './components/Form'
import KpiPanel from './components/KpiWrapper'
import KpiPanelItem from './components/DashboardView'

function randomNumber () {
 return (Math.random() * (10.00 - 1.00 + 1.00) + 1.00).toFixed(2);
}

export const routes = [
  {
    path: "/",
    main: () => <HomePage/>
  },
  {
    path: "/photo",
    main: () => <PhotoView/>
  },
  {
    path: "/user",
    main: () => <Form />
  },
  {
    path: "/dashboard",
    main: () => <KpiPanel>
      <KpiPanelItem content={randomNumber()} title='User impressions' />
      <KpiPanelItem content={randomNumber()} title='Overlays shown' />
      <KpiPanelItem content={randomNumber()} title='Overlays Clicked' />
      <KpiPanelItem content={randomNumber()} currency={true} title='Revenue' />
      </KpiPanel>
  }
];
