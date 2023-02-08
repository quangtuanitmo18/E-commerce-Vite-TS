export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('accessToken', access_token)
}
export const getAccessTokenFromLS = () => {
  localStorage.getItem('access_token') || ''
}
export const clearAccessTokenFromLS = () => {
  localStorage.removeItem('access_token')
}
