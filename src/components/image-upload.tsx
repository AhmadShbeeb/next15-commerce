import { useCallback, useEffect } from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

interface ImageUploadProps {
  onChange: (urls: string[]) => void;
}

export function ImageUpload({ onChange }: ImageUploadProps) {
  const uppy = new Uppy({
    restrictions: {
      maxFileSize: 2097152, // 2MB
      allowedFileTypes: ['image/*'],
    },
  }).use(XHRUpload, {
    endpoint: '/api/upload',
    fieldName: 'file',
    formData: true,
  });

  const handleUploadSuccess = useCallback(() => {
    const urls = uppy
      .getFiles()
      .filter((file) => file.response?.status === 200)
      .map((file) => file.response?.uploadURL as string);
    onChange(urls);
  }, [onChange, uppy]);

  useEffect(() => {
    uppy.on('upload-success', handleUploadSuccess);
    return () => {
      uppy.off('upload-success', handleUploadSuccess);
    };
  }, [handleUploadSuccess, uppy]);

  return (
    <Dashboard
      uppy={uppy}
      width="100%"
      showProgressDetails
      note="Images only, 2MB each"
      proudlyDisplayPoweredByUppy={false}
    />
  );
}
