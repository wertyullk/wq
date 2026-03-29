const { Bot } = require("grammy");

// Проверка наличия токена
const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("❌ ОШИБКА: Токен не найден! Проверь Secrets на GitHub.");
  process.exit(1);
}

const bot = new Bot(token);

// Пример простой команды
bot.command("start", (ctx) => ctx.reply("🚀 Бот успешно запущен через GitHub Actions!"));

// Обработка ошибок, чтобы бот не вылетал
bot.catch((err) => {
  console.error("⚠️ Ошибка в работе бота:", err);
});

async function startup() {
  console.log("⏳ Подключение к Telegram...");
  try {
    // drop_pending_updates: true помогает избежать ошибки 404/конфликтов вебхуков
    await bot.start({
      drop_pending_updates: true,
      onStart: (info) => console.log(`✅ БОТ ЗАПУЩЕН! Имя: @${info.username}`),
    });
  } catch (error) {
    console.error("❌ КРИТИЧЕСКАЯ ОШИБКА:", error.message);
    process.exit(1);
  }
}

startup();
