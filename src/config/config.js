const config = {
  botName: process.env.BOT_NAME || 'MYSTERIOUS QUEEN MD',
  prefix: process.env.PREFIX || '.',
  ownerNumber: process.env.OWNER_NUMBER || '',
  ownerName: process.env.OWNER_NAME || 'Simon Tech',

  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN || ''
  },

  server: {
    port: Number(process.env.PORT) || 3000,
    environment: process.env.NODE_ENV || 'development'
  }
};

export default config;
