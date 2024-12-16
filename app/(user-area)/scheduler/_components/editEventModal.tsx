"use client";

import { useState, useEffect } from "react";
import { Event } from "@/types/Event";
import InputComponent from "@/app/components/inputs/input";
import { weekdays, colors } from "@/app/utils/constants";
import {
  BlackenScreen,
  ModalContainer,
  ModalHeader,
  CloseButton,
  ColorOptions,
  ColorCircle,
  WeekdayOptions,
  WeekdayButton,
  TimeSelectContainer,
  SaveButton,
  Settings,
  InputContainer,
  TimeWrapper,
  TimeSelect,
  ErrorMessage,
} from "./_styles/editEventModal";

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  events: Event[];
  onUpdate: (event: Event) => Promise<void>;
}

const EditEventModal: React.FC<EditEventModalProps> = ({
  isOpen,
  onClose,
  event,
  events,
  onUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("#BE0505");
  const [selectedDay, setSelectedDay] = useState("");
  const [startTime, setStartTime] = useState<number>(7);
  const [endTime, setEndTime] = useState<number>(8);
  const [error, setError] = useState("");

  useEffect(() => {
    if (event && isOpen) {
      setTitle(event.title);
      setSelectedColor(event.color);
      setSelectedDay(event.day);
      setStartTime(event.start);
      setEndTime(event.finish);
      setError("");
    } else if (!isOpen) {
      setTitle("");
      setSelectedColor("#BE0505");
      setSelectedDay("");
      setStartTime(7);
      setEndTime(8);
      setError("");
    }
  }, [event, isOpen]);

  const checkTimeConflicts = () => {
    return events.some(
      (e) =>
        e.uid !== event?.uid &&
        e.day === selectedDay &&
        ((startTime >= e.start && startTime < e.finish) ||
          (endTime > e.start && endTime <= e.finish) ||
          (startTime <= e.start && endTime >= e.finish))
    );
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Please enter an event title");
      return;
    }

    if (!selectedDay) {
      setError("Please select a day");
      return;
    }

    if (startTime >= endTime) {
      setError("End time must be after start time");
      return;
    }

    if (checkTimeConflicts()) {
      setError("Time slot conflicts with an existing event");
      return;


      
    }

    try {
      const updatedEvent: Event = { 
        uid: event?.uid || "",
        title: title.trim(),
        day: selectedDay,
        color: selectedColor,
        start: startTime,
        finish: endTime,
        type: "activity",
      };

      await onUpdate(updatedEvent);
      onClose();
    } catch (error) {
      setError("Failed to update event");
      console.error("Error updating event:", error);
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 7; i <= 22; i++) {
      options.push(
        <option key={i} value={i}>
          {i}:00 {i < 12 ? "AM" : "PM"}
        </option>
      );
    }
    return options;
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <BlackenScreen popupOpened={isOpen} onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>
            <img src="/bookmark.svg" alt="bookmark" />
            Edit Event
          </h2>
          <CloseButton onClick={handleClose}>
            <img src="/close.svg" alt="close" />
          </CloseButton>
        </ModalHeader>

        <InputContainer>
          <InputComponent
            title="Event Title"
            placeHolder="Math Study Group"
            type="text"
            value={title}
            setVariable={setTitle}
          />
        </InputContainer>

        <Settings>
          <div>
            <span>Color</span>
            <ColorOptions>
              {colors.map((color) => (
                <ColorCircle
                  key={color}
                  color={color}
                  selected={color === selectedColor}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </ColorOptions>
          </div>

          <div>
            <span>Day</span>
            <WeekdayOptions>
              {weekdays.map((day) => (
                <WeekdayButton
                  key={day}
                  active={day === selectedDay}
                  onClick={() => setSelectedDay(day)}
                >
                  {day.charAt(0)}
                </WeekdayButton>
              ))}
            </WeekdayOptions>
          </div>
        </Settings>

        <TimeSelectContainer>
          <div>
            <span>Time</span>
            <TimeWrapper>
              <TimeSelect
                value={startTime}
                onChange={(e) => setStartTime(Number(e.target.value))}
              >
                {generateTimeOptions()}
              </TimeSelect>
              <TimeSelect
                value={endTime}
                onChange={(e) => setEndTime(Number(e.target.value))}
              >
                {generateTimeOptions()}
              </TimeSelect>
            </TimeWrapper>
          </div>
        </TimeSelectContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SaveButton onClick={handleSave}>Save Changes</SaveButton>
      </ModalContainer>
    </BlackenScreen>
  );
};

export default EditEventModal;
