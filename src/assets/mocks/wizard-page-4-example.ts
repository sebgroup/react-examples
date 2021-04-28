import {
  DynamicFormItem,
  DynamicFormOption,
  DynamicFormSection,
  DynamicFormType
} from "@sebgroup/react-components/hooks/useDynamicForm";
import { capitalize } from "@sebgroup/frontend-tools/capitalize";

const getMonthsForLocale = (locale: string) => {
  var format = new Intl.DateTimeFormat(locale, { month: "long" });
  var months = [];
  for (var month = 0; month < 12; month++) {
    var testDate = new Date(Date.UTC(2000, month, 1, 0, 0, 0));
    months.push(format.format(testDate));
  }
  return months;
};

const makeOptions = (locale: string): DynamicFormOption[] => {
  const months: string[] = ["disabled", ...getMonthsForLocale(locale)];

  return months.map((month: string, i: number) => {
    const option: DynamicFormOption = {
      key: month,
      value: month,
      label: capitalize(month),
      description: `${month} - description`,
      additionalProps: {
        disabled: month === "disabled",
        wrapperProps: {
          className: "col-12 col-lg-6"
        }
      }
    };

    return option;
  });
};

const makeSection = (locale: string): DynamicFormSection => {
  const types: DynamicFormType[] = ["Radio", "Dropdown", "Option"];

  const items: DynamicFormItem[] = types.map((controlType: DynamicFormType, i: number) => {
    return {
      controlType,
      key: `${controlType}-${i}-item`,
      label: `${controlType} label example`,
      description: `${controlType} description example`,
      placeholder: "Please select month",
      wrappingElement: "div",
      additionalProps: {
        className: "card p-3 mb-3"
      },
      formElementAdditionalProps:
        controlType === "Radio"
          ? {
              className: "d-flex flex-wrap px-3"
            }
          : {},
      options: [...makeOptions(locale)]
    };
  });

  return {
    key: `section`,
    items: [...items],
    wrappingElement: "section",
    additionalProps: {
      className: "card-columns",
      style: { columnCount: 2 }
    }
  };
};

export const example = (locale: string): DynamicFormSection[] => [makeSection(locale)];
