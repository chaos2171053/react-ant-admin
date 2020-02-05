import { request } from '../../../api/request';
import { QueryListResponseData, PageQueryParams } from '../../../typings';
import { Menu } from '../menu/service';

interface PlainObject {}

export interface Role {
  id?: number;

  name: string;
}

export interface RoleSearchParams extends PageQueryParams {
  name?: string;
  id?: number;
  url?: string;
  level?: number;
  parentId?: number;
}

export function apiGetRoleList(params?: RoleSearchParams) {
  return request<QueryListResponseData<Role>>({
    method: 'GET',
    url: '/admin/role',
    params,
  });
}

export function apiUpdateRole(data: Role) {
  return request<PlainObject>({
    method: 'PUT',
    url: '/admin/role',
    data,
  });
}

export function apiCreateRole(data: Role) {
  return request<PlainObject>({
    method: 'POST',
    url: '/admin/role',
    data,
  });
}

export function apiRemoveRole(id: number) {
  return request<PlainObject>({
    method: 'DELETE',
    url: `/admin/role/${id}`,
  });
}

export function apiGetMenuListByRoleId(id: number) {
  return request<{ list: Menu[]; ids: number[] }>({
    method: 'GET',
    url: `/role/menu/${id}`,
  });
}

export function apiUpdateMenuListByRoleId(roleId: number, menuIds: number[]) {
  return request<PlainObject>({
    method: 'PUT',
    url: `/role/menu/${roleId}`,
    data: {
      menuIds,
    },
  });
}
