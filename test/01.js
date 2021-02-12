// 格式化 url
function formatUrl(url) {
  return url.replace(/(\/){2}/g, '/');
}

let url1 = '//home';
console.log(formatUrl(url1));