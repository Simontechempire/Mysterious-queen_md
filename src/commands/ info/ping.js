export const name = 'ping';

export async function execute(sock, message) {
  const start = Date.now();

  await sock.sendMessage(message.key.remoteJid, {
    text: '🏓 𝗣𝗢𝗡𝗚!'
  });

  const latency = Date.now() - start;

  await sock.sendMessage(message.key.remoteJid, {
    text: `⚡ 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘: ${latency}ms\n👑 𝗠𝗬𝗦𝗧𝗘𝗥𝗜𝗢𝗨𝗦 𝗤𝗨𝗘𝗘𝗡 𝗠𝗗`
  });
}
