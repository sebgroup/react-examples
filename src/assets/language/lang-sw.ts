import { AppLanguage } from "../../models/language";

const swedish: AppLanguage = {
  appName: "React självstart",
  routeNames: {
    home: "Hem",
    components: "Komponenter",
    wizard: "Trollkarl",
    about: "Handla om"
  },
  components: {
    home: {
      cards: {
        loader: {
          title: "Lastare",
          subtitle: "Global applikationslastare",
          description:
            "Appen innehåller en global fullskärms ogenomskinlig overlay-applikationslastare som kommer att hindra användaren från att komma åt användargränssnittet under den. Du kan använda den här laddaren när applikationstillståndet övergår, för exapmle, under autentisering. Testa det med knappen nedan.",
          buttonTexts: ["Testa global lastare"],
          footerMessage: "Justera hur många sekunder den globala lastaren ska snurra på:",
          seconds: "Sekunder"
        },
        notifications: {
          title: "Aviseringar",
          subtitle: "Aviseringar om global applikation",
          description:
            "Appen innehåller ett globalt anmälningssystem. En reaktionskomponent kan utlösa ett meddelande från vilken plats som helst i trädet.",
          buttonTexts: ["Testa aviseringar"],
          footerMessage: "Justera meddelandet och typ:",
          message: "Meddelande:",
          messageText: "Exempel på text.",
          type: "Meddelandetyp:",
          typeError: "Fel",
          typeWarning: "Varning"
        },
        pages: {
          title: "Fel sidor",
          subtitle: "Globala felsidor",
          description: "Appen innehåller globala felsidor för att hantera 404 och andra fel.",
          note: "Länken nedan navigerar dig till en falsk url som utlöser routern att omdirigera dig till 404-sidan",
          buttonTexts: ["Test 404"]
        }
      }
    }
  }
};

export default swedish;
