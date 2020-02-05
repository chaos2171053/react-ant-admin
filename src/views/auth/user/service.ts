import { request } from '../../../api/request';
import { QueryListResponseData, PageQueryParams } from '../../../typings';
import { Menu } from '../menu/service';

interface PlainObject {}

export interface User {
  id?: number;

  name: string;

  account: string;

  password: string;

  avatar?: string | null;

  mobile: string;

  roleId: number;

  role?: {
    id: number;
    name: string;
  };

  status: number;
}

export interface UserSearchParams extends PageQueryParams {
  name?: string;
  id?: number;
  account?: string;
  mobile?: number;
}

export function apiGetUserList(params?: UserSearchParams) {
  return request<QueryListResponseData<User>>({
    method: 'GET',
    url: '/admin/user',
    params,
  });
}

export function apiUpdateUser(data: User) {
  return request<PlainObject>({
    method: 'PUT',
    url: '/admin/user',
    data,
  });
}

export function apiCreateUser(data: User) {
  return request<PlainObject>({
    method: 'POST',
    url: '/admin/user',
    data,
  });
}

export function apiRemoveUser(id: number) {
  return request<PlainObject>({
    method: 'DELETE',
    url: `/admin/user/${id}`,
  });
}

export function apiGetMenuList() {
  return request<{ list: Menu[]; ids: number[] }>({
    method: 'GET',
    url: '/admin/user/menu',
  });
}
