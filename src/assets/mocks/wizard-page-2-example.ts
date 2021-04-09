import { DynamicFormSection } from "@sebgroup/react-components/hooks/useDynamicForm";

export const example: DynamicFormSection[] = [
  {
    title: "I was in the backend",
    key: "section-2",
    order: 10,
    items: [
      {
        key: "label-only",
        label: "I'm an example of a label only element, you can put me anywhere you like in the form as general info.",
        description: "And I'm the description.",
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
