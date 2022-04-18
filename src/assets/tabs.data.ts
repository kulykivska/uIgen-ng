import {
  Attribute, AttributeValue,
  ComponentInfoType,
  ElementStyles,
  FormTypes,
  SelectorOption,
  Tab
} from "../app/interfaces/form-and-field.interface";
import {ValidatorFn} from "@angular/forms";

export const tabListData: Tab[] =  [
  {
    tabId: '0',
    tabName: 'Tab#1',
    tabContent: {
      elements: [
        {
          type: ComponentInfoType.form,
          data: {
            formAttribute: {
              type: FormTypes.USER,
              titleId: 'userForm',
              dataTestId: 'userForm'
            },
            fieldAttributes: [
              {
                elementDataTestId: 'firstName',
                id: 'firstName',
                errorDataTestId: 'firstNameError',
                backendAttribute: {
                  name: 'first_name',
                  value_class_front: 'formField',
                  min_length: 3,
                  max_length: 100,
                  type_attribute: 'input',
                  required: true,
                  read_only: false,
                  label: 'First name',
                  placeholder: 'First name',
                  security: false,
                  enabled_if: {
                    name: 'firstName',
                    value: 'John',
                  }
                }
              }
            ],
            data: [{
              name: 'firstName',
              value: 'John'
            }]
          }
        },
        {
          type: ComponentInfoType.box,
          data: {
            attributes: [{
              name_attribute: 'block1',
              type_attribute: 'div',
              read_only: true,
              data_test_id: 'block1',
              child_name_attribute: [{
                name_attribute: 'text_block1',
                type_attribute: 'p',
                read_only: true,
                data_test_id: 'textBlock1',
              }]
            }],
            data: [
              {
                name: 'text_block1',
                value: 'Some test text'
              }
            ]
          }
        }
      ]
    }
  },
  {
    tabId: '1',
    tabName: 'Tab#2',
    tabContent: {
      elements: [
        {
          type: ComponentInfoType.form,
          data: {
            formAttribute: {
              type: FormTypes.USER,
              titleId: 'userForm',
              dataTestId: 'userForm'
            },
            fieldAttributes: [
              {
                elementDataTestId: 'firstName',
                id: 'firstName',
                errorDataTestId: 'firstNameError',
                backendAttribute: {
                  name: 'first_name',
                  value_class_front: 'formField',
                  min_length: 3,
                  max_length: 100,
                  type_attribute: 'input',
                  required: true,
                  read_only: false,
                  label: 'First name',
                  placeholder: 'First name',
                  security: false,
                  enabled_if: {
                    name: 'firstName',
                    value: 'John',
                  }
                }
              }
            ],
            data: [{
              name: 'firstName',
              value: 'John'
            }]
          }
        },
        {
          type: ComponentInfoType.form,
          data: {
            formAttribute: {
              type: FormTypes.USER,
              titleId: 'userForm',
              dataTestId: 'userForm'
            },
            fieldAttributes: [
              {
                elementDataTestId: 'firstName',
                id: 'firstName',
                errorDataTestId: 'firstNameError',
                backendAttribute: {
                  name: 'first_name',
                  value_class_front: 'formField',
                  min_length: 3,
                  max_length: 100,
                  type_attribute: 'input',
                  required: true,
                  read_only: false,
                  label: 'First name',
                  placeholder: 'First name',
                  security: false,
                  enabled_if: {
                    name: 'firstName',
                    value: 'John',
                  }
                }
              }
            ],
            data: [{
              name: 'firstName',
              value: 'John'
            }]
          }
        }
      ]
    }
  },
  {
    tabId: '2',
    tabName: 'Tab#3',
    tabContent: {
      elements: [
        {
          type: ComponentInfoType.box,
          data: {
            attributes: [{
              name_attribute: 'block1',
              type_attribute: 'div',
              read_only: true,
              data_test_id: 'block1',
              child_name_attribute: [{
                name_attribute: 'text_block1',
                type_attribute: 'p',
                read_only: true,
                data_test_id: 'textBlock1',
              }]
            }],
            data: [
              {
                name: 'text_block1',
                value: 'Some test text'
              }
            ]
          }
        },
        {
          type: ComponentInfoType.box,
          data: {
            attributes: [{
              name_attribute: 'block1',
              type_attribute: 'div',
              read_only: true,
              data_test_id: 'block1',
              child_name_attribute: [{
                name_attribute: 'text_block1',
                type_attribute: 'p',
                read_only: true,
                data_test_id: 'textBlock1',
              }]
            }],
            data: [
              {
                name: 'text_block1',
                value: 'Some test text'
              }
            ]
          }
        }
      ]
    }
  }
];
