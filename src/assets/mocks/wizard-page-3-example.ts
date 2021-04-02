import { DynamicFormSection } from "@sebgroup/react-components/hooks/useDynamicForm";

export const example: DynamicFormSection[] = [
  {
    title: "I was in the backend",
    key: "section-3",
    items: [
      {
        key: "checkbox1",
        label: "I have custom styling",
        placeholder: "Even I have :) ",
        description: "Me too!",
        controlType: "Text"
      }
    ]
  }
];
