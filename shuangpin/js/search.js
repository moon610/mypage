$(() => {
    setTimeout(() => {
        $('.div-1').prepend('<span class="ant-pinyin"></span>')
    }, 30)

})
/**
 * 随机生成一个汉字
 */
function randomWord() {
    function Random(min, max) {
        if (typeof min === 'number' && typeof max === 'number') {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        if (typeof min === 'string' && typeof max === 'string') {
            const min_ascii = Number(min.charCodeAt(0)),
                max_ascii = Number(max.charCodeAt(0))
            return String.fromCharCode(Math.floor(Math.random() * (max_ascii - min_ascii + 1) + min_ascii))
        }

    }
    /**
    *16-55区收录3755个一级汉字，按拼音排序。
    *GB2312编码范围：A1A1－FEFE，其中汉字的编码范围为B0A1-F7FE，
    *第一字节0xB0-0xF7（对应区号：16－87），第二个字节0xA1-0xFE（对应位号：01－94）
    **/
    const code = '%' + Random('B', 'D') + Random(0, 7) + '%' + Random('A', 'F') + (Random(1, 16) > 9 ? Random('A', 'E') : Random(1, 9))
    const word = $URL.decode(code)
    const wordPinyin = pinyin.getFullChars(word)
    console.log('随机汉字：', word)//将随机到的编码解码成汉字
    console.log(wordPinyin)
    $('.ant-input').focus()
    setTimeout(() => { $('.ant-pinyin').html(wordPinyin + '-' + word) }, 150)
    // $('.ant-input').one('keyup', () => {
    //     $('.ant-btn').click()
    // })
    return word

}
let currentWord = randomWord()
wordToShuangpin(currentWord).then(data => {
    console.log(data.list_dz)
})
//点击拼音显示提示
$('.div-1 span').click((e) => {
    e.stopPropagation()
    // $('.div-2').show()
    console.log('111')
})
// $('.ant-input').on('keyup', (e) => {
//     $('.ant-pinyin').click(() => {
//         $('.div-2').show()
//     })
//     if (!!$('.ant-card-head-title').text()) {
//         //获取该字的双拼音形码
//         let wordcode = $('.ant-card-head-title').text().split('').filter((value) => {
//             return /^[A-Za-z]+$/.test(value)
//         }).join('')
//         let inword = $('.ant-input').val()
//         console.log(wordcode)
//         if ($('.ant-card-head-title').text().indexOf('-') !== -1) {
//             //已有简码
//             // $('.tip').show()
//             if (inword.slice(-2) === wordcode.slice(0, 2) || inword.slice(-2) === wordcode.slice(4, 6)) {
//                 currentWord = randomWord()
//                 return
//             }
//         } else {
//             if (inword.slice(-4) === wordcode || inword.slice(-4) === wordcode.slice(-4)) {
//                 randomWord()
//                 return
//             }
//         }
//     }
//     if ($('.ant-input').val().length - 5 >= 4) {
//         $('.ant-input').val($('.ant-input').val().slice(0, 5))
//     }

// })