import * as React from 'react';
import PhotoView from './components/PhotoView'
import Form from './components/Form'
import KpiPanel from './components/KpiWrapper'
import KpiPanelItem from './components/DashboardView'
import * as smart from "./assets/smart-click.png"

function randomNumber () {
 return (Math.random() * (10.00 - 1.00 + 1.00) + 1.00).toFixed(2);
}

export const routes = [
  {
    path: "/",
    main: () => <h2 style={{backgroundColor:"#7EA0B7", marginTop:"0"}}><img role="img" src={smart} alt="logo"/></h2>
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
