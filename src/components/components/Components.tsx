import React, { Suspense, useState, useEffect } from "react";
import Header from "../Header";
import { useLanguageContext } from "../../providers/LanguageProvider";
import { DynamicFormItem, DynamicFormType, DynamicFormSection, DynamicFormOption } from "../../models/dynamic-form";
import { example } from "../../assets/mocks/dynamic-form-example";
import { RadioGroup } from "@sebgroup/react-components/dist/RadioGroup";
import { RadioListModel } from "@sebgroup/react-components/dist/RadioGroup/RadioGroup";
import { CheckBox } from "@sebgroup/react-components/dist/CheckBox";
import { CheckBoxProps } from "@sebgroup/react-components/dist/CheckBox/CheckBox";
import { TextBox } from "@sebgroup/react-components/dist/TextBox";
import { TextArea } from "@sebgroup/react-components/dist/TextArea";
import { Dropdown } from "@sebgroup/react-components/dist/Dropdown";
import { Datepicker } from "@sebgroup/react-components/dist/Datepicker";
import { DropdownItem, DropdownChangeEvent } from "@sebgroup/react-components/dist/Dropdown/Dropdown";

const Components: React.FC = () => {
  const [{ routeNames }] = useLanguageContext();

  const ComponentsHeader = () => <Header d3={routeNames.components} theme="secondary" />;

  const ComponentsLoading = () => (
    <>
      <ComponentsHeader />

      <div className="container-fluid">
        <div className="skeleton-loader"></div>
      </div>
    </>
  );

  const sections: DynamicFormSection[] = example;

  // const getState = (s: any) => {
  //   console.log("NEW STATE: ", s);
  // };

  const [formState, setFormState] = useDynamicForm(sections);

  // RENDER =+=+=+=+=+=+=+=+=+=+=+=
  return (
    <Suspense fallback={<ComponentsLoading />}>
      <ComponentsHeader />

      <div className="container-fluid">
        <DynamicFormComponent sections={sections} state={formState} onChange={setFormState} />
      </div>
    </Suspense>
  );
};

type DynamicFormDate = { day: number; month: number; year: number };

type InputChange = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | DropdownChangeEvent | Date;

type DynamicFormInternalStateValue = string | DynamicFormOption | DynamicFormOption[] | DynamicFormDate | null;

interface DynamicFormInternalStateSection {
  [k: string]: DynamicFormInternalStateValue;
}
interface DynamicFormInternalState {
  [k: string]: DynamicFormInternalStateSection;
}

function useDynamicForm(
  sections: DynamicFormSection[]
): [DynamicFormInternalState, (section: DynamicFormSection) => (item: DynamicFormItem) => (e: InputChange) => void] {
  const initialState: DynamicFormInternalState = {};
  sections?.map((section) => {
    initialState[section?.key] = {};
    section.items?.map((item) => {
      initialState[section?.key][item?.key] = item?.value;
    });
  });
  const [state, setState] = useState<DynamicFormInternalState>(initialState);

  const onChangeForItem = (section: DynamicFormSection) => (item: DynamicFormItem) => (e: InputChange) => {
    // console.log(section, item, (e as any).target.value);

    const sectionState = state && state.hasOwnProperty(section.key) ? state[section.key] : {};
    const controlType: DynamicFormType = item?.controlType || "Text";
    let newValue: DynamicFormInternalStateValue = null;

    switch (controlType) {
      case "Text":
      case "TextArea":
        newValue = (e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>).target.value;
        break;
      case "Checkbox": {
        let newOptions: DynamicFormOption[] = [...((sectionState[item.key] as DynamicFormOption[]) || [])];
        // console.log("target: ", (e as any).target);
        // console.log("newOptions: ", newOptions);
        const targetId: string = (e as React.ChangeEvent<HTMLInputElement>).target.id;
        if (newOptions.find((o) => o.key === targetId)) {
          newOptions = [...newOptions.filter((o) => o.key !== targetId)];
          // console.log("removing  ...");
          // console.log(newOptions);
        } else {
          const targetOption: DynamicFormOption | undefined = item.options?.find((o) => o.key === targetId);
          if (targetOption) {
            newOptions.push(targetOption);
            // console.log("adding  ...");
            // console.log(newOptions);
          }
        }
        newValue = newOptions;
        break;
      }
      case "Radio": {
        const targetValue: string = (e as React.ChangeEvent<HTMLInputElement>).target.value;
        const targetOption: DynamicFormOption | undefined = item.options?.find((o) => o.value === targetValue);
        if (targetOption) {
          newValue = targetOption;
        }
        break;
      }
      case "Datepicker": {
        const targetDate: Date = e as Date;
        if (targetDate) {
          newValue = {
            year: targetDate.getFullYear(),
            month: targetDate.getMonth() + 1,
            day: targetDate.getDate()
          } as DynamicFormDate;
        }
        break;
      }

      default: {
        newValue = e as DynamicFormItem | DynamicFormItem[];
        break;
      }
    }

    // console.log("newValue: ", newValue);

    setState({
      ...state,
      [section.key]: {
        ...sectionState,
        [item.key]: newValue
      }
    });
  };

  return [state, onChangeForItem];
}

const DynamicFormComponent: React.FC<{
  sections: DynamicFormSection[];
  state: DynamicFormInternalState;
  onChange: (section: DynamicFormSection) => (item: DynamicFormItem) => (e: InputChange) => void;
}> = (props) => {
  return (
    <>
      {props.sections?.map((section, i) => (
        <React.Fragment key={i}>
          <h4>{section.title}</h4>
          <DynamicFormSectionComponent
            key={i}
            section={section}
            onChange={props.onChange(section)}
            state={props.state && props.state.hasOwnProperty(section.key) ? props.state[section.key] : null}
          />
        </React.Fragment>
      ))}
    </>
  );
};

const DynamicFormSectionComponent: React.FC<{
  section: DynamicFormSection;
  onChange: (item: DynamicFormItem) => (e: InputChange) => void;
  state: DynamicFormInternalStateSection | null;
}> = (props) => {
  return (
    <div className="form-group">
      {props.section?.items?.map((item, i) => (
        <DynamicFormItemComponent
          key={i}
          item={item}
          onChange={props.onChange(item)}
          state={props.state && props.state.hasOwnProperty(item.key) ? props.state[item.key] : null}
        />
      ))}
    </div>
  );
};

const DynamicFormItemComponent: React.FC<{
  item: DynamicFormItem;
  onChange: (e: InputChange) => void;
  state: DynamicFormInternalStateValue | null;
}> = (props) => {
  const controlType: DynamicFormType = props.item?.controlType || "Text";

  switch (controlType) {
    case "TextArea":
      return (
        <>
          <TextArea
            label={props.item?.label || ""}
            value={(props.state as string) || ""}
            name={props.item?.key || ""}
            onChange={props.onChange}
          />
        </>
      );
    case "Text":
      return (
        <>
          <TextBox
            label={props.item?.label || ""}
            value={(props.state as string) || ""}
            name={props.item?.key || ""}
            onChange={props.onChange}
          />
        </>
      );

    case "Radio": {
      const list: RadioListModel[] =
        props.item?.options?.map((option) => {
          return { label: option.label || "", value: option.value || "", disabled: !!option.disabled };
        }) || [];
      return (
        <>
          <RadioGroup
            name={props.item?.key || ""}
            label={props.item?.label || ""}
            value={(props.state as DynamicFormOption)?.value || ""}
            list={list}
            onChange={props.onChange}
          />
        </>
      );
    }

    case "Dropdown": {
      const list: DropdownItem[] =
        props.item?.options?.map((option) => {
          return { label: option.label || "", value: option.value || "", disabled: !!option.disabled };
        }) || [];

      return (
        <>
          <Dropdown
            name={props.item?.key || ""}
            label={props.item?.label || ""}
            multi={props.item?.multi}
            selectedValue={props.state as DropdownItem | DropdownItem[]}
            list={list}
            onChange={props.onChange}
          />
        </>
      );
    }

    case "Checkbox": {
      const list: CheckBoxProps[] =
        (props.item?.options as DynamicFormOption[])?.map((option: DynamicFormOption, i: number) => {
          const checked: boolean = !!(props.state as DynamicFormOption[])?.find((o) => option.key === o.key)?.value;
          return {
            label: option.label || "",
            checked,
            id: option.key,
            name: props.item?.key || "",
            onChange: props.onChange,
            disabled: !!option.disabled
          };
        }) || [];
      return (
        <>
          <label>{props.item?.label}</label>
          {list.map((item, i) => (
            <CheckBox key={i} {...item} />
          ))}
        </>
      );
    }

    case "Datepicker": {
      const { year = 0, month = 0, day = 0 } = props.state as DynamicFormDate;
      const value: Date = new Date();
      value.setDate(day);
      value.setFullYear(year);
      value.setMonth(month - 1);
      return (
        <>
          <Datepicker
            label={props.item?.label || ""}
            value={value}
            name={props.item?.key || ""}
            onChange={props.onChange}
          />
        </>
      );
    }

    default:
      return (
        <div>
          <label>{props.item?.label}</label>
          {" ---- "}
        </div>
      );
  }
};

export default Components;
