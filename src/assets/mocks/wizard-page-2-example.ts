import { DynamicFormSection } from "@sebgroup/react-components/hooks/useDynamicForm";

export const example: DynamicFormSection[] = [
  {
    title: "I was in the backend",
    key: "section-2",
    order: 10,
    items: [
      {
        key: "label-only",
        label: "Here's some examples of multi and single select form elements for selecting different options.",
        description:
          "(I'm an example of a label only element, you can put me anywhere you like in the form as general info.)",
        order: 0,
        controlType: "LabelOnly"
      },
      {
        key: "checkbox1",
        label: "Prechecked checkbox",
        order: 10,
        value: true,
        controlType: "Checkbox"
      },
      {
        key: "checkbox2",
        label: "Unchecked checkbox",
        order: 20,
        controlType: "Checkbox"
      },
      {
        key: "checkbox3",
        label: "Disabled checkbox",
        order: 20,
        controlType: "Checkbox",
        additionalProps: {
          disabled: true
        }
      }
    ]
  }
];
