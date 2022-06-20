//import { Game, GameSource } from "../interfaces/game-source.interface";
import { Game, GameSource } from '@myorg/game-data';

export const GameSources: Game = {
    name: "Peak's Adventures",
    id: 1,
    gameSources: [
        {
            id: 1,
            background: 'b1.jpg',
            gameDialog: {
                discription: {
                    text: 'Сегодня обычное школьное утро. Ничего такого. Как вдруг моя однокласница позвала меня'
                }
            },
            sourceLinks: [
                {
                src: 2,
                },
            ]
        },
        {
            id: 2,
            background: 'b1.jpg',
            person: 'p1.png',
            gameDialog: {
                title: {
                    text: 'Эйлин',
                    color: '#42ff8a'
                },
                discription: {
                    text: 'Тебя же Пик зовут? Пойдем со мной!'
                }
            },
            sourceLinks: [
                {
                src: 3,
                },
            ]
        },
        {
            id: 3,
            background: 'b1.jpg',
            gameDialog: {
                discription: {
                    text: 'Что? Даже так? Без привета... Ну ладно.'
                }
            },
            sourceLinks: [
                {
                src: 4,
                },
            ]
        },
        {
            id: 4,
            background: 'b1.jpg',
            gameDialog: {
                title: {
                    text: 'Пик',
                    color: '#2f149a'
                },
                discription: {
                    text: 'Тебе что-то нужно? Я не совсем понимаю'
                }
            },
            sourceLinks: [
                {
                src: 5,
                },
            ]
        },
        {
            id: 5,
            background: 'b1.jpg',
            person: 'p1.png',
            gameDialog: {
                title: {
                    text: 'Эйлин',
                    color: '#42ff8a'
                },
                discription: {
                    text: 'Арг... Просто идем уже, зануда!'
                }
            },
            sourceLinks: [
                {
                src: 6,
                },
            ]
        },
        {
            id: 6,
            background: 'b1.jpg',
            person: 'p1.png',
            gameDialog: {
                discription: {
                    text: 'Что мне стоит делать?'
                }
            },
            sourceLinks: [
                {
                src: 7,
                lable: 'Пойти вместе с ней'
                },
                {
                src: 10000,
                lable: 'Остаться в классе'
                },
            ]
        },
        {
            id: 7,
            background: 'b2.jpg',
            gameDialog: {
                discription: {
                    text: 'Странно...'
                }
            },
            sourceLinks: [
                {
                src: 8,
                },
            ]
        },
        {
            id: 8,
            background: 'b2.jpg',
            gameDialog: {
                discription: {
                    text: 'Обычно в коридоре толпа народу. А урок ведь не начался'
                }
            },
            sourceLinks: [
                {
                src: 9,
                },
            ]
        },
        {
            id: 9,
            background: 'b2.jpg',
            gameDialog: {
                title: {
                    text: 'Пик',
                    color: '#2f149a'
                },
                discription: {
                    text: 'Ну?'
                }
            },
            sourceLinks: [
                {
                src: 10,
                },
            ]
        },
        {
            id: 10,
            background: 'b2.jpg',
            gameDialog: {
                discription: {
                    text: 'Я решила сразу преступить к делу'
                }
            },
            sourceLinks: [
                {
                src: 11,
                },
            ]
        },
        {
            id: 11,
            background: 'b2.jpg',
            person: 'p1.png',
            gameDialog: {
                title: {
                    text: 'Эйлин',
                    color: '#42ff8a'
                },
                discription: {
                    text: 'Ммм... С чего бы мне начать? В этом же коридоре я обнаружила записку на полу, где было указано твое имя'
                }
            },
            sourceLinks: [
                {
                src: 12,
                },
            ]
        },
        {
            id: 12,
            background: 'b2.jpg',
            person: 'p1.png',
            gameDialog: {
                discription: {
                    text: 'О-па. А это уже интересно'
                }
            },
            sourceLinks: [
                {
                src: 13,
                },
            ]
        },
        {
            id: 13,
            background: 'b2.jpg',
            person: 'p1.png',
            gameDialog: {
                title: {
                    text: 'Пик',
                    color: '#2f149a'
                },
                discription: {
                    text: 'И? Что там написано?'
                }
            },
            sourceLinks: [
                {
                src: 14,
                },
            ]
        },
        {
            id: 14,
            background: 'b2.jpg',
            person: 'p1.png',
            gameDialog: {
                title: {
                    text: 'Эйлин',
                    color: '#42ff8a'
                },
                discription: {
                    text: 'Ты чего? Записка адресована не мне... Я не собираюсь читать ее. Поэтому и позвала тебя.'
                }
            },
            sourceLinks: [
                {
                src: 15,
                },
            ]
        },
        {
            id: 15,
            background: 'b2.jpg',
            gameDialog: {
                discription: {
                    text: 'А. Ясно'
                }
            },
            sourceLinks: [
                {
                src: 16,
                },
            ]
        },
        {
            id: 16,
            background: 'b2.jpg',
            person: 'p1.png',
            gameDialog: {
                title: {
                    text: 'Эйлин',
                    color: '#42ff8a'
                },
                discription: {
                    text: 'Чего стоишь? Смотри что там! Я же не зря тебя сюда звала'
                }
            },
            sourceLinks: [
                {
                src: 17,
                },
            ]
        },
        {
            id: 17,
            background: 'b2.jpg',
            person: 'p1.png',
            gameDialog: {
                discription: {
                    text: 'Так ей просто было интересно.'
                }
            },
            sourceLinks: [
                {
                src: 18,
                },
            ]
        },
        {
            id: 18,
            background: 'b2.jpg',
            person: 'p1.png',
            gameDialog: {
                discription: {
                    text: 'Тут же не указана конкретно моя фамилия. Только имя. Может не стоит?'
                }
            },
            sourceLinks: [
                {
                    src: 19,
                    lable: 'Не смотреть'
                },
                {
                    src: 10000,
                    lable: 'Прочитать записку'
                },
            ]
        },
        {
            id: 19,
            background: 'b2.jpg',

            gameDialog: {
                discription: {
                    text: 'Лучше не читать. Вдуг это что-то важное и это вообще не для меня. Неловко получилось бы...'
                }
            },
            sourceLinks: [
                {
                    src: 20,
                },
            ]
        },
        {
            id: 20,
            background: 'b2.jpg',
            person: 'p1.png',
            gameDialog: {
                title: {
                    text: 'Эйлин',
                    color: '#42ff8a'
                },
                discription: {
                    text: 'Ну? Смотри уже!'
                }
            },
            sourceLinks: [
                {
                    src: 21,
                },
            ]
        },
        {
            id: 21,
            background: 'b2.jpg',
            person: 'p1.png',
            gameDialog: {
                title: {
                    text: 'Пик',
                    color: '#2f149a'
                },
                discription: {
                    text: 'Я не буду.'
                }
            },
            sourceLinks: [
                {
                    src: 22,
                },
            ]
        },
        {
            id: 22,
            background: 'b2.jpg',
            gameDialog: {
                discription: {
                    text: 'Было видно, что она расстроена...'
                }
            },
            sourceLinks: [
                {
                    src: 10000,
                },
            ]
        },
        {
            id: 55555,
            background: 'b1.jpg',
            person: 'p1.png',
            gameDialog: {
                title: {
                    text: 'Эйлин',
                    color: '#42ff8a'
                },
                discription: {
                    text: 'Тебя же Пик зовут? Пойдем со мной!'
                }
            },
            sourceLinks: [
                {
                src: 2,
                lable: 'Не смотреть'
                },
                {
                src: 3,
                lable: 'Прочитать записку'
                },
            ]
        },


        {
            id: 10000,
            background: 'final.jpg',
            gameDialog: {
                discription: {
                    text: 'НЕОЖИДАННЫЙ ФИАЛ!... ПРОДОЛЖЕНИЕ СЛЕДУЕТ...'
                }
            },
            sourceLinks: [
                {
                src: 1,
                },
            ]
        },
    ]
}