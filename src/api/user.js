import request from './request'
export const HomeLeftSidebar = (data) =>
  request.get('/menu/nav', { params: data })
export const User = () => request.get('/user/info')
export const List = (data) =>
  request.get(
    `/user/list?current=${data.current}&size${data.size}&username=${data.query}`
  )

export const UserAdd = (data) => request.post('/user/add', data)

export const UserUpdate = (data) => request.put('user/update', data)

export const UserDel = (data) => request.delete('user/del', data)
export const RoleList = (data) =>
  request.get(
    `/role/list?current=${data.current}&size${data.size}&name=${data.query}`
  )

export const RoleUpdate = (data) => request.put('/role/update', data)
export const RoleAdd = (data) => request.post('/role/add', data)
export const RoleDel = (data) => request.delete('/role/del', data)

export const MenuList = (data) =>
  request.get(
    `/menu/list?current=${data.current}&size${data.size}&username=${data.query}`
  )
export const MenuAdd = (data) => request.post('menu/add', data)
//

export const MenuUpdate = (data) => request.put('/menu/update', data)
//

export const Assign = (data) => request.get(`role/info/${data}`)

export const menu = () => request.get('/menu/list')
//

export const Menuroel = (id, data) => request.post(`/role/perm/${id}`, data)

export const UserRoleList = () => request.get('/role/list')

export const UserAddRoles = (id, data) =>
  request.post(`user/assign/${id}`, data)
