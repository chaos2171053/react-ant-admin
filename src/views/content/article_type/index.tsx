import React, { useMemo, useState, useCallback, useEffect, memo } from 'react';
import PageWrap from '../../../components/PageWrap/PageWrap';
import SearchForm, {
  SearchFormItem,
  SearchFormAction,
} from '../../../components/SearchForm/SearchForm';
import { PageQueryParams, PageResponseData } from '../../../typings';
import {
  ArticleTypeSearchParams,
  apiGeArticleTypeList,
  ArticleTypeProps,
  apiRemoveArticleType,
} from './service';
import AddMoadl from './add_modal';
import BaseTable from '../../../components/BaseTable/BaseTable';
import { PaginationProps } from 'antd/lib/pagination';
import { Table, Icon, Button, Modal, message } from 'antd';

export default function ArticleTypePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [page, setPage] = useState<PageQueryParams>({ page: 1, pageSize: 10 });
  const [articleTypeData, setArticleTypeData] = useState<{
    list: ArticleTypeProps[];
    page: PageResponseData;
  }>({ list: [], page: {} });
  const [currentArticleType, setCurrentArticleType] = useState<ArticleTypeProps | null>(null);

  const formList = useMemo<SearchFormItem[]>(
    () => [
      {
        name: 'name',
        placeholder: '请输入类别名称',
        label: '类别名称',
      },
    ],
    [],
  );
  const onButtonClick = useCallback(
    (type: string, index: number) => {
      if (type === 'remove') {
        Modal.confirm({
          title: '系统提示',
          content: '此操作将永久删除该类别, 是否继续?',
          onOk() {
            apiRemoveArticleType(articleTypeData.list[index].id!).then(() => {
              message.success('删除成功！');
              initPageList();
            });
          },
          onCancel() {},
        });
      } else {
        setEditVisible(true);
        setCurrentArticleType(articleTypeData.list[index]);
      }
    },
    [articleTypeData.list],
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
    initPageList();
  }, [page]);
  const actions = useMemo<SearchFormAction[]>(
    () => [
      {
        name: '添加类别',
        type: 'primary',
      },
    ],
    [],
  );
  const initPageList = async (params?: ArticleTypeSearchParams) => {
    setLoading(true);
    try {
      const { data } = await apiGeArticleTypeList({
        ...page,
        ...params,
      });
      setArticleTypeData(data);
    } catch (error) {
      // dosomethings
    } finally {
      setLoading(false);
    }
  };

  const onSearch = useCallback(
    (params: ArticleTypeSearchParams) => {
      initPageList(params);
    },
    [page],
  );
  const onAddArticleType = useCallback(() => {
    setEditVisible(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setEditVisible(false);
  }, [setEditVisible]);

  const onOkEditModal = useCallback(() => {
    setEditVisible(false);
    initPageList();
  }, [setEditVisible]);

  const onTableChange = useCallback(({ current, pageSize }: PaginationProps) => {
    setPage({ page: current as number, pageSize: pageSize as number });
  }, []);

  return (
    <>
      <PageWrap>
        <SearchForm
          formList={formList}
          actions={actions}
          onSearch={onSearch}
          onClick={onAddArticleType}
        />
        {editVisible && (
          <AddMoadl
            articleType={currentArticleType}
            visible={editVisible}
            onClose={closeEditModal}
            onConfirm={onOkEditModal}
          ></AddMoadl>
        )}
        <BaseTable<ArticleTypeProps>
          data={articleTypeData}
          onChange={onTableChange}
          loading={loading}
        >
          <Table.Column<ArticleTypeProps> title="id" dataIndex="id" align="center"></Table.Column>
          <Table.Column<ArticleTypeProps>
            title="类别名称"
            dataIndex="name"
            align="center"
          ></Table.Column>
          <Table.Column<ArticleTypeProps>
            title="类别icon"
            dataIndex="icon"
            align="center"
            render={text => <Icon style={{ fontSize: '16px' }} type={text}></Icon>}
          ></Table.Column>
          <Table.Column<ArticleTypeProps>
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
