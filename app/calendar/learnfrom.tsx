"use client";

import React, { useState } from "react";
import FullCalendar from '@fullcalendar/react'
import { DateSelectArg, EventClickArg } from "@fullcalendar/core"
import { EventInput } from "@fullcalendar/core"
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

interface TimeSlot {
  id: string;
  start: string;
  end: string;
}

export default function Main() {
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const newStart = new Date(selectInfo.startStr);
    const newEnd = new Date(selectInfo.endStr);

    // Find all overlapping slots
    const overlappingSlots = selectedSlots.filter(slot => {
      const slotStart = new Date(slot.start);
      const slotEnd = new Date(slot.end);
      
      // Check if there's any overlap
      return newStart < slotEnd && newEnd > slotStart;
    });

    if (overlappingSlots.length > 0) {
      // Remove overlapping slots and create new slots from the remaining parts
      let newSlots = selectedSlots.filter(slot => {
        const slotStart = new Date(slot.start);
        const slotEnd = new Date(slot.end);
        return !(newStart < slotEnd && newEnd > slotStart);
      });

      // For each overlapping slot, create new slots for the non-overlapping parts
      overlappingSlots.forEach(slot => {
        const slotStart = new Date(slot.start);
        const slotEnd = new Date(slot.end);

        // If there's a part before the new selection, keep it
        if (slotStart < newStart) {
          newSlots.push({
            id: `${slotStart.toISOString()}-${newStart.toISOString()}`,
            start: slotStart.toISOString(),
            end: newStart.toISOString()
          });
        }

        // If there's a part after the new selection, keep it
        if (slotEnd > newEnd) {
          newSlots.push({
            id: `${newEnd.toISOString()}-${slotEnd.toISOString()}`,
            start: newEnd.toISOString(),
            end: slotEnd.toISOString()
          });
        }
      });

      setSelectedSlots(newSlots);
    } else {
      // No overlap, add the new availability slot
      const newSlot: TimeSlot = {
        id: `${selectInfo.startStr}-${selectInfo.endStr}`,
        start: selectInfo.startStr,
        end: selectInfo.endStr
      };
      setSelectedSlots([...selectedSlots, newSlot]);
    }

    // Clear the selection
    selectInfo.view.calendar.unselect();
  };

  const handleExport = () => {
    const jsonData = JSON.stringify(selectedSlots, null, 2);
    
    // Create a blob and download
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    setSelectedSlots([]);
  };

  // Convert slots to FullCalendar events
  const events: EventInput[] = selectedSlots.map((slot) => ({
    id: slot.id,
    start: slot.start,
    end: slot.end,
    display: "background",
    backgroundColor: "rgba(0, 153, 101, 0.5)",
  }));

  return (
    <div className="relative w-full min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
        <div className="text-xl font-semibold text-[#009965]">Mathsoc wtv name thing</div>
        <div className="flex gap-3">
          <button className="px-4 py-1 border rounded-lg text-[#003f2a] hover:bg-gray-100">
            Log in
          </button>
          <button className="px-4 py-1 bg-[#003f2a] text-white rounded-lg hover:bg-[#009965]">
            Sign up
          </button>
        </div>
      </div>

      {/* Control Panel */}
      <div className="px-20 pt-6 pb-2">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-[#003f2a]">
                Selected Slots: {selectedSlots.length}
              </span>
              <button
                onClick={handleClearAll}
                disabled={selectedSlots.length === 0}
                className="px-3 py-1 text-sm border rounded-lg text-[#003f2a] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear All
              </button>
            </div>
            <button
              onClick={handleExport}
              disabled={selectedSlots.length === 0}
              className="px-4 py-2 bg-[#009965] text-white rounded-lg hover:bg-[#003f2a] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Export to JSON
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Click and drag to select your available time slots. Select over any highlighted area to remove that availability.
          </p>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-20 pb-20 text-[#003f2a]">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            weekends={false}
            selectable={true}
            selectMirror={true}
            selectOverlap={true}
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: ""
            }}
            select={handleDateSelect}
            events={events}
            height="auto"
          />
        </div>
      </div>
    </div>
  );
}