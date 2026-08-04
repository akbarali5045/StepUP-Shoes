import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import React from 'react'
import { ADMIN_DASHBOARD } from '@/routes/AdminPanelRoute';
import UploadMedia from '@/components/Application/Admin/UploadMedia';
const MediaPage = () => {
  const breadcrumbData = [
    { title: 'Home', href: ADMIN_DASHBOARD },
    { title: 'Media', href: '' },
  ];
  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <UploadMedia />
    </div>
  )
}

export default MediaPage