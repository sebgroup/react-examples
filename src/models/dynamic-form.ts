export interface DynamicFormItem {
  key: string;
  value?: any;
  label?: string | null;
  required?: boolean;
  multi?: boolean;
  min?: any;
  max?: any;
  order?: number;
  placeholder?: string | null;
  options?: Array<DynamicFormOption> | null;
  rulerKey?: string | null;
  condition?: any;
  controlType?: DynamicFormType;
}

export type DynamicFormType =
  | "Hidden"
  | "Text"
  | "TextArea"
  | "Checkbox"
  | "Dropdown"
  | "Datepicker"
  | "Radio"
  | "Option"
  | "ErrorLabel";

export interface DynamicFormSection {
  title?: string | null;
  key: string;
  order?: number;
  multi?: boolean;
  items?: Array<DynamicFormItem> | null;
}

export interface DynamicFormOption {
  value?: any;
  label?: string | null;
  key: string;
  disabled?: boolean | null;
}
