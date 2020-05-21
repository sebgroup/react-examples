import { DynamicFormSection } from "../../models/dynamic-form";

export const example: DynamicFormSection[] = [
  {
    title: "Conditional render section",
    key: "section-1",
    order: 10,
    multi: false,
    items: [
      {
        key: "show-second",
        label: "Should I display the second form item?",
        required: true,
        multi: false,
        order: 10,
        value: {
          value: "Yes",
          label: "Yes please",
          key: "yes"
        },
        options: [
          {
            value: "Yes",
            label: "Yes please",
            key: "yes"
          },
          {
            value: "No",
            label: "No thanks",
            key: "no"
          }
        ],
        controlType: "Radio"
      },
      {
        key: "second-item",
        label: "Hi I'm the second item! (try to type hello)",
        required: false,
        multi: false,
        max: 5,
        order: 20,
        placeholder: "I should only be displayed if you select Yes above!",
        rulerKey: "show-second",
        condition: {
          value: "Yes"
        },
        controlType: "Text"
      },
      {
        key: "third-item",
        label: "Hi I'm the third item!",
        required: false,
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
    title: "Multi section (this section can be multiplied)",
    key: "section-2",
    order: 20,
    multi: true,
    items: [
      {
        key: "multi-text",
        label: "Multi text (this text field can be multiplied)",
        required: false,
        multi: true,
        order: 10,
        controlType: "Text"
      },
      {
        key: "non-multi-text",
        label: "Normal text (this can't be multiplied)",
        required: false,
        multi: false,
        order: 20,
        controlType: "Text"
      }
    ]
  },
  {
    title: "Regular section (normal section which can not be multiplied)",
    key: "section-3",
    order: 30,
    multi: false,
    items: [
      {
        key: "text-area",
        label: "Text area",
        required: false,
        multi: false,
        max: 100,
        order: 10,
        placeholder: "Hi I'm a placeholder",
        controlType: "TextArea"
      },
      {
        key: "checkboxes",
        label: "Checkboxes",
        required: false,
        multi: false,
        order: 20,
        value: [
          {
            value: "value 1",
            label: "Label 1",
            key: "key-1"
          },
          {
            value: "value 2",
            label: "Label 2",
            key: "key-2"
          }
        ],
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
        controlType: "Checkbox"
      },
      {
        key: "radio-group",
        label: "Radio group",
        required: false,
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
          },
          {
            value: "value 4",
            label: "Disabled example",
            key: "key-4",
            disabled: true
          }
        ],
        controlType: "Radio"
      },
      {
        key: "dropdown-normal",
        label: "Single select dropdown",
        required: false,
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
        key: "dropdown-multi",
        label: "Multi select dropdown",
        required: false,
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
        required: false,
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
        value: {
          year: 2020,
          month: 1,
          day: 1
        },
        label: "Date picker",
        required: false,
        multi: false,
        min: {
          year: 2019,
          month: 12,
          day: 25
        },
        max: {
          year: 2021,
          month: 1,
          day: 1
        },
        order: 60,
        controlType: "Datepicker"
      }
    ]
  }
];
