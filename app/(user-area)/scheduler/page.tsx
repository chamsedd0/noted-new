"use client";

import { useState } from "react";
import Header from "@/app/components/header";
import SideBarComponent from "@/app/components/sidebar";
import AddEventButtonComponent from "@/app/(user-area)/scheduler/_components/addEventButton";
import AddEventModal from "@/app/(user-area)/scheduler/_components/addEventPopUp";
import SchedulerComponent from "./_components/scheduler";
import {
  CoursesLayout,
  ContentWrapper,
  SchedulerSection,
  TitleWrapper,
  Controls,
  RightBoxReplacement,
} from "./styles";
import globalStore from "@/app/(user-area)/_store";
import EditEventModal from "./_components/editEventModal";

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
  const { events, deleteEvent, selectedEvent, setSelectedEvent, updateEvent } =
    globalStore();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const selectedEventData = events.find(e => e.uid === selectedEvent) || null;

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

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedEvent) return;
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
                onClick={() => selectedEvent && setEditModalOpen(true)}
                alt="edit"
              />
              <img
                src={
                  !state.isChecked ? "/emptyCheckBox.svg" : "/fullCheckBox.svg"
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
        <SideBarComponent page="" />
      </ContentWrapper>

      <AddEventModal
        state={state}
        updateState={updateState}
        onClose={() => updateState({ addPopupOpened: false })}
      />

      <EditEventModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        event={selectedEventData}
        events={events}
        onUpdate={updateEvent}
      />
    </CoursesLayout>
  );
}
