import type { App } from 'vue';
import { Button } from './Button';
import {
  // Need
  Button as AntButton,
  Input,
  Rate,
  InputNumber,
  AutoComplete,
  Select,
  Switch,
  Layout,
} from 'ant-design-vue';

const compList = [AntButton.Group];

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app
    .use(Input)
    .use(Select)
    .use(Switch)
    .use(Rate)
    .use(InputNumber)
    .use(AutoComplete)
    .use(Button)
    .use(Layout);
}
