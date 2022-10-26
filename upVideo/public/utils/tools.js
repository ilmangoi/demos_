export const fileToBinary = (fileObj, type = "binary") => {
  return new Promise((resolve, reject) => {
    let read = new FileReader();
    if (type === "binary") {
      // 读取的过程是一个异步的
      read.readAsBinaryString(fileObj);
    } else {
      read.readAsArrayBuffer(fileObj);
    }
    read.onload = (evt) => {
      // 把文件对象读成binary
      resolve(evt.target.result);
    };
  });
};

export const delay = (time = 300) => {
  return new Promise((_) => {
    setTimeout(() => {
      _("");
    }, time);
  });
};
