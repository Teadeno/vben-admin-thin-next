import type { App } from 'vue';
import VXETable from 'vxe-table';
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx';
import VXETablePluginAntd from 'vxe-table-plugin-antd';
import 'vxe-table-plugin-antd/dist/style.css';

import zhCN from 'vxe-table/es/locale/lang/zh-CN';
import XEUtils from 'xe-utils';
import './index.scss';
// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
  size: 'mini',
  version: 1,
  table: {
    border: 'full',
    align: 'left',
    resizable: true,
    keepSource: true,
    autoResize: true,
    highlightCurrentRow: true,
    highlightHoverRow: true,
    printConfig: {},
    sortConfig: {
      remote: true,
    },
  },
  grid: {
    size: 'mini',
    // autoResize: true,
    showOverflow: 'tooltip',
    showHeaderOverflow: 'tooltip',
    toolbarConfig: {
      refresh: true,
      export: true,
      // print: true,
      zoom: true,
      custom: true,
    },
    pagerConfig: {
      enabled: true,
      // perfect: false
    },
    proxyConfig: {
      props: {
        result: 'rows',
        total: 'total',
      },
      sort: true,
      from: true,
      seq: true,
      enabled: true,
    },
    formConfig: {
      size: 'mini',
    },
    customConfig: {
      storage: true,
    },
  },
  pager: {
    size: 'mini',
    layouts: ['PrevPage', 'JumpNumber', 'NextPage', 'Sizes', 'FullJump', 'Total'],
    pageSizes: [50, 200, 500, 1000],
    pageSize: 50,
  },

  button: {
    size: 'mini',
  },
});
VXETable.use(VXETablePluginExportXLSX);
VXETable.use(VXETablePluginAntd);
// 自定义全局的格式化处理函数
VXETable.formats.mixin({
  // 四舍五入金额，每隔3位逗号分隔，默认2位数
  formatAmount({ cellValue }, digits = 2) {
    return XEUtils.commafy(Number(cellValue), { digits });
  },
  // 四舍五入,默认两位数
  formatFixedNumber({ cellValue }, digits = 2) {
    return XEUtils.toFixed(XEUtils.round(cellValue, digits), digits);
  },
  // 向下舍入,默认两位数
  formatCutNumber({ cellValue }, digits = 2) {
    return XEUtils.toFixed(XEUtils.floor(cellValue, digits), digits);
  },
  // 转换 moment 类型为字符串
  toMomentString({ cellValue }, format) {
    return cellValue ? cellValue.format(format) : '';
  },
});

function useTable(app: App) {
  // 表格功能
  app.use(VXETable);

  // 给 vue 实例挂载内部对象，例如：
  app.config.globalProperties.$XModal = VXETable.modal;
  app.config.globalProperties.$XPrint = VXETable.print;
  app.config.globalProperties.$XSaveFile = VXETable.saveFile;
  app.config.globalProperties.$XReadFile = VXETable.readFile;
}

export function setupVxeTable(app: App) {
  app.use(useTable);
}
