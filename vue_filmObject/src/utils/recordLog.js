export default function (logLabel, content) {
  const log = {
    label: logLabel,
    children: content
  }

  let info = window.localStorage.getItem('AutomaticallyImport')
  if (!info) {
    info = JSON.stringify([log])
  } else {
    info = JSON.parse(info)
    const index = info.findIndex((item) => item.label === logLabel)
    if (index !== -1) {
      info[index] = log
    } else {
      info.push(log)
    }
    info = JSON.stringify(info)
  }
  window.localStorage.setItem('AutomaticallyImport', info)
}
