"use client";

import { useState } from "react";
import globalStore from "@/app/dashboard/_store";
import { Hydrated } from "@/app/components/hydrated";
import SchedulerComponent from "@/app/dashboard/scheduler/_components/scheduler";
import Header from "@/app/dashboard/header";
import AddEventButtonComponent from "@/app/dashboard/scheduler/_components/addEventButton";
import AddEventModal from "@/app/dashboard/scheduler/_components/addEventPopUp";
import {
  CoursesLayout,
  ContentWrapper,
  SchedulerSection,
  TitleWrapper,
  Controls,
  RightBoxReplacement,
} from "./_styles/page";

interface TimeSlot {
  day: string;
  start: number;
  finish: number;
}

interface SchedulerState {
  addPopupOpened: boolean;
  editPopupOpened: boolean;
  isChecked: boolean;
  activeDays: string[];
  selectedColor: string;
  newEventTitle: string;
  timeSlots: TimeSlot[];
  error: boolean;
  notify: boolean;
}

export default function SchedulerPage() {
  const { events, deleteEvent, selectedEvent, setSelectedEvent } =
    globalStore();

  const [state, setState] = useState<SchedulerState>({
    addPopupOpened: false,
    editPopupOpened: false,
    isChecked: false,
    activeDays: [],
    selectedColor: "#BE0505",
    newEventTitle: "",
    timeSlots: [],
    error: false,
    notify: false,
  });

  const handleDeleteClick = async () => {
    if (!selectedEvent) return;
    const event = events.find((e) => e.uid === selectedEvent);
    if (!event) return;

    try {
      await deleteEvent(selectedEvent);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const updateState = (updates: Partial<SchedulerState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <Hydrated>
      <CoursesLayout>
        <Header hightlighted="scheduler" />
        <ContentWrapper>
          <SchedulerSection>
            <TitleWrapper>
              <h1>Scheduler</h1>
              <Controls
                isSelected={!selectedEvent}
                activitySelected={selectedEvent !== null}
              >
                <img
                  src="/trash.svg"
                  className="delete"
                  onClick={handleDeleteClick}
                  alt="delete"
                />
                <img
                  src="/editCourses.svg"
                  className="edit"
                  onClick={() => updateState({ editPopupOpened: true })}
                  alt="edit"
                />
                <img
                  src={
                    !state.isChecked
                      ? "/emptyCheckBox.svg"
                      : "/fullCheckBox.svg"
                  }
                  onClick={() => updateState({ isChecked: !state.isChecked })}
                  alt="checkbox"
                />
                <AddEventButtonComponent
                  action={() => updateState({ addPopupOpened: true })}
                />
              </Controls>
            </TitleWrapper>
            <SchedulerComponent
              events={events}
              isChecked={state.isChecked}
              setIsChecked={(isChecked) => updateState({ isChecked })}
              selectedEvent={selectedEvent}
              setSelectedEvent={setSelectedEvent}
            />
          </SchedulerSection>
          <RightBoxReplacement />
        </ContentWrapper>

        <AddEventModal
          state={state}
          updateState={updateState}
          onClose={() => updateState({ addPopupOpened: false })}
        />
      </CoursesLayout>
    </Hydrated>
  );
}
