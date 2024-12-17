import React from 'react';
import { Navbar } from './components/navigation/Navbar';
import { TokenList } from './components/tokens/TokenList';
import { RightSidebar } from './components/sidebar/RightSidebar';
import { I18nProvider } from './i18n/I18nProvider';
import { ToastContainer } from './components/ui/ToastContainer';

export function App() {
  return (
    <I18nProvider>
      <div className="min-h-screen h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 min-w-0 flex">
            <TokenList />
          </div>
          <div className="w-80 lg:w-96 flex-shrink-0 hidden md:block">
            <RightSidebar />
          </div>
        </div>
        <ToastContainer />
      </div>
    </I18nProvider>
  );
}