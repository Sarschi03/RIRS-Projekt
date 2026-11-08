import { useEffect, useState } from 'react';

const timeZone = 'Europe/Ljubljana';
const labelFormatter = new Intl.DateTimeFormat('sl-SI', { timeZone, weekday:'long', day:'numeric', month:'long' });
const partsFormatter = new Intl.DateTimeFormat('en', { timeZone, year:'numeric',month:'2-digit',day:'2-digit' });

export function formatToday(date: Date) {
  const text = labelFormatter.format(date);
  const parts = partsFormatter.formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find(item=>item.type===type)?.value || '';
  return { label:text.charAt(0).toLocaleUpperCase('sl-SI')+text.slice(1), dateTime:`${part('year')}-${part('month')}-${part('day')}` };
}

export default function useToday() {
  const [date,setDate] = useState(()=>new Date());
  useEffect(()=>{
    let timer: number;
    const refresh = () => setDate(new Date());
    const schedule = () => { timer = window.setTimeout(()=>{refresh();schedule();},60000-Date.now()%60000); };
    const onVisibility = () => { if(!document.hidden) refresh(); };
    schedule();
    window.addEventListener('focus',refresh);
    document.addEventListener('visibilitychange',onVisibility);
    return () => {window.clearTimeout(timer);window.removeEventListener('focus',refresh);document.removeEventListener('visibilitychange',onVisibility);};
  },[]);
  return formatToday(date);
}
