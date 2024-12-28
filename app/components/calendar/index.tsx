import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isToday, isSameDay } from 'date-fns';
import { CalendarWrapper, Header, MonthYear, Button, DaysWrapper, DayLabel, DateGrid, DateCell } from './styling';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const events = [
    new Date(2024, 11, 4),
    new Date(2024, 11, 9),
    new Date(2024, 11, 13),
    new Date(2024, 11, 20),
  ];

  const startDay = startOfWeek(startOfMonth(currentMonth));
  const endDay = endOfWeek(endOfMonth(currentMonth));

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDateClick = (day: Date) => setSelectedDate(day);

  const renderDays = () => {
    const days = [];
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    for (let i = 0; i < 7; i++) {
      days.push(<DayLabel key={i}>{daysOfWeek[i]}</DayLabel>);
    }
    return days;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        days.push(
          <DateCell
            key={day.toISOString()}
            isToday={isToday(day)}
            isSelected={isSameDay(day, selectedDate)}
            isEvent={events.some((event) => isSameDay(day, event))}
            isDisabled={!isSameMonth(day, currentMonth)}
            onClick={() => handleDateClick(cloneDay)}
          >
            {format(day, 'd')}
          </DateCell>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <React.Fragment key={days[0].key}>
          {days}
        </React.Fragment>
      );
      days = [];
    }
    return rows;
  };

  return (
    <CalendarWrapper>
      <Header>
        <Button onClick={handlePrevMonth}>
          <ChevronLeft size={20} />
        </Button>
        <MonthYear>{format(currentMonth, 'MMMM yyyy')}</MonthYear>
        <Button onClick={handleNextMonth}>
          <ChevronRight size={20} />
        </Button>
      </Header>
      <DaysWrapper>{renderDays()}</DaysWrapper>
      <DateGrid>{renderCells()}</DateGrid>
    </CalendarWrapper>
  );
};

export default Calendar;
