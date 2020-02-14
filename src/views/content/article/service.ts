import { request } from '../../../api/request';
import { QueryListResponseData, PageQueryParams } from '../../../typings';
import { Moment } from 'moment';

interface PlainObject {}

export interface ArticleProps {
  id?: number;

  title: string;

  type_id: number | null;

  content: string;

  introduce: string;

  view_count?: number;

  type_name?: string;

  created_at?: string;

  publish_at: string | Moment;

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

export function apiGetArticle(id: number) {
  return request<ArticleProps>({
    method: 'GET',
    url: `/article/${id}`,
  });
}

export function apiUpdateArticle(data: ArticleProps) {
  return request<PlainObject>({
    method: 'PUT',
    url: `/article/${data.id}`,
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
    url: `/ article / ${id}`,
  });
}
