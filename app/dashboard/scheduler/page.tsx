"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Event } from "@/types/Event";
import { 
  getSchedulerEvents, 
  deleteSchedulerEvent 
} from "./_actions/schedulerActions";
import AddEventModal from "@/app/components/popups/addEvent";
import EditEventModal from "@/app/components/popups/editEvent";
import ConfirmationModal from "@/app/components/popups/deletePopUp";
import Header from "@/app/dashboard/header";
import styled from "styled-components";
import AddEventButtonComponent from "@/app/components/buttons/addEventButton";

const CoursesLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #383838;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  flex: 1;
  margin-top: 70px;
  gap: 40px;
`;

const SchedulerSection = styled.div`
  flex: 3;
  color: #fff;
  padding: 20px;
  h1 {
    font-size: 32px;
    margin-bottom: 20px;
    @media (max-width: 1200px) {
      font-size: 24px;
    }
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 20px;
`;

interface ControlsProps {
  isSelected: boolean;
  activitySelected: boolean;
}

const Controls = styled.div<ControlsProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;

  img {
    width: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .edit {
    opacity: ${({ isSelected }) => (isSelected ? 0.5 : 1)};
    pointer-events: ${({ isSelected }) => (isSelected ? "none" : "all")};
  }

  .delete {
    opacity: ${({ activitySelected }) => (activitySelected ? 1 : 0.5)};
    pointer-events: ${({ activitySelected }) => (activitySelected ? "all" : "none")};
  }
`;

interface SchedulerState {
  events: Event[];
  selected: string | null;
  isModalOpen: boolean;
  popupOpened: boolean;
  addPopupOpened: boolean;
  type: string;
  loading: boolean;
  isChecked: boolean;
}

export default function SchedulerPage() {
  const { idToken, loading } = useAuth();
  const router = useRouter();
  
  const [state, setState] = useState<SchedulerState>({
    events: [],
    selected: null,
    isModalOpen: false,
    popupOpened: false,
    addPopupOpened: false,
    type: "",
    loading: true,
    isChecked: false
  });

  useEffect(() => {
    const fetchEvents = async () => {
      if (loading) return;
      
      if (!idToken) {
        router.replace("/login");
        return;
      }

      try {
        const { success, data, error } = await getSchedulerEvents(idToken);
        if (success && data) {
          setState(prev => ({ ...prev, events: data, loading: false }));
        } else {
          console.error(error);
          setState(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    fetchEvents();
  }, [idToken, loading, router]);

  const handleDeleteClick = async () => {
    if (!state.selected || !idToken) return;
    setState(prev => ({ ...prev, isModalOpen: true }));
  };

  const handleConfirmDelete = async () => {
    if (!state.selected || !idToken) return;

    const eventIndex = state.events.findIndex(e => e.title === state.selected);
    if (eventIndex === -1) return;

    const { success, error } = await deleteSchedulerEvent(idToken, eventIndex);
    
    if (success) {
      setState(prev => ({
        ...prev,
        events: prev.events.filter(e => e.title !== state.selected),
        selected: null,
        isModalOpen: false
      }));
    } else {
      console.error(error);
    }
  };

  return (
    <CoursesLayout>
      <Header hightlighted="scheduler" />
      
      <ConfirmationModal
        isOpen={state.isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setState(prev => ({ ...prev, isModalOpen: false }))}
      />

      <EditEventModal
        onClose={(value: boolean) => setState(prev => ({ ...prev, popupOpened: value }))}
        popupOpened={state.popupOpened}
        courseTitle={state.selected}
        eventType={state.type}
      />

      <AddEventModal
        onClose={(value: boolean) => setState(prev => ({ ...prev, addPopupOpened: value }))}
        popupOpened={state.addPopupOpened}
        eventType={state.type}
      />

      <ContentWrapper>
        <SchedulerSection>
          <TitleWrapper>
            <h1>Scheduler</h1>
            <Controls
              isSelected={state.selected === null}
              activitySelected={state.selected !== null && state.type === "activity"}
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
                onClick={() => setState(prev => ({ ...prev, popupOpened: true }))}
                alt="edit"
              />
              <img
                src={!state.isChecked ? "/emptyCheckBox.svg" : "/fullCheckBox.svg"}
                onClick={() => setState(prev => ({ ...prev, isChecked: !prev.isChecked }))}
                alt="checkbox"
              />
              <AddEventButtonComponent
                action={() => setState(prev => ({ ...prev, addPopupOpened: true }))}
              />
            </Controls>
          </TitleWrapper>

          <div>
            {state.events.map((event, index) => (
              <div key={index} onClick={() => {
                setState(prev => ({
                  ...prev,
                  selected: event.title,
                  type: "activity"
                }));
              }}>
                {event.title} - {event.day} ({event.start}-{event.finish})
              </div>
            ))}
          </div>

        </SchedulerSection>
      </ContentWrapper>
    </CoursesLayout>
  );
}
