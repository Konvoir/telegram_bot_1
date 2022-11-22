const TelegramApi = require('node-telegram-bot-api')

const token = '5968959542:AAGtsAz3fGzXxLod-XMM2DWEQbYODK-_Jdw'

const bot = new TelegramApi(token, { polling: true })

const chats = {}


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
            return bot.sendMessage(chatId, 'Отгадывай');
        }

        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!')
    })
}

start()