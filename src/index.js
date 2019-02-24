import SlackBot from "slackbots";
import axios from "axios";

const bot = new SlackBot({
    token: "xoxb-558972477111-560418189702-oJpLMzgraXuPQmNs2Fgs3je6",
    name: "jokebot"
})

bot.on('start', () => {
    const params = {
        emoji_icon: ":smiley:"
    }

    bot.postMessageToChannel('general', 'get ready to laugh with @jokebot ', params);
})

// Error Handler
bot.on("error", (err) => console.log(err))

// Message Handler
bot.on("message", (data) => {
    if (data.type !== "message") {
        return;
    }
    handleMessage(data.text);
})

const handleMessage = (message) => {
    if (message.includes(" chunknorris")) {
        chunkJoke()
    } else if (message.includes(" yomama")) {
        yomommajoke()
    } else if (message.includes(" random")) {
        randomjoke()
    } else if (message.includes(" help")) {
        runHelp()
    }
}

// Crack the chucknorris joke
const chunkJoke = () => {
    axios.get("http://api.icndb.com/jokes/random")
    .then(res => {
        const joke = res.data.value.joke;

        const params = {
            emoji_icon: ":laughing:"
        }
    
        bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
    })
}

// Crack yomomma joke
const yomommajoke = () => {
    axios.get("https://api.yomomma.info")
    .then(res => {
        const joke = res.data.joke;

        const params = {
            emoji_icon: ":laughing:"
        }
    
        bot.postMessageToChannel('general', `Yo Mama: ${joke}`, params);
    })
}

// Crack a random joke
const randomjoke = () => {
    const rand = Math.floor(Math.random() * 2) + 1;

    if (rand === 1) {
        chunkJoke()
    } else if (rand === 2) {
        yomommajoke()
    }
}

// Show a help message
const runHelp = () => {
    const params = {
        emoji_icon: ":question:"
    }

    bot.postMessageToChannel(
        "general",
        `Type @jokebot followed by either 'chunknorris', 'yomama' or 'random' to get funny jokes`,
        params
    )
}
