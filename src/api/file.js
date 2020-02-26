import api from './index'
import request from '@/utils/request'

export function upload(file, baseDir, progressFun) {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: api.file.upload,
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData,
    params: { folderId: baseDir },
    onUploadProgress(progressEvent) {
      if (progressFun && progressEvent.lengthComputable) {
        const { loaded, total } = progressEvent
        progressFun(loaded, total)
      }
    }
  })
}

export function remove(fileId) {
  return request({
    url: `${api.file.remove}/${fileId}`,
    method: 'DELETE'
    // data: { base, ids }
  })
}
