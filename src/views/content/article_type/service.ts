import { request } from '../../../api/request';
import { QueryListResponseData, PageQueryParams } from '../../../typings';

interface PlainObject {}

export interface ArticleType {
  id?: number;

  name: string;

  icon: string;
}

export interface ArticleTypeSearchParams extends PageQueryParams {
  name?: string;
}

export function apiGeList(params?: ArticleTypeSearchParams) {
  return request<QueryListResponseData<ArticleType>>({
    method: 'GET',
    url: '/article/type/list',
    params,
  });
}

export function apiUpdateArticleType(data: ArticleType) {
  return request<PlainObject>({
    method: 'PUT',
    url: `/article/type/${data.id}`,
    data,
  });
}

export function apiCreateArticleType(data: ArticleType) {
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
