const mark = {
    "@chatgpt": "https://chat.openai.com/",
    "@alist": "http://cloud.yuege.site",
    "@shuangpin": "https://index.yuege.site/shuangpin",
    "@flomo": "https://v.flomoapp.com/mine",
    "@gpt": "https://gpt.yuege.site",
    "@live": "http://live.yj1211.work/index/home/follows"

}

export function viewMark(str) {
    const key = str.split(' ')[0]
    if (!!mark[key]) {
            console.log(key)
			window.location.href = mark[key];
			return true
		}
        return false
}