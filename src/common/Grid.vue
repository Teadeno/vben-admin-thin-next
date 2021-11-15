<template>
  <vxe-grid ref="table" v-bind="gridOptions">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </vxe-grid>
</template>

<script lang="ts" setup>
  import { reactive, ref, toRaw } from 'vue';
  import { VxeGridInstance, VxeTablePropTypes } from 'vxe-table';
  import _ from 'lodash';

  const props = defineProps({
    tableConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    api: {
      type: Function,
      default() {
        return 'Default function';
      },
    },
  });
  const table = ref({} as VxeGridInstance);

  const config = _.defaultsDeep(
    {
      height: 'auto',
      stripe: true,
      showOverflow: 'tooltip',
      showHeaderOverflow: 'tooltip',
      showFooterOverflow: 'tooltip',
      exportConfig: {
        filename: document.title,
        mode: 'current',
        types: ['xlsx', 'csv', 'html', 'xml', 'txt'],
        modes: ['current', 'selected', 'all'],
        beforeExportMethod: function (options) {
          if (options.options.mode == 'all') {
            //全量导出 不显示表尾
            options.options.isFooter = false;
          }
          return options;
        },
      },
      // printConfig: {},
      pagerConfig: {
        pageSize: 50,
      },
      toolbarConfig: {
        export: {
          icon: 'fa  fa-download',
        },
        custom: {
          icon: 'fa fa-cog',
        },
        refresh: {
          icon: 'fa fa-refresh',
          iconLoading: 'fa  fa-refresh fa-spin',
        },
        slots: {
          buttons: 'toolbar_buttons',
        },
      },
      columnConfig: {
        resizable: true,
      },
      proxyConfig: {
        form: true,
        ajax: {
          // 接收 Promise
          query: ({ page, sort, sorts, filters, form }) => {
            return new Promise(async (resolve) => {
              resolve(await props.api({ page, sort, sorts, filters, form }));
            });
          },
          queryAll: async ({ page, sort, sorts, filters, form }) => {
            page = {
              total: 30000,
              currentPage: 1,
              pageSize: 30000,
            };
            let res = await props.api({ page, sort, sorts, filters, form });
            return res.rows;
          },
        },
      },
    },
    props.tableConfig,
  );
  config.formConfig.items = config.formConfig.items.concat([
    {
      itemRender: {
        name: 'AButtons',
        children: [
          { content: '查询', props: { type: 'primary', htmlType: 'submit' } },
          {
            content: '重置',
            props: { htmlType: 'reset' },
          },
        ],
      },
    },
  ]);
  const gridOptions = reactive(config);

  defineExpose({
    table,
  });
</script>

<style scoped></style>
