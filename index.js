const TelegramApi= require ('node-telegram-bot-api');
const {gameOptions, againOptions}= require('./options')


const token ='7319639522:AAE4ZWhvQhXEe7aILWO07fvnCcWSo7MlHDc'

const bot= new TelegramApi(token, {polling: true})

const chats= {}



const startGame = async (chatId)=> {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9`)
    const randomNumber = Math.floor(Math.random()* 10)
    chats[chatId]=randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

const start=()=>{
    bot.setMyCommands ([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра угадай цифру'},
    ])
    bot.on('message', msg => {
        const text = msg.text;
        const chatId=msg.chat.id;
        if (text === '/start') {
        return bot.sendMessage(chatId, `Добро пожалоывть в телеграм канал`);
        return bot.sendSticker(chatId, `https://data.chpic.su/stickers/b/Biskvit3190/Biskvit3190_015.webp`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId , `Тебя зовут ${msg.from.first_name} ${msg.from.username}`)
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз')
        
    }) 
    bot.on('callback_query', msg => {
        const data =msg.data;
        const chatId = msg.message.chat.id;
        if (data=== '/again'){
            return startGame (chatId)
        }
        if (data===chats[chatId]){
            return bot.sendMessage(chatId, `Поздравляю, ты угадал цифру ${chats[chatId]}`, againOptions)
        } 
        else  {
            return bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions)
        } 
        
    })
}
start()