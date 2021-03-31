import { DynamicFormSection } from "@sebgroup/react-components/hooks/useDynamicForm";

export const example: DynamicFormSection[] = [
  {
    title: "Conditional render section",
    key: "section-1",
    order: 10,
    items: [
      {
        key: "show-second",
        label: "Should I display the second form item?",
        multi: false,
        order: 10,
        value: "no",
        options: [
          {
            value: "yes",
            label: "Yes please",
            key: "yes"
          },
          {
            value: "no",
            label: "No thanks",
            key: "no"
          }
        ],
        controlType: "Radio"
      },
      {
        key: "second-item",
        label: "Hi I'm the second item! (try to type hello)",
        multi: false,
        max: 5,
        order: 20,
        placeholder: "I should only be displayed if you select Yes above!",
        rulerKey: "show-second",
        condition: "yes",
        controlType: "Text"
      },
      {
        key: "third-item",
        label: "Hi I'm the third item!",
        multi: false,
        order: 30,
        placeholder: "I should only be displayed if you typed hello above!",
        rulerKey: "second-item",
        condition: "hello",
        controlType: "Text"
      }
    ]
  },
  {
    title: "Regular section (normal section which can not be multiplied)",
    key: "section-3",
    order: 30,
    items: [
      {
        key: "text-area",
        label: "Text area",
        multi: false,
        max: 100,
        order: 10,
        placeholder: "Hi I'm a placeholder",
        controlType: "Textarea"
      },
      {
        key: "checkbox-1",
        label: "Prechecked checkbox",
        order: 20,
        value: true,
        controlType: "Checkbox"
      },
      {
        key: "checkbox2",
        label: "Unchecked checkbox",
        order: 21,
        controlType: "Checkbox"
      },
      {
        key: "radio-group",
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
      },
      {
        key: "datepicker",
        value: new Date(),
        label: "Date picker",
        order: 60,
        controlType: "Datepicker"
      }
    ]
  }
];
