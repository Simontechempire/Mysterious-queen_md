import 'dotenv/config';
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from '@whiskeysockets/baileys';
import P from 'pino';

const BOT_NAME = process.env.BOT_NAME || 'MYSTERIOUS QUEEN MD';
const PREFIX = process.env.PREFIX || '.';

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./sessions');

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: P({ level: 'silent' }),
    browser: [BOT_NAME, 'Chrome', '1.0.0']
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'open') {
      console.log(`
╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
      👑 ${BOT_NAME}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

✅ WhatsApp Connected
⚡ Prefix: ${PREFIX}
🚀 Bot is running...
`);
    }

    if (connection === 'close') {
      const statusCode =
        lastDisconnect?.error?.output?.statusCode;

      if (statusCode !== DisconnectReason.loggedOut) {
        console.log('🔄 Connection closed. Reconnecting...');
        startBot();
      } else {
        console.log('❌ WhatsApp session logged out.');
      }
    }

    if (connection === 'connecting') {
      console.log('🔌 Connecting to WhatsApp...');
    }
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const message = messages[0];

    if (!message?.message) return;

    const text =
      message.message.conversation ||
      message.message.extendedTextMessage?.text ||
      '';

    if (!text.startsWith(PREFIX)) return;

    const command = text
      .slice(PREFIX.length)
      .trim()
      .split(/\s+/)[0]
      .toLowerCase();

    console.log(`📩 Command received: ${PREFIX}${command}`);
  });
}

startBot().catch((error) => {
  console.error('❌ Bot startup error:', error);
});
