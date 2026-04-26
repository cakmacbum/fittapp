import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  isToday, 
  getDay 
} from 'date-fns';
import { tr } from 'date-fns/locale';

interface WorkoutCalendarProps {
  activeDates?: Date[];
}

export default function WorkoutCalendar({ activeDates = [] }: WorkoutCalendarProps) {
  const [currentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const startDay = getDay(monthStart); // 0 = Sunday, 1 = Monday
  // Adjust to start on Monday
  const paddingDays = startDay === 0 ? 6 : startDay - 1; 

  const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  const isActiveDay = (date: Date) => {
    return activeDates.some(activeDate => isSameDay(activeDate, date));
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 capitalize">
          {format(currentDate, 'MMMM yyyy', { locale: tr })}
        </h3>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-bold text-slate-400">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: paddingDays }).map((_, i) => (
          <div key={`padding-${i}`} className="h-10" />
        ))}
        {daysInMonth.map(date => {
          const isActive = isActiveDay(date);
          const isCurrentDay = isToday(date);
          
          return (
            <button
              key={date.toString()}
              onClick={() => setSelectedDay(date)}
              className={`h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-colors
                ${isCurrentDay ? 'border-2 border-blue-600' : ''}
                ${isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-600 hover:bg-slate-100'}
              `}
            >
              {format(date, 'd')}
            </button>
          );
        })}
      </div>

      {selectedDay && isActiveDay(selectedDay) && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-sm font-bold text-blue-800">
            {format(selectedDay, 'd MMMM', { locale: tr })} Antrenmanı
          </p>
          <p className="text-xs text-blue-600 mt-1">İtme Günü (Push) - Hacim: 4500kg</p>
        </div>
      )}
    </div>
  );
}
