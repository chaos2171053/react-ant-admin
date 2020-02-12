import React, { memo, useCallback } from 'react';
import { Upload } from 'antd';
import { UploadProps, UploadChangeParam } from 'antd/lib/upload';
import { connect } from 'react-redux';
import { IStoreState } from '../../store/types';
import AdminConfig from '../../config';
import { UploadFile } from 'antd/lib/upload/interface';

interface UploadComponetItemProps extends UploadProps {
  uploadType?: string;
  token: string;
  children?: React.ReactNode;
  onUploadChange: (arg0: any) => any;
}

function UploadComponet(props: UploadComponetItemProps) {
  let { uploadType = 'image', token, children, ...otherProps } = props;
  const onUploadImage = useCallback(({ file }: UploadChangeParam<UploadFile<any>>) => {
    if (file.response && file.response.code === 200) {
      props.onUploadChange(file.response.data[0].url);
    }
  }, []);

  if (uploadType === 'image') {
    otherProps = {
      action: `${AdminConfig.API_URL}/upload/image`,
      onChange: onUploadImage,
      listType: 'picture-card',
      accept: 'image/*',
      showUploadList: false,
      ...otherProps,
    };
  }

  return (
    <>
      <Upload name="file" headers={{ token }} {...otherProps}>
        {children}
      </Upload>
    </>
  );
}
export default connect(({ user }: IStoreState) => ({ token: user.token }))(memo(UploadComponet));
