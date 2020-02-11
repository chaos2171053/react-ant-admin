import React, { useEffect, useState, useMemo } from 'react';
import PageWrap from '../../../components/PageWrap/PageWrap';
import { withRouter, RouteComponentProps, useParams } from 'react-router-dom';
import { ArticleProps } from './service';
import { apiGeArticleTypeList, ArticleTypeProps } from '../article_type/service';
import AddForm from '../../../components/add_form';

interface IAddPpageProps extends RouteComponentProps {}
interface RouteProps {
  id?: string | undefined;
}

function AddPage(props: IAddPpageProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const params = useParams<RouteProps>();
  const [articleData, setArticleData] = useState<ArticleProps>({
    id: 0,
    title: '',
    type_id: null,
    content: '',
    introduce: '',
  });
  const [articleTypeList, setArticleTypeList] = useState<ArticleTypeProps[]>([]);
  useEffect(() => {
    const id = params.id;
    getArticleTypeList();
    if (id) {
      setIsEdit(true);
    }
    return () => {};
  }, []);
  const getArticleTypeList = () => {
    apiGeArticleTypeList({ page: 1, size: 20 }).then(res => {
      setArticleTypeList(res.data.list);
    });
  };
  const onSubmit = (res: any) => {
    return new Promise(async (resolve, reject) => {
      setTimeout(() => {
        console.log(res);
        resolve();
      }, 3000);

      // } else {
      //   resolve()
      // }
    });
  };
  const formList = useMemo(() => {
    const typeOptions = articleTypeList.map(type => ({
      label: type.name,
      value: type.id,
    }));
    return [
      {
        name: 'title',
        placeholder: '请输入标题',
        label: '标题',
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
        options: typeOptions,
        rules: [
          {
            required: true,
            message: '请选择类别',
          },
        ],
      },
      // TODO: faet:定时发表文章 https://github.com/zhuangchuming/NodeJsTimerTask
      // {
      //   name: 'public_at',
      //   placeholder: '请选择发布时间',
      //   label: '发布时间',
      //   type: 'select',
      //   options: typeOptions,
      //   rules: [
      //     {
      //       required: true,
      //       message: '请选择类别',
      //     },
      //   ],
      // }
      {
        name: 'content',
        label: '内容',
        type: 'editor',
        placeholder: '请输入内容',
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
        {/* <Formik <ArticleProps> initialValues={articleData} onSubmit={onSubmit}>
          <Form >
            {
              isEdit ? <FormItem name="id" label="id" required={true} style={{ display: 'none' }}>
                <Input name="id" type="hidden" />
              </FormItem> : null
            }
            <FormItem name="title" label="标题" required={true}>
              <Input name="title" placeholder="请输入标题" maxLength={30} />
            </FormItem>
            <FormItem name="type_id" label="文章类别" required={true}>
              <Select name="type_id" placeholder="请选择文章类别">
                {articleTypeList.map((type: ArticleTypeProps) => (
                  <Select.Option key={type.id} value={type.id}>
                    {type.name}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
            <FormItem name="create_at" label="发表日期" required={true}>
              <DatePicker name="create_at" showTime={true} />
            </FormItem>

            <SubmitButton>提交</SubmitButton>
            <ResetButton>重置</ResetButton>
          </Form>
        </Formik> */}
      </PageWrap>
    </>
  );
}

export default withRouter(AddPage);
