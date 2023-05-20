// 用户名匹配
export function nameRule(rule, value, callback) {
  let reg = /^[a-zA-Z0-9]{4,10}$/
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (!reg.test(value)) {
    callback(new Error('请输入4-10位用户名'))
  } else {
    callback()
  }
}
// 密码正则匹配
export function pwdRule(rule, value, callback) {
  let reg = /^[^\s]{6,12}$/
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!reg.test(value)) {
    callback(new Error('请输入6-12位密码'))
  } else {
    callback()
  }
}
