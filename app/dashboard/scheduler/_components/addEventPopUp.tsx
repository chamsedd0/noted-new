"use client";

import { Event } from "@/types/Event";
import { colors, weekdays } from "@/app/utils/constants";
import globalStore from "@/app/dashboard/_store";
import PopUpInput from "./popUpInput";
import PopUpTimeSelect from "./popUpTimeSelect";
import { PopUpCheckBox } from "./popCheckBox";
import {
  BlackenScreen,
  ModalContainer,
  ModalHeader,
  CloseButton,
  Settings,
  InputContainer,
  TimeSelectContainer,
  SaveButton,
  WeekdayOptions,
  WeekdayButton,
  ColorOptions,
  ColorCircle,
} from "./_styles/addEventPopUp";

interface TimeSlot {
  day: string;
  start: number;
  finish: number;
}

interface SchedulerState {
  addPopupOpened: boolean;
  activeDays: string[];
  selectedColor: string;
  newEventTitle: string;
  timeSlots: TimeSlot[];
  error: boolean;
  notify: boolean;
}

interface AddEventModalProps {
  state: SchedulerState;
  updateState: (updates: Partial<SchedulerState>) => void;
  onClose: () => void;
}

export default function AddEventModal({
  state,
  updateState,
  onClose,
}: AddEventModalProps) {
  const { events, addEvent } = globalStore();

  const handleDayClick = (day: string) => {
    if (state.activeDays.includes(day)) {
      updateState({
        activeDays: state.activeDays.filter((activeDay) => activeDay !== day),
        timeSlots: state.timeSlots.filter((slot) => slot.day !== day),
      });
    } else {
      updateState({
        activeDays: [...state.activeDays, day],
      });
    }
  };

  const handleSave = async () => {
    if (!state.newEventTitle.trim()) {
      updateState({ error: true });
      return;
    }

    if (state.timeSlots.length === 0) {
      alert("Please select at least one time slot");
      return;
    }

    try {
      // Create events for each time slot
      for (const slot of state.timeSlots) {
        const newEvent: Event = {
          uid: crypto.randomUUID(),
          title: state.newEventTitle.trim(),
          day: slot.day,
          start: slot.start,
          finish: slot.finish,
          color: state.selectedColor,
          type: "activity",
        };

        await addEvent(newEvent);
      }

      // Reset form and close modal
      updateState({
        newEventTitle: "",
        activeDays: [],
        timeSlots: [],
        error: false,
        notify: false,
        addPopupOpened: false, // Close modal through state
      });
    } catch (error) {
      alert(
        `Failed to add event: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <BlackenScreen $popupOpened={state.addPopupOpened} onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>
            <img src="/addEventWhite.svg" alt="Add Event" />
            Add Event
          </h2>
          <CloseButton onClick={onClose}>
            <img src="/close.svg" alt="Close" />
          </CloseButton>
        </ModalHeader>

        <InputContainer>
          <PopUpInput
            title="Title"
            placeHolder="Event Title"
            type="text"
            error={state.error}
            value={state.newEventTitle}
            setVariable={(value) =>
              updateState({ newEventTitle: value, error: false })
            }
          />
        </InputContainer>

        <Settings>
          <div>
            <span>Weekday</span>
            <WeekdayOptions>
              {weekdays.map((day) => (
                <WeekdayButton
                  key={day}
                  $active={state.activeDays.includes(day)}
                  onClick={() => handleDayClick(day)}
                >
                  {day.charAt(0)}
                </WeekdayButton>
              ))}
            </WeekdayOptions>
          </div>

          <div>
            <span>Color</span>
            <ColorOptions>
              {colors.map((color) => (
                <ColorCircle
                  key={color}
                  $color={color}
                  $selected={color === state.selectedColor}
                  onClick={() => updateState({ selectedColor: color })}
                />
              ))}
            </ColorOptions>
          </div>
        </Settings>

        <PopUpCheckBox
          title="Notify"
          message="Notify me before the event"
          onChange={(value) => updateState({ notify: value })}
        />

        <TimeSelectContainer>
          {state.activeDays.map((activeDay, index) => (
            <PopUpTimeSelect
              key={index}
              title={activeDay}
              timeSlots={state.timeSlots}
              setTimeSlots={(slots) => updateState({ timeSlots: slots })}
              existingEvents={events}
            />
          ))}
        </TimeSelectContainer>

        <SaveButton onClick={handleSave}>Add Event</SaveButton>
      </ModalContainer>
    </BlackenScreen>
  );
}
