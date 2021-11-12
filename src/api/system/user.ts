import { defHttp } from '/@/utils/http/axios';

enum Api {
  List = '/user/list',
  Save = '/user/save',
  Del = '/user/del',
}

/**
 * @description: 用户列表
 */
export function getList(params) {
  return defHttp.post({
    url: Api.List,
    params,
  });
}
/**
 * @description: 用户新增 | 编辑
 */
export function save(params) {
  return defHttp.post({
    url: Api.Save,
    params,
  });
}

/**
 * @description: 用户新增 | 编辑
 */
export function del(params) {
  return defHttp.post({
    url: Api.Del,
    params,
  });
}
