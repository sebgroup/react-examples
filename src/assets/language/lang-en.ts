import { AppLanguage } from "../../models/language";

const english: AppLanguage = {
  appName: "React starter",
  routeNames: {
    home: "Home",
    components: "Components",
    wizard: "Wizard",
    about: "About"
  },
  components: {
    home: {
      cards: {
        loader: {
          title: "Loader",
          subtitle: "Global application loader",
          description:
            "The app includes a global fullscreen opaque overlay application loader which will block the user from accessing the UI beneath it. You can use this loader when the application state is transitioning, for exapmle, during authentication. Test it using the button below.",
          buttonTexts: ["Test global loader"],
          footerMessage: "Adjust how many seconds the global loader should spin for:",
          seconds: "Seconds"
        },
        notifications: {
          title: "Notifications",
          subtitle: "Global application notifications",
          description:
            "The app includes a global notification system. An react component can trigger a notification from enywhere withing the tree.",
          buttonTexts: ["Test notification"],
          footerMessage: "Adjust the notification message and type:",
          message: "Notification message:",
          messageText: "Example body text.",
          type: "Notification type:",
          typeError: "Error",
          typeWarning: "Warning"
        },
        pages: {
          title: "Error Pages",
          subtitle: "Global error pages",
          description: "The app includes global error pages to handle 404 and other errors.",
          note:
            "The below link will navigate you to a fake url which will trigger the router to redirect you to the 404 page",
          buttonTexts: ["Test 404"]
        }
      }
    }
  }
};

export default english;
