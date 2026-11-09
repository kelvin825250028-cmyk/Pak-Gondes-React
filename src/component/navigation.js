export function pageUrl(page, anchor = '') {
  const url = `${import.meta.env.BASE_URL}?page=${page}`
  return anchor ? `${url}#${anchor}` : url
}
