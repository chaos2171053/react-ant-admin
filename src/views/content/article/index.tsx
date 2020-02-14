import React, { useMemo, useState, useCallback, useEffect, memo } from 'react';
import PageWrap from '../../../components/PageWrap/PageWrap';
import SearchForm, {
  SearchFormItem,
  SearchFormAction,
} from '../../../components/SearchForm/SearchForm';
import { PageQueryParams, PageResponseData } from '../../../typings';
import { ArticleSearchParams, apiGetArticleList, ArticleProps, apiRemoveArticle } from './service';
import BaseTable from '../../../components/BaseTable/BaseTable';
import { PaginationProps } from 'antd/lib/pagination';
import { Table, Button, Modal, message, Select } from 'antd';
import { apiGeArticleTypeList, ArticleTypeProps } from '../article_type/service';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const { Option } = Select;
interface Props extends RouteComponentProps {}
function ArticlePage(props: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<PageQueryParams>({ page: 1, size: 10 });
  const [articleData, setArticleData] = useState<{
    list: ArticleProps[];
    page: PageResponseData;
  }>({ list: [], page: {} });
  const [articleTypeList, setArticleTypeList] = useState<ArticleTypeProps[] | []>([]);

  const formList = useMemo<SearchFormItem[]>(() => {
    let options: React.ReactNode[] = [];
    articleTypeList.forEach((type: ArticleTypeProps) => {
      options.push(
        <Option key={type.id} value={type.id}>
          {type.name}
        </Option>,
      );
    });
    return [
      {
        name: 'title',
        placeholder: '请输入文章标题',
        label: '文章标题',
      },
      {
        name: 'type_id',
        label: '文章类别',
        placeholder: '请选择文章类别',
        render: (
          <Select style={{ width: '150px' }} placeholder="请选择文章类别">
            {options}
          </Select>
        ),
      },
    ];
  }, [articleTypeList]);

  const onButtonClick = useCallback(
    (type: string, index: number) => {
      if (type === 'remove') {
        Modal.confirm({
          title: '系统提示',
          content: '此操作将永久删除该文章, 是否继续?',
          onOk() {
            apiRemoveArticle(articleData.list[index].id!).then(() => {
              message.success('删除成功！');
              initPageList();
            });
          },
          onCancel() {},
        });
      } else {
        props.history.push(`/content/article/edit/${articleData.list[index].id}`);
      }
    },
    [articleData.list],
  );

  const MenuButton = memo(
    ({
      index,
      onButtonClick,
    }: {
      index: number;
      onButtonClick: (type: string, index: number) => void;
    }) => (
      <React.Fragment>
        <Button
          size="small"
          style={{ marginRight: '10px' }}
          onClick={() => onButtonClick('edit', index)}
          type="link"
        >
          编辑
        </Button>
        <Button size="small" type="link" onClick={() => onButtonClick('remove', index)}>
          删除
        </Button>
      </React.Fragment>
    ),
  );
  useEffect(() => {
    initArticleTypeList();
    initPageList();
  }, [page]);
  const actions = useMemo<SearchFormAction[]>(
    () => [
      {
        name: '添加文章',
        type: 'primary',
      },
    ],
    [],
  );
  const initArticleTypeList = async () => {
    apiGeArticleTypeList({ page: 1, size: 20 }).then(res => {
      setArticleTypeList(res.data.list);
    });
  };
  const initPageList = async (params?: ArticleSearchParams) => {
    setLoading(true);
    try {
      let { data } = await apiGetArticleList({
        ...page,
        ...params,
      });
      setArticleData(data);
    } catch (error) {
      // dosomethings
    } finally {
      setLoading(false);
    }
  };

  const onSearch = useCallback(
    (params: ArticleSearchParams) => {
      initPageList(params);
    },
    [page],
  );
  const onAddArticle = useCallback(() => {
    props.history.push('/content/article/add');
  }, []);

  const onTableChange = useCallback(({ current, pageSize }: PaginationProps) => {
    setPage({ page: current as number, size: pageSize as number });
  }, []);

  return (
    <>
      <PageWrap>
        <SearchForm
          formList={formList}
          actions={actions}
          onSearch={onSearch}
          onClick={onAddArticle}
        />
        <BaseTable<ArticleProps> data={articleData} onChange={onTableChange} loading={loading}>
          <Table.Column<ArticleProps> title="id" dataIndex="id" align="center"></Table.Column>
          <Table.Column<ArticleProps> title="标题" dataIndex="title" align="center"></Table.Column>
          <Table.Column<ArticleProps>
            title="文章类别"
            dataIndex="type_name"
            align="center"
          ></Table.Column>
          <Table.Column<ArticleProps>
            title="浏览次数"
            dataIndex="view_count"
            align="center"
          ></Table.Column>
          <Table.Column<ArticleProps>
            title="发布时间"
            dataIndex="publish_at"
            align="center"
          ></Table.Column>
          <Table.Column<ArticleSearchParams>
            title="操作"
            align="center"
            render={(text, record, index) => (
              <MenuButton index={index} onButtonClick={onButtonClick} />
            )}
          ></Table.Column>
        </BaseTable>
      </PageWrap>
    </>
  );
}
export default withRouter(ArticlePage);
