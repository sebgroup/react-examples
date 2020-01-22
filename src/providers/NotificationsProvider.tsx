import React, { createContext, useState, useContext } from "react";

export interface Notification {
  message: string;
  description: string;
  theme?: "danger" | "warning";
}

export interface NotificationsContextInterface {
  addNotification: (notification: Notification) => void;
}

export type UseNotificationsContext = [
  NotificationsContextInterface["addNotification"]
];

export const NotificationsContext: React.Context<NotificationsContextInterface> = createContext<
  NotificationsContextInterface
>({ addNotification: () => {} });

const NotificationsProvider: React.FC = props => {
  const [notifications, setNotification] = useState<Notification[]>([]);
  const addNotification: NotificationsContextInterface["addNotification"] = (
    notification: Notification
  ) => {
    setNotification(state => [...state, notification]);
  };

  const removeNotificationAtIndex = (index: number) => {
    setNotification([
      ...notifications.slice(0, index),
      ...notifications.slice(index + 1)
    ]);
  };

  return (
    <NotificationsContext.Provider
      value={{
        addNotification
      }}
    >
      <div
        aria-live="polite"
        aria-atomic="true"
        className="notifications-container"
      >
        {notifications.map((notification: Notification, index: number) => {
          return (
            <div
              key={index}
              className={`toast alert alert-${
                notification.theme ? notification.theme : "warning"
              } alert-dismissible fade show`}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <strong className="text-break">{notification.message}</strong>
              <div className="text-muted">{notification.description}</div>
              <button
                onClick={() => removeNotificationAtIndex(index)}
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          );
        })}
      </div>
      {props.children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext: () => UseNotificationsContext = () => {
  const notificationContext = useContext(NotificationsContext);
  return [notificationContext.addNotification];
};

export default NotificationsProvider;
