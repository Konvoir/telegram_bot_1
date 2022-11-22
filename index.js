const TelegramApi = require('node-telegram-bot-api')

const token = '5968959542:AAGtsAz3fGzXxLod-XMM2DWEQbYODK-_Jdw'

const bot = new TelegramApi(token, { polling: true })

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '1', callback_data: '1' }, { text: '2', callback_data: '2' }, { text: '3', callback_data: '3' }],
            [{ text: '4', callback_data: '4' }, { text: '5', callback_data: '5' }, { text: '6', callback_data: '6' }],
            [{ text: '7', callback_data: '7' }, { text: '8', callback_data: '8' }, { text: '9', callback_data: '9' }],
            [{ text: '0', callback_data: '0' }],
        ]
    })
}

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Начальное приветствие' },
        { command: '/info', description: 'Получить Информацию о пользователе' },
        { command: '/game', description: 'Игра угадай цифру'}    
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        // console.log(msg)

        if (text === '/start') {
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/3d2/327/3d23274e-2dd6-483a-b103-9493e184fdb4/9.webp')
        return bot.sendMessage(chatId, `Hello in my bot`)
        }

        if (text === '/info') {
        return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
        }

        // Игра "угадай случайное число"
        if (text === '/game') {
            await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты попробуй угадать!')
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber;
            return bot.sendMessage(chatId, 'Отгадывай', gameOptions);
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!');

    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === chats[chatId]) {
            return await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`)
        } else {
            return await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`)
        }
        // bot.sendMessage(chatId, `Ты выбрал цифру ${data}`)
        // console.log(msg)
    })
}

start()