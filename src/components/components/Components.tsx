import React, { Suspense, lazy, InputHTMLAttributes } from "react";
import { useCommonMedia, DeviceType } from "../../utils/customHooks";
import Header from "../Header";
import { useLanguageContext } from "../../providers/LanguageProvider";
import { DynamicFormItem, DynamicFormType, DynamicFormSection, DynamicFormOption } from "../../models/dynamic-form";
import { example } from "../../assets/mocks/dynamic-form-example";
import { RadioGroup } from "@sebgroup/react-components/dist/RadioGroup";
import { RadioListModel } from "@sebgroup/react-components/dist/RadioGroup/RadioGroup";
import { CheckBox } from "@sebgroup/react-components/dist/CheckBox";
import { CheckBoxProps } from "@sebgroup/react-components/dist/CheckBox/CheckBox";

const Components: React.FC = () => {
  // DEVICE SIZE ===========================
  // context
  const deviceSize: DeviceType = useCommonMedia();
  const isLargeScreenSize: boolean = deviceSize === "wide-desktop";

  // LANGUAGE ==============================
  // context
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

  const mock = example;

  // RENDER =+=+=+=+=+=+=+=+=+=+=+=
  return (
    <Suspense fallback={<ComponentsLoading />}>
      <ComponentsHeader />

      <div className="container-fluid">
        <DynamicFormComponent sections={mock} />
      </div>
    </Suspense>
  );
};

type InputElement = React.InputHTMLAttributes<HTMLInputElement>;
type InputChange = React.ChangeEvent<HTMLInputElement>;

const DynamicFormComponent: React.FC<{ sections: DynamicFormSection[] }> = (props) => {
  const onChangeForItem = (item: DynamicFormItem) => (e: InputChange) => {
    console.log(item, e.target.value);
  };

  return (
    <>
      {props.sections?.map((section, i) => (
        <DynamicFormSectionComponent key={i} section={section} onChange={onChangeForItem} />
      ))}
    </>
  );
};

const DynamicFormSectionComponent: React.FC<{
  section: DynamicFormSection;
  onChange: (item: DynamicFormItem) => (e: InputChange) => void;
}> = (props) => {
  return (
    <div className="form-group">
      {props.section?.items?.map((item, i) => (
        <DynamicFormItemComponent key={i} item={item} onChange={props.onChange(item)} />
      ))}
    </div>
  );
};

const DynamicFormItemComponent: React.FC<{ item: DynamicFormItem; onChange: (e: InputChange) => void }> = (props) => {
  const controlType: DynamicFormType = props.item?.controlType || "Text";

  switch (controlType) {
    case "TextArea":
    case "Text":
      return (
        <>
          <label>{props.item?.label}</label>
          <input className="form-control" type={controlType.toLowerCase()} onChange={props.onChange} />
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
            value={props.item?.value?.value}
            list={list}
            onChange={props.onChange}
          />
        </>
      );
    }

    case "Checkbox": {
      const list: CheckBoxProps[] =
        props.item?.options?.map((option, i) => {
          return {
            label: option.label || "",
            checked: (props.item?.value as DynamicFormOption[])?.filter((x) => x.value === option.value).length > 0,
            name: props.item?.key || "",
            onChange: props.onChange,
            disabled: !!option.disabled
          };
        }) || [];
      return (
        <>
          {list.map((item, i) => (
            <CheckBox key={i} {...item} />
          ))}
        </>
      );
    }

    default:
      console.warn("No component for control type ", controlType);
      return null;
  }
};

const getInputTypeFromControlType = (controlType: DynamicFormType | undefined): InputElement["type"] => {
  if (controlType) {
    switch (controlType) {
      case "TextArea":
      case "Checkbox":
      case "Radio":
        return controlType.toLowerCase();

      default:
        return "text";
    }
  } else {
    return "text";
  }
};

export default Components;
