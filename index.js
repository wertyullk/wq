const { Bot, InlineKeyboard } = require('grammy');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const crypto = require('crypto');
const http = require('http');

const TOKEN = '';
const bot = new Bot("TOKEN");

const db = new sqlite3.Database(path.join(__dirname, 'nexus.db'));
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, trial_used INTEGER DEFAULT 0)');

bot.on("message", async (ctx) => {
    const kb = new InlineKeyboard()
        .text("🎁 ПОЛУЧИТЬ ТРИАЛ", "trial").row()
        .text("🔑 МОЙ КЛЮЧ", "get_key");
    
    await ctx.reply("🌌 **NEXUS VPN GLOBAL**\nРаботает 24/7", {
        parse_mode: "Markdown",
        reply_markup: kb
    });
});

bot.callbackQuery("get_key", async (ctx) => {
    const uuid = crypto.randomUUID();
    const key = "vless://" + uuid + "@91.211.88.1:443?security=reality&sni=google.com&fp=chrome&type=grpc#Nexus_" + ctx.from.id;
    await ctx.reply("✅ Твой ключ:\n\n" + key + "", { parse_mode: "Markdown" });
    await ctx.answerCallbackQuery();
});

// Заглушка для порта Hugging Face (обязательно!)
http.createServer((req, res) => { res.write('Bot is running!'); res.end(); }).listen(7860);

bot.start();
console.log("Бот запущен!");
