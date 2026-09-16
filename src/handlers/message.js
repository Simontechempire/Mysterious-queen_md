import config from '../config/config.js';

export async function handleMessage(sock, message) {
  if (!message?.message) return;

  const text =
    message.message.conversation ||
    message.message.extendedTextMessage?.text ||
    '';

  if (!text.startsWith(config.prefix)) return;

  const args = text
    .slice(config.prefix.length)
    .trim()
    .split(/\s+/);

  const command = args.shift()?.toLowerCase();

  if (!command) return;

  console.log(`📩 Command: ${config.prefix}${command}`);

  switch (command) {
    case 'ping':
      await sock.sendMessage(message.key.remoteJid, {
        text: '🏓 Pong!\n\n👑 MYSTERIOUS QUEEN MD'
      });
      break;

    case 'menu':
    case 'help':
      await sock.sendMessage(message.key.remoteJid, {
        text: `╭━━━━━━━━━━━━━━━━━━━━╮
      👑 MYSTERIOUS QUEEN MD
╰━━━━━━━━━━━━━━━━━━━━╯

📋 MAIN MENU

👑 Owner
🛡️ Moderator
👥 Group
🤖 AI
🎮 Games
😂 Fun
🎨 Sticker
🎬 Media
📥 Downloader
🛠️ Tools
🔎 Search
⚙️ Utility
ℹ️ Info

Prefix: ${config.prefix}

Type ${config.prefix}ping to test the bot.`
      });
      break;

    default:
      await sock.sendMessage(message.key.remoteJid, {
        text: `❌ Command not found: ${config.prefix}${command}\n\nType ${config.prefix}menu`
      });
  }
}
