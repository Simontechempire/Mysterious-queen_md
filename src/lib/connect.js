import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from '@whiskeysockets/baileys';
import P from 'pino';

const SESSION_DIR = './sessions';

export async function connectWhatsApp() {
  const { state, saveCreds } =
    await useMultiFileAuthState(SESSION_DIR);

  const sock = makeWASocket({
    auth: state,
    logger: P({ level: 'silent' }),
    printQRInTerminal: false,
    browser: ['MYSTERIOUS QUEEN MD', 'Chrome', '1.0.0']
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'open') {
      console.log('╭━━━━━━━━━━━━━━━━━━━━━━╮');
      console.log('   👑 MYSTERIOUS QUEEN MD');
      console.log('╰━━━━━━━━━━━━━━━━━━━━━━╯');
      console.log('✅ WhatsApp connected');
    }

    if (connection === 'close') {
      const statusCode =
        lastDisconnect?.error?.output?.statusCode;

      if (statusCode !== DisconnectReason.loggedOut) {
        console.log('🔄 Reconnecting WhatsApp...');
        connectWhatsApp();
      } else {
        console.log('❌ WhatsApp session logged out.');
      }
    }
  });

  return sock;
}
