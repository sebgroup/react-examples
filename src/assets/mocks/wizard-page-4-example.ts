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
        disabled: month === "disabled"
      }
    };

    return option;
  });
};

const makeSections = (locale: string): DynamicFormSection[] => {
  const types: DynamicFormType[] = ["Radio", "Dropdown", "Option"];

  const commonExtraProps: { [k: string]: any } = {
    className: "card p-3 mb-3"
  };

  return types.map((controlType: DynamicFormType, i: number) => {
    const item: DynamicFormItem = {
      controlType,
      key: `${controlType}-${i}-item`,
      label: `${controlType} label example`,
      description: `${controlType} description example`,
      placeholder: "Please select month",
      additionalProps:
        controlType === "Radio"
          ? {
              className: "d-flex flex-wrap align-items-between"
            }
          : {},
      options: [...makeOptions(locale)].map((e) => {
        return controlType === "Radio"
          ? {
              ...e,
              additionalProps: {
                ...(e.additionalProps || {}),
                wrapperProps: {
                  style: {
                    width: 250
                  }
                }
              }
            }
          : e;
      })
    };

    return {
      key: `${controlType}-${i}-section`,
      order: i,
      title: `${controlType} section`,
      items: [item],
      wrappingElement: "section",
      additionalProps: { ...commonExtraProps }
    };
  });
};

export const example = (locale: string): DynamicFormSection[] => makeSections(locale);
