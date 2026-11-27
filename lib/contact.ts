// Format internasional: tanpa "+" dan tanpa 0 di depan. Contoh: 6281234567890
const WHATSAPP_NUMBER = "6285290307845";

const WHATSAPP_MESSAGE = "Halo Equityworld Futures, saya ingin berkonsultasi.";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;