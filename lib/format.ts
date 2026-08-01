// 日付を「8/1(土) 14:00」の形式で表示する（STEP 11）
const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function formatEventDate(iso: string): string {
  const d = new Date(iso);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const w = WEEKDAYS[d.getDay()];
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${m}/${day}(${w}) ${hh}:${mm}`;
}

// 過去のイベントかどうか
export function isPast(iso: string): boolean {
  return new Date(iso).getTime() < Date.now();
}
