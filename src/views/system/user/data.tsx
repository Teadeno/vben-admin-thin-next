import { FormSchema } from '/@/components/Form';
import _ from 'lodash';

export function getTableColumns() {
  return [
    { type: 'checkbox', width: 50, fixed: 'left' },
    { type: 'seq', title: '序号', width: 60 },
    { field: 'username', sortable: true, title: '用户名', width: 200, fixed: 'left' },
    { field: 'realname', sortable: true, title: '真实姓名', width: 200 },

    { field: 'rolename', sortable: true, title: '角色', width: 200 },
    { field: 'rolename', sortable: true, title: '角色', width: 200 },
    { field: 'rolename', sortable: true, title: '角色', width: 200 },
    { field: 'rolename', sortable: true, title: '角色', width: 200 },
    { field: 'rolename', sortable: true, title: '角色', width: 200 },
    { field: 'rolename', sortable: true, title: '角色', width: 200 },
    { field: 'rolename', sortable: true, title: '角色', width: 200 },
    { field: 'rolename', sortable: true, title: '角色', width: 200 },
    { field: 'rolename', sortable: true, title: '角色', width: 200 },
    { field: 'rolename', sortable: true, title: '角色', width: 200 },
    { field: 'email', sortable: true, title: '邮箱', width: 200 },
    { field: 'avatar', sortable: true, title: '头像', width: 200 },
    { field: 'desc', sortable: true, title: '介绍', width: 200 },
    { field: 'remark', sortable: true, title: '备注', width: 200 },
    { title: '操作', fixed: 'right', width: 200, slots: { default: 'operate' } },
  ];
}

export function getTableFormConfigItems() {
  return [
    {
      field: 'username',
      title: '用戶名',
      itemRender: { name: 'AInput' },
    },
  ];
}

export function getTableConfig() {
  return {
    showFooter: true,
    footerMethod: function ({ columns, data }) {
      return [
        columns.map((column) => {
          if (['username'].includes(column.property)) {
            return _.map(data, 'id');
          }
          return '';
        }),
      ];
    },
    formConfig: {
      items: getTableFormConfigItems(),
    },
    columns: getTableColumns(),
  };
}

export function getAddFrom(): FormSchema[] {
  return [
    {
      field: 'username',
      component: 'Input',
      label: '用户名',
      colProps: {
        span: 24,
      },
      required: true,
    },
    {
      field: 'password',
      component: 'InputPassword',
      label: '密码',
      colProps: {
        span: 24,
      },
      required: true,
    },

    {
      field: 'realname',
      component: 'Input',
      label: '真实姓名',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'email',
      component: 'Input',
      label: '邮箱',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'remark',
      component: 'Input',
      label: '备注',
      colProps: {
        span: 24,
      },
    },
  ];
}

export function getEditFrom(): FormSchema[] {
  return [
    {
      field: 'id',
      component: 'Input',
      label: 'ID',
      show: false,
    },
    {
      field: 'username',
      component: 'Input',
      label: '用户名',
      colProps: {
        span: 24,
      },
      required: true,
    },
    {
      field: 'realname',
      component: 'Input',
      label: '真实姓名',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'email',
      component: 'Input',
      label: '邮箱',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'remark',
      component: 'Input',
      label: '备注',
      colProps: {
        span: 24,
      },
    },
  ];
}
