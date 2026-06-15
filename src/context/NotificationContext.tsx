import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

type NotificationType = 'success' | 'error';

interface NotificationContextType {
    showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notification, setNotification] = useState<{ message: string, type: NotificationType } | null>(null);

    const showNotification = useCallback((message: string, type: NotificationType) => {
        setNotification({ message, type });
        
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            
            {notification && (
                <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
                    <div className={`px-6 py-4 rounded-lg shadow-xl text-white font-medium flex items-center gap-3 ${
                        notification.type === 'error' ? 'bg-red-600' : 'bg-green-600'
                    }`}>
                        {notification.message}
                    </div>
                </div>
            )}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};