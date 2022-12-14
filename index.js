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

const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Play again', callback_data: '/again' }],
        ]
    })
}

const startGame = async (chatId) => {
            await bot.sendMessage(chatId, 'Guess a number from 0 to 9!')
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber;
            await bot.sendMessage(chatId, 'Guess (Отгадывай)', gameOptions);
}

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Initial greeting' },
        { command: '/info', description: 'Get User Information' },
        { command: '/game', description: 'Guess the number game'}    
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
        return bot.sendMessage(chatId, `Your name is  ${msg.from.first_name} ${msg.from.last_name}`)
        }

        // Игра "угадай случайное число"
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, `I don't understand you, try again!`);

    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId);
        }
        if (data === chats[chatId]) {
            return await bot.sendMessage(chatId, `Congratulations, you guessed the number ${chats[chatId]}`, againOptions)
        } else {
            return await bot.sendMessage(chatId, `you didn't guess, the bot guessed the number ${chats[chatId]}`, againOptions)
        }
        // bot.sendMessage(chatId, `Ты выбрал цифру ${data}`)
        // console.log(msg)
    })
}

start()