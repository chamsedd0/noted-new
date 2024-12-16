"use client";

import NotificationCardComponent from "@/app/components/cards/notificationCard";
import ScheduleCardComponent from "@/app/components/cards/todayScheduleCard";
import { useEffect, useState } from "react";
import globalStore from "@/app/(user-area)/_store";
import { Event } from "@/types/Event";
import {
  NotifSidebar,
  NotificationSection,
  DateNavigation,
  NavigationButton,
  AnimatedScheduleSection,
  EventsContainer,
  EmptyMessage,
} from "./styles";

const formatDayDisplay = (date: Date): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return `${date.toLocaleDateString("en-US", {
    weekday: "long",
  })} ${date.getDate()} . ${date.getMonth() + 1}`;
};

const getDayCode = (date: Date): string => {
  return date
    .toLocaleDateString("en-US", { weekday: "long" })
    .slice(0, 3)
    .toUpperCase();
};

function sortEvents(events: Event[]): Event[] {
  return events.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    return a.finish - b.finish;
  });
}

const SideBarComponent = ({ page }: { page: string }) => {
  const { events } = globalStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isNavigating, setIsNavigating] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [sectionsState, setSectionsState] = useState({
    deadlines: true,
    schedule: true
  });

  const navigateDay = (direction: "prev" | "next") => {
    setIsNavigating(true);
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
      return newDate;
    });
    setTimeout(() => setIsNavigating(false), 150);
  };

  useEffect(() => {
    const dayCode = getDayCode(selectedDate);
    const dayEvents = events.filter((event) => event.day === dayCode);
    setFilteredEvents(sortEvents(dayEvents));
  }, [selectedDate, events]);

  const toggleSection = (section: 'deadlines' | 'schedule') => {
    setSectionsState(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <NotifSidebar $isProfile={page === "profile"}>
      <NotificationSection $isOpen={sectionsState.deadlines}>
        <h3 onClick={() => toggleSection('deadlines')}>
          Deadlines
          <img src="/upcoming.svg" alt="upcoming" />
          <img 
            src="/vector.svg" 
            alt="toggle" 
            className="toggle-icon"
          />
        </h3>
        <div className="content">
          <NotificationCardComponent
            title="Deadline Upcoming!"
            message="You need to submit your homework for cmpe 371"
            timestamp="21/10/2024"
          />
        </div>
      </NotificationSection>

      <AnimatedScheduleSection $isOpen={sectionsState.schedule}>
        <h3 onClick={() => toggleSection('schedule')}>
          Schedule
          <img src="/schedule.svg" alt="Schedule icon" />
          <img 
            src="/vector.svg" 
            alt="toggle" 
            className="toggle-icon"
          />
        </h3>
        <div className="content">
          <DateNavigation>
            <NavigationButton onClick={() => navigateDay("prev")}>
              <img src="/left-arrow.svg" alt="Previous day" />
            </NavigationButton>
            <span>{formatDayDisplay(selectedDate)}</span>
            <NavigationButton onClick={() => navigateDay("next")}>
              <img src="/right-arrow.svg" alt="Next day" />
            </NavigationButton>
          </DateNavigation>

          <EventsContainer isChanging={isNavigating}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <ScheduleCardComponent
                  key={`${event.title}-${event.start}-${index}`}
                  title={event.title}
                  timestamp={`${event.start}${
                    event.start <= 12 ? "AM" : "PM"
                  } - ${event.finish}${event.finish <= 12 ? "AM" : "PM"}`}
                  color={event.color}
                />
              ))
            ) : (
              <EmptyMessage>No events scheduled for this day</EmptyMessage>
            )}
          </EventsContainer>
        </div>
      </AnimatedScheduleSection>
    </NotifSidebar>
  );
};

export default SideBarComponent;
