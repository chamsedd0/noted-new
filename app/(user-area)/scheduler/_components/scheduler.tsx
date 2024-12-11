"use client";

import { Event } from "@/types/Event";
import {
  ScheduleWrapper,
  Grid,
  DayLabel,
  TimeLabel,
  TimeBlock,
} from "./_styles/scheduler";

interface SchedulerComponentProps {
  events: Event[];
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
  selectedEvent: string | null;
  setSelectedEvent: (value: string | null) => void;
}

const generateTimeSlots = () => {
  const times: string[] = [];
  for (let hour = 7; hour <= 22; hour++) {
    times.push(`${String(hour).padStart(2, "0")}:00`);
  }
  return times;
};

const SchedulerComponent: React.FC<SchedulerComponentProps> = ({
  events,
  isChecked,
  setIsChecked,
  selectedEvent,
  setSelectedEvent,
}) => {
  const timeSlots = generateTimeSlots();
  const dayCodes = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <ScheduleWrapper onClick={() => setSelectedEvent(null)}>
      <Grid>
        {dayCodes.map((daycode, index) => (
          <div
            key={index}
            style={{ gridColumn: index + 2 + "/" + (index + 3) }}
          >
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

        {events.map((event) => (
          <TimeBlock
            key={event.uid}
            day={dayCodes.indexOf(event.day)}
            timeStart={event.start}
            timeFinish={event.finish}
            bgColor={event.color}
            isChecked={isChecked}
            isSelected={event.uid === selectedEvent}
            onClick={(e) => {
              e.stopPropagation();
              setIsChecked(false);
              setSelectedEvent(event.uid);
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
