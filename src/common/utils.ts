import { useMessage } from '/@/hooks/web/useMessage';
import _ from 'lodash';
const { notification, createConfirm } = useMessage();
export function confirmDelete() {}

/**
 * 确认发送post请求
 */
export function sendConfirmPost(api, handleSucceed, ...options) {
  const opt = _.defaultsDeep(
    {
      iconType: 'warning',
      title: '操作确认',
      content: '确实是否操作',
    },
    options,
  );
  createConfirm({
    iconType: opt.iconType,
    title: () => opt.title,
    content: () => opt.content,
    onOk: () => {
      return new Promise(async (resolve, reject) => {
        const res = await _.attempt(api[0], api[1]);
        if (res) {
          _.attempt(handleSucceed[0], handleSucceed[1]);
          notification.success({
            message: '操作成功',
            description: ``,
            duration: 3,
          });
          resolve(res);
        } else {
          reject();
        }
      });
    },
  });
}
