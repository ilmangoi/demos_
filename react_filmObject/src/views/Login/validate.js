export const usernameRules = [
  {
    required: true,
    message: "账号不能为空",
  },
  // 自定义验证表单
  {
    validator: (rule, value) => {
      // 要返回Promise对象,reject表示验证不通过,会显示message中的信息
      if (/^\s+$/.test(value)) {
        return Promise.reject("");
      }
      return Promise.resolve("");
    },
    validateTrigger: "onBlur",
    message: "账号开头不能用空格",
  },
];

export const passwordRules = [
  {
    required: true,
    message: "密码不能为空",
  },
];
