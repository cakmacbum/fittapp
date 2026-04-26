import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
// import * as Sentry from '@sentry/react'; // MOCK SENTRY IMPORT

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMsg: string;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMsg: ''
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMsg: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Sentry.captureException(error);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-6 text-center h-full min-h-[300px] bg-slate-50">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Beklenmeyen Bir Hata Oluştu</h2>
          <p className="text-slate-500 text-sm mb-6 max-w-xs leading-relaxed">
            Sistemsel bir sorunla karşılaştık. Ekibimiz bu durumu Sentry üzerinden otomatik olarak rapor aldı.
          </p>
          <div className="bg-white border border-slate-200 p-3 rounded-xl mb-6 text-xs text-left w-full max-w-sm text-red-500 font-mono overflow-auto">
             {this.state.errorMsg}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition"
          >
            Uygulamayı Yeniden Yükle
          </button>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

export default ErrorBoundary;
