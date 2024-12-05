"use client";

import styled from "styled-components";
import NotificationCardComponent from "@/app/components/cards/notificationCard";
import ScheduleCardComponent from "@/app/components/cards/todayScheduleCard";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getTodayEvents } from "@/app/_actions/events";
import { Event } from "@/types/Event";
import { User } from "firebase/auth";

const NotifSidebar = styled.div<{ $isProfile?: boolean }>`
  position: fixed;
  max-height: 80vh;
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

  scrollbar-color: transparent transparent !important;
  scrollbar-width: thin !important;
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

function sortEvents(events: Event[]): Event[] {
  const dayOrder = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return events.sort((a, b) => {
    const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return a.start - b.start;
  });
}

interface SideBarProps {
  page?: string;
}

const SideBarComponent = ({ page }: SideBarProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const auth = getAuth();

  useEffect(() => {
    const today = new Date();
    const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
    const todayDate = dayName.slice(0, 3).toUpperCase();

    const fetchUserData = async () => {
      if (user?.uid) {
        const todayEvents = await getTodayEvents(user.uid, todayDate);
        setEvents(sortEvents(todayEvents));
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if (user) {
      fetchUserData();
    }

    return () => unsubscribe();
  }, [auth, user]);

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

      <ScheduleSection>
        <h3>
          Schedule
          <img src="/schedule.svg" alt="Schedule icon" />
        </h3>
        <span>Today</span>

        {events.map((event) => (
          <ScheduleCardComponent
            key={`${event.title}-${event.start}`}
            title={event.title}
            timestamp={`${event.start}${event.start <= 12 ? "AM" : "PM"} - ${
              event.finish
            }${event.finish <= 12 ? "AM" : "PM"}`}
            color={event.color}
          />
        ))}
      </ScheduleSection>
    </NotifSidebar>
  );
};

export default SideBarComponent;
