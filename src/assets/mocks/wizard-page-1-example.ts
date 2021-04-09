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
            key: "yes",
            additionalProps: {
              wrapperProps: {
                className: "d-inline-block"
              }
            }
          },
          {
            value: "no",
            label: "No thanks",
            key: "no",
            additionalProps: {
              wrapperProps: {
                className: "d-inline-block"
              }
            }
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
  }
];
