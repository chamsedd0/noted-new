"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Event } from "@/types/Event";
import { getSchedulerData } from "@/app/dashboard/scheduler/_actions/schedulerDataActions";

const ScheduleWrapper = styled.div`
  width: 100%;

  transition: all 0.3s ease;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(17, 42.5px);

  overflow: hidden;
  scroll-behavior: unset;

  gap: 0px; /* Spacing between cells */
  user-select: none;
`;

// Styled for day labels
const DayLabel = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: white;
  text-align: center;
  vertical-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const TimeLabel = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  vertical-align: center;
  position: relative;
  user-select: none;

  img {
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
  }
`;

// Time block
const TimeBlock = styled.div<TimeBlockProps>`
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 5px;
  margin-right: 3px;
  margin-top: 4px;
  margin-bottom: 2px;
  padding: 12px;
  text-align: center;
  color: white;
  overflow: hidden;

  background-color: ${({ bgColor }) => bgColor || "#444"};
  grid-column: ${({ day }) => day + 2};
  grid-row: ${({ timeStart, timeFinish }) =>
    timeStart - 5 + "/" + (timeFinish - 5)};
  border-radius: 8px;
  border: ${({ isChecked, isSelected }) =>
    isChecked || isSelected ? "2px solid white" : "2px solid transparent"};
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 10;

  .title {
    text-align: start;
    width: 100%;
    user-select: none;
  }

  .time {
    text-align: end;
    width: 100%;
    user-select: none;
  }

  @media (max-width: 1200px) {
    padding: 6px;
  }
`;

interface SchedulerComponentProps {
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
  selected: string | null;
  setSelected: (value: string | null) => void;
  setEventType: (value: string) => void;
}

interface TimeBlockProps {
  bgColor: string;
  day: number;
  timeStart: number;
  timeFinish: number;
  isChecked: boolean;
  isSelected: boolean;
}

const generateTimeSlots = () => {
  const times: string[] = [];
  for (let hour = 7; hour <= 22; hour++) {
    times.push(`${String(hour).padStart(2, "0")}:00`);
  }
  return times;
};

const SchedulerComponent: React.FC<SchedulerComponentProps> = ({
  isChecked,
  setIsChecked,
  selected,
  setSelected,
  setEventType,
}) => {
  const { idToken, loading } = useAuth();
  const timeSlots = generateTimeSlots();
  const dayCodes = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (loading || !idToken) return;

      const { success, data, error } = await getSchedulerData(idToken);
      if (success && data) {
        setEvents(data as Event[]);
      } else {
        console.error(error);
      }
    };

    fetchData();
  }, [idToken, loading]);

  return (
    <ScheduleWrapper onClick={() => setSelected(null)}>
      <Grid>
        {dayCodes.map((daycode, index) => (
          <div key={index} style={{ gridColumn: index + 2 + "/" + (index + 3) }}>
            <DayLabel>{daycode}</DayLabel>
            <img src="/verticalLine.svg" alt="vertical line" />
          </div>
        ))}

        {timeSlots.map((timeSlot, index) => (
          <TimeLabel
            key={index}
            style={{
              gridRow: index + 2 + "/" + (index + 3),
              gridColumn: "1 / 2",
            }}
          >
            {timeSlot} <img src="/horizontalLine.svg" alt="horizontal line" />
          </TimeLabel>
        ))}

        {events.map((event, index) => (
          <TimeBlock
            key={index}
            day={dayCodes.indexOf(event.day)}
            timeStart={event.start}
            timeFinish={event.finish}
            bgColor={event.color}
            isChecked={isChecked}
            isSelected={event.title === selected}
            onClick={(e) => {
              e.stopPropagation();
              setIsChecked(false);
              setSelected(event.title);
              setEventType(event.type);
            }}
          >
            <div className="title">{event.title}</div>
            <div className="time">
              <span>
                {event.start.toString() + (event.start <= 12 ? "AM-" : "PM-")}
              </span>
              <span>
                {event.finish.toString() + (event.finish <= 12 ? "AM" : "PM")}
              </span>
            </div>
          </TimeBlock>
        ))}
      </Grid>
    </ScheduleWrapper>
  );
};

export default SchedulerComponent;
