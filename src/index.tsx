import AppProvider from 'providers/AppProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import SettingsPanelProvider from 'providers/SettingsPanelProvider';
import { RouterProvider } from 'react-router-dom';
import { router } from 'Routes';
import ChatWidgetProvider from 'providers/ChatWidgetProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="{process.env['GOOGLE_AUTH_CLIENT_ID']}">
      <AppProvider>
        <SettingsPanelProvider>
          <ChatWidgetProvider>
            <BreakpointsProvider>
              <RouterProvider router={router} />
            </BreakpointsProvider>
          </ChatWidgetProvider>
        </SettingsPanelProvider>
      </AppProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
