"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Event } from "@/types/Event";
import {
  getSchedulerEvents,
  deleteSchedulerEvent,
} from "./_actions/schedulerActions";

import ConfirmationModal from "@/app/components/popups/deletePopUp";
import Header from "@/app/dashboard/header";
import styled from "styled-components";
import AddEventButtonComponent from "@/app/components/buttons/addEventButton";
import SchedulerComponent from "@/app/components/scheduler";
import { Hydrated } from "@/app/components/hydrated";
import Loading from "@/app/components/loading";

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
    pointer-events: ${({ activitySelected }) =>
      activitySelected ? "all" : "none"};
  }
`;

const RightBoxReplacement = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 300px;

  @media (max-width: 1200px) {
    max-width: none;
  }

  @media (max-width: 1200px) {
    min-width: 250px;
  }
  @media (max-width: 1100px) {
    display: none;
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
    isChecked: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    if (loading) return;

    if (!idToken) {
      router.replace("/login");
      return;
    }

    try {
      const { success, data, error } = await getSchedulerEvents(idToken);
      if (success && data) {
        setState((prev) => ({ ...prev, events: data }));
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }

    setTimeout(() => setIsLoading(false), 500);
  }, [idToken, loading, router]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDeleteClick = async () => {
    if (!state.selected || !idToken) return;
    setState((prev) => ({ ...prev, isModalOpen: true }));
  };

  const handleConfirmDelete = async () => {
    if (!state.selected || !idToken) return;

    const eventIndex = state.events.findIndex(
      (e) => e.title === state.selected
    );
    if (eventIndex === -1) return;

    const { success, error } = await deleteSchedulerEvent(idToken, eventIndex);

    if (success) {
      setState((prev) => ({
        ...prev,
        events: prev.events.filter((e) => e.title !== state.selected),
        selected: null,
        isModalOpen: false,
      }));
    } else {
      console.error(error);
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Hydrated>
        <CoursesLayout>
          <Header hightlighted="scheduler" />

          <ConfirmationModal
            isOpen={state.isModalOpen}
            onConfirm={handleConfirmDelete}
            onCancel={() =>
              setState((prev) => ({ ...prev, isModalOpen: false }))
            }
          />

          <ContentWrapper>
            <SchedulerSection>
              <TitleWrapper>
                <h1>Scheduler</h1>
                <Controls
                  isSelected={state.selected === null}
                  activitySelected={
                    state.selected !== null && state.type === "activity"
                  }
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
                    onClick={() =>
                      setState((prev) => ({ ...prev, popupOpened: true }))
                    }
                    alt="edit"
                  />
                  <img
                    src={
                      !state.isChecked
                        ? "/emptyCheckBox.svg"
                        : "/fullCheckBox.svg"
                    }
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        isChecked: !prev.isChecked,
                      }))
                    }
                    alt="checkbox"
                  />
                  <AddEventButtonComponent
                    action={() =>
                      setState((prev) => ({ ...prev, addPopupOpened: true }))
                    }
                  />
                </Controls>
              </TitleWrapper>

              <SchedulerComponent
                isChecked={state.isChecked}
                setIsChecked={(value) =>
                  setState((prev) => ({ ...prev, isChecked: value }))
                }
                selected={state.selected}
                setSelected={(value) =>
                  setState((prev) => ({ ...prev, selected: value }))
                }
                setEventType={(value) =>
                  setState((prev) => ({ ...prev, type: value }))
                }
              />
            </SchedulerSection>

            <RightBoxReplacement />
          </ContentWrapper>
        </CoursesLayout>
      </Hydrated>
    </>
  );
}
