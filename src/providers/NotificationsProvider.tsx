import React, { createContext, useState, useContext, PropsWithChildren } from "react";
import { NotificationProps, Notification } from "@sebgroup/react-components/Notification";

export interface Notification {
  message: string;
  description: string;
  theme?: NotificationProps["theme"];
}

export interface NotificationsContextInterface {
  addNotification: (notification: Notification) => void;
}

export type UseNotificationsContext = [NotificationsContextInterface["addNotification"]];

export const NotificationsContext: React.Context<NotificationsContextInterface> = createContext<
  NotificationsContextInterface
>({ addNotification: () => {} });

const NotificationsProvider: React.FC<PropsWithChildren<{ maxNotifications?: number }>> = ({
  maxNotifications = 10,
  children
}) => {
  const [notifications, setNotification] = useState<Notification[]>([]);
  const addNotification: NotificationsContextInterface["addNotification"] = (notification: Notification) => {
    setNotification((state) => [...state, notification]);
  };

  const removeNotificationAtIndex = (index: number) => {
    setNotification([...notifications.slice(0, index), ...notifications.slice(index + 1)]);
  };

  React.useEffect(() => {
    if (notifications.length > maxNotifications) {
      removeNotificationAtIndex(0);
    }
  }, [notifications, maxNotifications]);

  return (
    <NotificationsContext.Provider
      value={{
        addNotification
      }}
    >
      {notifications.map((notification: Notification, index: number) => {
        const ref = React.createRef<HTMLDivElement>();
        return (
          <React.Fragment key={index}>
            <Notification
              id={`notification-${index}`}
              ref={ref}
              persist
              toggle
              theme={notification.theme}
              onDismiss={() => removeNotificationAtIndex(index)}
              onAnimationEnd={() => {
                const multiplyer: number = 10;
                (ref.current as HTMLDivElement).style.animation = `notificationAnimation 200ms ease-in-out`;
                (ref.current as HTMLDivElement).style.bottom = `${index === 0 ? "20px" : (index + 2) * multiplyer}px`;
              }}
            >
              <div className="notification-header">{notification.message}</div>
              <div className="notification-body">{notification.description}</div>
            </Notification>
          </React.Fragment>
        );
      })}
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext: () => UseNotificationsContext = () => {
  const notificationContext = useContext(NotificationsContext);
  return [notificationContext.addNotification];
};

export default NotificationsProvider;
