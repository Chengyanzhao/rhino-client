import request from '@/utils/request'
import api from './index'

export const listType = {
  all: 'all',
  folder: 'folder',
  file: 'file'
}

export function list(baseDir, type) {
  return request({
    url: api.folder.list,
    method: 'GET',
    params: { baseDir, listType: type }
  })
}

export function listFolder(baseDir) {

}

export function create(baseDir, name) {
  return request({
    url: api.folder.create,
    method: 'PUT',
    data: { baseDir, name }
  })
}

export function remove(folderId) {
  return request({
    url: `${api.folder.remove}/${folderId}`,
    method: 'DELETE'
  })
}

export function rename(base, oldName, newName) {
  return request({
    url: api.folder.rename,
    method: 'POST',
    data: { base, oldName, newName }
  })
}
