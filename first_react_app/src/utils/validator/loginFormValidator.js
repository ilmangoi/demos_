function required(field) {
  return function (value, callback) {
    if (value === "") {
      return new Error(`${field}不能为空`);
    } else {
      return;
    }
  };
}

function lengthLimit(field, min, max) {
  return function (value, callback) {
    if (value.length < min || value.length > max) {
      return new Error(`${field}长度应在${min}-${max}个字符之间`);
    } else {
      return;
    }
  };
}

function passwordStrength(value) {
  const reg = /^(?=\D+\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9_\-$&!]{8,16}$/;
  if (!reg.test(value)) {
    return new Error("密码强度不够");
  } else {
    return;
  }
}

export function usernameValidator() {
  return [
    {
      validator: required("用户名"),
      trigger: "blur",
    },
    {
      validator: lengthLimit("用户名", 4, 10),
      trigger: "blur",
    },
  ];
}

export function passwordValidator() {
  return [
    {
      validator: required("密码"),
      trigger: "blur",
    },
    {
      validator: lengthLimit("密码", 8, 16),
      trigger: "blur",
    },
    {
      validator: passwordStrength,
      trigger: "blur",
    },
  ];
}
