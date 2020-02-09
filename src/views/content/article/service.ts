import { request } from '../../../api/request';
import { QueryListResponseData, PageQueryParams } from '../../../typings';

interface PlainObject {}

export interface ArticleProps {
  id?: number;

  title: string;

  type_id: number;

  content: string;

  introduce: string;

  view_count?: number;

  created_at?: string;

  updated_at?: string;

  deleted_at?: string;
}

export interface ArticleSearchParams extends PageQueryParams {
  title?: string;
  type_id?: number;
}

export function apiGetArticleList(params?: ArticleSearchParams) {
  return request<QueryListResponseData<ArticleProps>>({
    method: 'GET',
    url: '/article/list',
    params,
  });
}

export function apiUpdateArticle(data: ArticleProps) {
  return request<PlainObject>({
    method: 'PUT',
    url: '/article',
    data,
  });
}

export function apiCreateArticle(data: ArticleProps) {
  return request<PlainObject>({
    method: 'POST',
    url: '/article',
    data,
  });
}

export function apiRemoveArticle(id: number) {
  return request<PlainObject>({
    method: 'DELETE',
    url: `/article/${id}`,
  });
}
