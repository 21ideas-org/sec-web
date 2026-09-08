// Единственное место, где живут несекретные постоянные сайта.

export const SITE_TITLE = 'sec_₿';
export const SITE_NAME = 'Bitcoin Security Watcher';
export const SITE_DESCRIPTION = 'Критические оповещения для биткоинеров';
export const SITE_URL = 'https://sec.21ideas.org';

export const TELEGRAM_URL = 'https://t.me/';

// Поддержка. Реквизиты живут ТОЛЬКО здесь и показываются ТОЛЬКО на /support.
// В оповещении стоит ссылка на страницу, а не адрес: пост вида «🚨 срочно
// обновитесь» с платёжным реквизитом рядом — структурно тот же паттерн, от
// которого канал защищает, и подмену адреса в таком посте читатель не заметит.
export const SUPPORT_ONCHAIN = 'bc1q805dq3u6t76nd5av3jdln0vy6zxt4y5djem4s5';
export const SUPPORT_LN_ADDRESS = 'tony_lightning@coinos.io';
