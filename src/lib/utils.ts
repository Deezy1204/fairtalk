import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts "HH:MM" and "AM/PM" to minutes from start of day (0-1439)
 */
export const timeToMinutes = (timeStr: string, period: string) => {
  if (!timeStr) return 0;
  let [h, m] = timeStr.split(':').map(Number);
  const p = period.toUpperCase();
  
  if (p === 'PM' && h !== 12) h += 12;
  if (p === 'AM' && h === 12) h = 0;
  
  return h * 60 + (m || 0);
};

/**
 * Calculates duration between two times in "Xh Ym" format
 */
export const calculateDuration = (startTime: string, startPeriod: string, endTime: string, endPeriod: string) => {
  let start = timeToMinutes(startTime, startPeriod);
  let end = timeToMinutes(endTime, endPeriod);
  
  if (end < start) end += 24 * 60; // Crosses midnight
  
  const diff = end - start;
  const hours = Math.floor(diff / 60);
  const mins = diff % 60;
  
  return `${hours}h ${mins}m`;
};

const DAYS_MAP: Record<string, number> = {
  'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6
};

function getDaysFromShow(show: any): string[] {
  if (show.days && Array.isArray(show.days) && show.days.length > 0) return show.days;
  if (!show.time) return [];
  const parts = show.time.split(' | ');
  if (parts.length > 0) {
    const dStr = parts[0];
    if (dStr.includes('Everyday')) return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return dStr.split(',').map((s: string) => s.trim());
  }
  return [];
}

/**
 * Accurately determines the current playing show and next upcoming show
 * for a specific station, taking days and midnight boundaries into account.
 */
export const getScheduleState = (dbShows: any[], stationId: string) => {
  const now = new Date();
  const currentWeekMins = now.getDay() * 24 * 60 + now.getHours() * 60 + now.getMinutes();

  const stationShows = dbShows.filter(s => s.station === stationId);
  const instances: any[] = [];

  stationShows.forEach(show => {
    const days = getDaysFromShow(show);
    const startMinsDaily = timeToMinutes(show.startTime || '00:00', show.startPeriod || 'AM');
    const endMinsDaily = timeToMinutes(show.endTime || '00:00', show.endPeriod || 'AM');
    
    let duration = endMinsDaily - startMinsDaily;
    if (duration <= 0) duration += 24 * 60; // Show crosses midnight (e.g. 10PM to 2AM)

    days.forEach(dayStr => {
      const dayIndex = DAYS_MAP[dayStr];
      if (dayIndex !== undefined) {
        let startWeekMins = dayIndex * 24 * 60 + startMinsDaily;
        let endWeekMins = startWeekMins + duration;
        
        // Push original timeframe
        instances.push({ ...show, startWeekMins, endWeekMins, originalDay: dayStr });
        // Push future timeframe (next week handling wraparounds over Sunday midnight)
        instances.push({ ...show, startWeekMins: startWeekMins + 7 * 24 * 60, endWeekMins: endWeekMins + 7 * 24 * 60, originalDay: dayStr });
        // Push past timeframe (previous week handling wraparounds from Saturday)
        instances.push({ ...show, startWeekMins: startWeekMins - 7 * 24 * 60, endWeekMins: endWeekMins - 7 * 24 * 60, originalDay: dayStr });
      }
    });
  });

  instances.sort((a, b) => a.startWeekMins - b.startWeekMins);

  const currentShow = instances.find(inst => currentWeekMins >= inst.startWeekMins && currentWeekMins < inst.endWeekMins) || null;
  
  let nextShow = null;
  if (currentShow) {
    nextShow = instances.find(inst => inst.startWeekMins >= currentShow.endWeekMins) || null;
  } else {
    nextShow = instances.find(inst => inst.startWeekMins > currentWeekMins) || null;
  }

  // Optional: For the generic show listing, just sort ascending strictly by time of day
  const sortedShows = stationShows.sort((a, b) => {
    const aMins = timeToMinutes(a.startTime || '00:00', a.startPeriod || 'AM');
    const bMins = timeToMinutes(b.startTime || '00:00', b.startPeriod || 'AM');
    return aMins - bMins;
  });

  return {
    shows: sortedShows,
    currentShow: currentShow,
    nextShow: nextShow
  };
};
