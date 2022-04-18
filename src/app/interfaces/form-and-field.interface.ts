import {FormGroup, ValidatorFn} from '@angular/forms';

export interface Tab {
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
  data: FormConstructorContent | BoxConstructorContent;
}
export enum ComponentInfoType {
  box = 'box',
  form = 'form'
}
export enum FormTypes {
  BASE='base',
  USER = 'user',
  ISSUE = 'issue',
}
export interface BoxConstructorContent {
  attributes: DOMAttribute[];
  data: AttributeValue[] | {};
}
export interface DOMAttribute {
  name_attribute: string;
  type_attribute: string;
  read_only: boolean;
  data_test_id: string;
  value_class_front?: string;
  elementStyles?: ElementStyles;
  child_name_attribute?: DOMAttribute[];
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
  type: FormTypes;
  titleId?: string;
  dataTestId: string;
}

export interface SelectorOption {
  entity_id: string;
  title: string;
}
