import { DynamicFormSection } from "@sebgroup/react-components/hooks/useDynamicForm";

export const example: DynamicFormSection[] = [
  {
    title: "I was in the backend",
    key: "section-2",
    order: 10,
    items: [
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
        key: "radiogroup",
        label: "Radio group",
        multi: false,
        order: 25,
        options: [
          {
            value: "value 1",
            label: "Label 1",
            key: "key-1"
          },
          {
            value: "value 2",
            label: "Label 2",
            key: "key-2"
          },
          {
            value: "value 3",
            label: "Label 3",
            key: "key-3"
          }
        ],
        controlType: "Radio"
      },
      {
        key: "dropdown-normal",
        label: "Single select dropdown",
        multi: false,
        order: 30,
        options: [
          {
            value: "value 1",
            label: "Label 1",
            key: "key-1"
          },
          {
            value: "value 2",
            label: "Label 2",
            key: "key-2"
          },
          {
            value: "value 3",
            label: "Label 3",
            key: "key-3"
          }
        ],
        controlType: "Dropdown"
      },
      {
        key: "dropdown-multi",
        label: "Multi select dropdown",
        multi: true,
        value: [],
        order: 40,
        options: [
          {
            value: "value 1",
            label: "Label 1",
            key: "key-1"
          },
          {
            value: "value 2",
            label: "Label 2",
            key: "key-2"
          },
          {
            value: "value 3",
            label: "Label 3",
            key: "key-3"
          },
          {
            value: "value 4",
            label: "Disabled example",
            key: "key-4",
            disabled: true
          }
        ],
        controlType: "Dropdown"
      },
      {
        key: "options",
        label: "Options",
        multi: false,
        order: 50,
        options: [
          {
            value: "value 1",
            label: "Label 1",
            key: "key-1"
          },
          {
            value: "value 2",
            label: "Label 2",
            key: "key-2"
          },
          {
            value: "value 3",
            label: "Label 3",
            key: "key-3"
          },
          {
            value: "value 4",
            label: "Disabled example",
            key: "key-4",
            disabled: true
          }
        ],
        controlType: "Option"
      }
    ]
  }
];
