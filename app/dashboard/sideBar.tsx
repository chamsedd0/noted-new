"use client";

import styled from "styled-components";
import NotificationCardComponent from "@/app/components/cards/notificationCard";
import ScheduleCardComponent from "@/app/components/cards/todayScheduleCard";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Event } from "@/types/Event";
import { User } from "firebase/auth";
import { Course } from '@/types/Course';
import { getUserCourses } from "./_actions/courseActions";

const NotifSidebar = styled.div<{ $isProfile?: boolean }>`
  position: fixed;
  max-height: 77.5vh;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  width: 300px;
  top: 110px;
  right: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 1430px) {
    display: ${({ $isProfile }) => ($isProfile ? "none" : "flex")};
  }

  @media (max-width: 1200px) {
    width: 250px;
  }

  @media (max-width: 1100px) {
    display: none;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

// Notification section
const NotificationSection = styled.div`
  width: 100%;

  h3 {
    color: #fff;
    font-size: 24px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    img {
      width: 24px;
      height: 24px;
    }
  }

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 10px;
`;

// Schedule section
const ScheduleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 10px;

  h3 {
    color: #fff;
    font-size: 24px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    img {
      width: 24px;
      height: 24px;
    }
  }
  span {
    color: white;
    font-size: 20px;
    font-weight: 700;
  }
`;

// Add these helper functions
const formatDayDisplay = (date: Date): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

  return `${date.toLocaleDateString('en-US', { weekday: 'long' })} ${date.getDate()} . ${date.getMonth() + 1}`;
};

const getDayCode = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'long' }).slice(0, 3).toUpperCase();
};

function sortEvents(events: Event[]): Event[] {
  const dayOrder = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return events.sort((a, b) => {
    const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return a.start - b.start;
  });
}

// Add this function to convert courses to events
const convertCoursesToEvents = (courses: Course[]): Event[] => {
  const events: Event[] = [];
  courses.forEach(course => {
    course.timeSlots?.forEach(slot => {
      events.push({
        title: course.title,
        day: slot.day,
        start: slot.start,
        finish: slot.finish,
        color: course.color
      });
    });
  });
  return events;
};

interface SideBarProps {
  page?: string;
}

// Add new styled components for animations
const AnimatedScheduleSection = styled(ScheduleSection)`
  transition: opacity 0.3s ease;
`;

const EventsContainer = styled.div<{ isChanging: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  opacity: ${props => props.isChanging ? 0 : 1};
  transition: opacity 0.3s ease;
`;

// Add a new styled component for the empty message
const EmptyMessage = styled.p`
  color: #BCBCBC;
  font-size: 14px;
  text-align: center;
  width: 100%;
  padding: 20px 0;
`;

// Update the component
const SideBarComponent = ({ page }: SideBarProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const auth = getAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isNavigating, setIsNavigating] = useState(false);

  // Update data without animation
  const updateData = async () => {
    if (user?.uid) {
      const userCourses = await getUserCourses(user.uid);
      setCourses(userCourses);
      
      const dayCode = getDayCode(selectedDate);
      const allEvents = convertCoursesToEvents(userCourses);
      const filteredEvents = allEvents.filter(event => event.day === dayCode);
      setEvents(sortEvents(filteredEvents));
    }
  };

  // Handle auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  // Set up polling
  useEffect(() => {
    if (user) {
      // Initial fetch
      updateData();

      // Set up interval for polling
      const interval = setInterval(updateData, 5000); // Poll every 5 seconds

      // Cleanup interval on unmount or user change
      return () => clearInterval(interval);
    }
  }, [user, selectedDate]);

  // Navigate with animation
  const navigateDay = (direction: 'prev' | 'next') => {
    setIsNavigating(true);
    setSelectedDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
    
    // Update data and remove animation after transition
    updateData().then(() => {
      setTimeout(() => setIsNavigating(false), 150);
    });
  };

  return (
    <NotifSidebar $isProfile={page === "profile"}>
      <NotificationSection>
        <h3>
          Deadlines
          <img src="/upcoming.svg"></img>
        </h3>

        <NotificationCardComponent
          title="Deadline Upcoming!"
          message="You need to submit your homework for cmpe 371"
          timestamp="21/10/2024"
        />
      </NotificationSection>

      <AnimatedScheduleSection>
        <h3>
          Schedule
          <img src="/schedule.svg" alt="Schedule icon" />
        </h3>
        <DateNavigation>
          <NavigationButton onClick={() => navigateDay('prev')}>
            <img src="/left-arrow.svg" alt="Previous day" />
          </NavigationButton>
          <span>{formatDayDisplay(selectedDate)}</span>
          <NavigationButton onClick={() => navigateDay('next')}>
            <img src="/right-arrow.svg" alt="Next day" />
          </NavigationButton>
        </DateNavigation>

        <EventsContainer isChanging={isNavigating}>
          {events.length > 0 ? (
            events.map((event) => (
              <ScheduleCardComponent
                key={`${event.title}-${event.start}`}
                title={event.title}
                timestamp={`${event.start}${event.start <= 12 ? "AM" : "PM"} - ${
                  event.finish
                }${event.finish <= 12 ? "AM" : "PM"}`}
                color={event.color}
              />
            ))
          ) : (
            <EmptyMessage>No events scheduled for this day</EmptyMessage>
          )}
        </EventsContainer>
      </AnimatedScheduleSection>
    </NotifSidebar>
  );
};

// Add these styled components
const DateNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;

  span {
    font-size: 16px;
    color: white;
  }
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  img {
    width: 16px;
    height: 16px;
  }
`;

export default SideBarComponent;
