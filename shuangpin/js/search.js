import {wordsEncoding} from '../utils/transformToShuangpin.js'
import {pinyin} from '../utils/Convert_Pinyin.js'
import { $URL } from '../utils/gbk.js'

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
    // setTimeout(() => { $('.ant-pinyin').html(wordPinyin + '-' + word) }, 150)
    // // $('.ant-input').one('keyup', () => {
    // //     $('.ant-btn').click()
    // // })
    return word

}
function wordToShuangpin(word) {
    // const xhr = new XMLHttpRequest();
    // xhr.open('post', 'http://www.xhup.club/Xhup/Search/searchCode', true)
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // xhr.send(`search_word=${encodeURI('费')}&sign=${wordsEncoding('费')}`)
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         const res = xhr.responseText
    //         console.log('data:', res)
    //     }
    // }
    return fetch('http://www.xhup.club/Xhup/Search/searchCode', {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `search_word=${encodeURI(word)}&sign=${wordsEncoding(word)}`
    }).then(res => res.json())
}


// let currentWord = randomWord()
const input = document.querySelector('.ant-input')
input.addEventListener('keydown', (event) => {
    if(event.keyCode == '13') {
        let word = input.value
        word = word.length > 0 ? word.slice(0, 1) : word
        wordToShuangpin(word).then(data => {
            console.log(data.list_dz)
            document.querySelector('.div-2').innerHTML = data.list_dz[0].join('<br/>')
            input.value = ''
        })
    }
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