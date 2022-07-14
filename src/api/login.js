import request from './request'
export const LoginCode = () => request.get('/captcha')
export const LoginAdd = (data) =>
  request.post(
    `/login?username=${data.username}&password=${data.password}&code=${data.code}&token=${data.token}`
  )
//
