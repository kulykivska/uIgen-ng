import {FormGroup, ValidatorFn} from '@angular/forms';

export interface Tabs {
  tabId: string;
  tabName: string;
  tabContent: TabContent
}
export interface TabContent {
  elements: TabContentElement[];
  value_class_front?: string;
}
export interface TabContentElement {
  type: ComponentInfoType;
  data: FormConstructorContent | string;
}
export enum ComponentInfoType {
  box = 'box',
  form = 'form'
}
export interface FormConstructorContent {
  formAttribute?: FormAttribute;
  fieldAttributes: FieldAttribute[];
  data: AttributeValue[] | {};
}

export interface AttributeValue {
  name: string;
  value: string;
}

export interface Attribute {
  name: string;
  value_class_front: string;
  min_length: number;
  max_length: number;
  type_attribute: string;
  required: boolean;
  read_only: boolean;
  label?: string;
  view_label?: string;
  placeholder: string;
  security: boolean;
  enabled_if?: AttributeValue;
}

export interface Attributes {
  attributes: Attribute[];
}

export interface ElementStyles {
  containerStyle?: string;
  contentStyle?: string;
  labelStyle?: string;
}

export interface FieldAttribute {
  elementDataTestId: string;
  id: string;
  errorDataTestId: string;
  elementStyles?: ElementStyles;
  options?: SelectorOption[];
  validators?: ValidatorFn[];
  hidden?: boolean;
  multiple?: boolean;
  backendAttribute: Attribute;
}

export interface FormAttribute {
  type: string;
  titleId?: string;
  dataTestId: string;
}

export interface SelectorOption {
  entity_id: string;
  title: string;
}
