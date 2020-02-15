import React, { useEffect, useState, useMemo } from 'react';
import PageWrap from '../../../components/PageWrap/PageWrap';
import { withRouter, RouteComponentProps, useParams } from 'react-router-dom';
import { ArticleProps, apiCreateArticle, apiUpdateArticle, apiGetArticle } from './service';
import { apiGeArticleTypeList, ArticleTypeProps } from '../article_type/service';
import AddForm from '../../../components/add_form';
import { message } from 'antd';
import { formatDate } from '../../../utils/date';
import moment from 'moment';
import BraftEditor from 'braft-editor';
interface IAddPpageProps extends RouteComponentProps {}
interface RouteProps {
  id?: string | undefined;
}

function AddPage(props: IAddPpageProps) {
  const params = useParams<RouteProps>();
  const [articleData, setArticleData] = useState<ArticleProps>({
    id: 0,
    title: '',
    type_id: null,
    content: '',
    introduce: '',
    publish_at: moment(),
  });
  const [articleTypeList, setArticleTypeList] = useState<ArticleTypeProps[]>([]);
  useEffect(() => {
    const id = params.id;
    getArticleTypeList();
    if (id) {
      getArticleInfo(parseInt(id));
    }
    return () => {};
  }, []);
  const getArticleInfo = (id: number) => {
    apiGetArticle(id).then(res => {
      setArticleData(res.data);
    });
  };
  const getArticleTypeList = () => {
    apiGeArticleTypeList({ page: 1, pageSize: 20 }).then(res => {
      setArticleTypeList(res.data.list);
    });
  };
  const onSubmit = (res: any) => {
    return new Promise(async (resolve, reject) => {
      let params: ArticleProps = {
        ...res,
        introduce: res.introduce.toHTML(),
        content: res.content.toHTML(),
      };
      if (res.publish_at) {
        params.publish_at = formatDate(res.publish_at);
      }
      if (articleData.id) {
        await apiUpdateArticle(params);
      } else {
        await apiCreateArticle(params);
      }
      message.success('发布成功');
      props.history.push('/content/article/list');
      resolve();
    });
  };
  const formList = useMemo(() => {
    const typeOptions = articleTypeList.map(type => ({
      label: type.name,
      value: type.id,
    }));
    return [
      {
        name: 'id',
        label: 'id',
        type: 'hidden',
        initialValue: articleData.id,
        rules: [
          {
            required: false,
          },
        ],
      },
      {
        name: 'title',
        placeholder: '请输入标题',
        label: '标题',
        initialValue: articleData.title,
        rules: [
          {
            required: true,
            message: '请输入标题',
            max: 30,
          },
        ],
      },
      {
        name: 'type_id',
        placeholder: '请选择类别',
        label: '类别',
        type: 'select',
        initialValue: articleData.type_id,
        options: typeOptions,
        rules: [
          {
            required: true,
            message: '请选择类别',
          },
        ],
      },
      // TODO: faet:定时发表文章 https://github.com/zhuangchuming/NodeJsTimerTask
      {
        name: 'publish_at',
        placeholder: '请选择发布时间',
        label: '发布时间',
        initialValue: moment(articleData.publish_at),
        type: 'date-time',
        rules: [
          {
            required: true,
            message: '请选择发布时间',
          },
        ],
      },
      {
        name: 'introduce',
        label: '简介',
        type: 'editor',
        placeholder: '请输入简介',
        validateTrigger: 'onBlur',
        initialValue: articleData.introduce,
        upload: true,
        rules: [
          {
            required: true,
            validator: (_: any, value: { isEmpty: () => any }, callback: (arg0?: any) => any) => {
              if (value.isEmpty()) {
                callback('请输入简介');
              } else {
                callback();
              }
            },
          },
        ],
      },
      {
        name: 'content',
        label: '内容',
        type: 'editor',
        placeholder: '请输入内容',
        initialValue: articleData.content,
        validateTrigger: 'onBlur',
        upload: true,
        rules: [
          {
            required: true,
            validator: (_: any, value: { isEmpty: () => any }, callback: (arg0?: any) => any) => {
              if (value.isEmpty()) {
                callback('请输入内容');
              } else {
                callback();
              }
            },
          },
        ],
      },
    ];
  }, [articleData, articleTypeList]);
  return (
    <>
      <PageWrap>
        <AddForm formList={formList} onSubmit={onSubmit} />
      </PageWrap>
    </>
  );
}

export default withRouter(AddPage);
