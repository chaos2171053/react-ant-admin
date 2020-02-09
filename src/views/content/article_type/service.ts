import { request } from '../../../api/request';
import { QueryListResponseData, PageQueryParams } from '../../../typings';

interface PlainObject {}

export interface ArticleTypeProps {
  id?: number;

  name: string;

  icon: string;
}

export interface ArticleTypeSearchParams extends PageQueryParams {
  name?: string;
}

export function apiGeArticleTypeList(params?: ArticleTypeSearchParams) {
  return request<QueryListResponseData<ArticleTypeProps>>({
    method: 'GET',
    url: '/article/type/list',
    params,
  });
}

export function apiUpdateArticleType(data: ArticleTypeProps) {
  return request<PlainObject>({
    method: 'PUT',
    url: `/article/type/${data.id}`,
    data,
  });
}

export function apiCreateArticleType(data: ArticleTypeProps) {
  return request<PlainObject>({
    method: 'POST',
    url: '/article/type',
    data,
  });
}

export function apiRemoveArticleType(id: number) {
  return request<PlainObject>({
    method: 'DELETE',
    url: `/article/type/${id}`,
  });
}
