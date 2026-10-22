import { ref, computed, watch } from 'vue';

// DATA AWAL (Initial State): Dimulai dari array kosong untuk menguji Empty State
const defaultEvents = [];

// Helper untuk memastikan format tahun hanya 4 digit (misal: 112020 -> 2020)
const sanitizeEventDate = (dt) => {
  if (!dt || typeof dt !== 'string') return dt;
  // Jika tahun memiliki lebih dari 4 digit (misal: 112020-11-20...), jadikan 4 digit terakhir
  let cleaned = dt.replace(/^(\d+)(\d{4})-/, (m, p1, p2) => p2 + '-');
  cleaned = cleaned.replace(/\b\d+(\d{4})\b/g, (match, p1) => (match.length > 4 ? p1 : match));

  // Jika string berbentuk ISO atau datetime-local (mengandung 'T'), format agar seragam
  if (cleaned.includes('T')) {
    const dateObj = new Date(cleaned);
    if (!isNaN(dateObj.getTime())) {
      const datePart = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      const timePart = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      return `${datePart} • ${timePart}`;
    }
  }
  return cleaned;
};

// SINGLE SOURCE OF TRUTH (Diletakkan di luar fungsi agar shared/singleton)
const savedData = localStorage.getItem('gatherly_events');
const parsedData = savedData ? JSON.parse(savedData) : defaultEvents;
const initialEvents = Array.isArray(parsedData)
  ? parsedData.map(e => ({ ...e, date: sanitizeEventDate(e.date) }))
  : defaultEvents;
const events = ref(initialEvents);

// WATCHERS (Side Effect: Menyimpan ke localStorage setiap kali state events berubah)
watch(
  events,
  (newEvents) => {
    localStorage.setItem('gatherly_events', JSON.stringify(newEvents));
  },
  { deep: true }
);

export function useEvents() {
  // DERIVED STATE (Dihitung otomatis menggunakan computed)
  const totalEvents = computed(() => events.value.length);
  const activeEvents = computed(() => events.value.filter(e => !e.done));
  const completedEvents = computed(() => events.value.filter(e => e.done));

  // MUTASI STATE: TAMBAH DATA (Create)
  const createEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      title: eventData.title,
      date: sanitizeEventDate(eventData.date),
      loc: eventData.loc.startsWith('📍 ') ? eventData.loc : `📍 ${eventData.loc}`,
      cat: eventData.cat,
      quota: Number(eventData.quota) || 100,
      price: eventData.price || 'Free',
      desc: eventData.desc,
      done: false
    };
    events.value.unshift(newEvent);
    return newEvent;
  };

  // MUTASI STATE: UBAH STATUS (Toggle/Mark as Completed)
  const completeEvent = (id) => {
    const target = events.value.find(e => e.id === Number(id));
    if (target) {
      target.done = true;
    }
  };

  // MUTASI STATE: HAPUS DATA (Delete)
  const deleteEvent = (id) => {
    const index = events.value.findIndex(e => e.id === Number(id));
    if (index !== -1) {
      events.value.splice(index, 1);
    }
  };

  // PENCARIAN DATA BERDASARKAN ID
  const getEventById = (id) => {
    return events.value.find(e => e.id === Number(id));
  };

  // FUNGSI RESET DATA (Opsional untuk pengujian praktikum)
  const clearAllEvents = () => {
    events.value = [];
    localStorage.removeItem('gatherly_events');
  };

  return {
    events,
    totalEvents,
    activeEvents,
    completedEvents,
    createEvent,
    completeEvent,
    deleteEvent,
    getEventById,
    clearAllEvents
  };
}