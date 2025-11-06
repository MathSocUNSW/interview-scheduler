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

interface StoredTime {
  day: number;
  halfHourBlocks: number;
}

export default function Main() {
  const startDate = new Date(2025, 11, 3, 0, 0, 0);

  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const newStart = new Date(selectInfo.startStr);
    const newEnd = new Date(selectInfo.endStr);

    // Find all overlapping slots
    const overlappingSlots = selectedSlots.filter(slot => {
      const slotStart = new Date(slot.start);
      const slotEnd = new Date(slot.end);
      
      // Check overlap
      return newStart < slotEnd && newEnd > slotStart;
    });

    let newSlots: TimeSlot[] = []; 

    if (overlappingSlots.length > 0) {
      // Populate original NON overlapping slots
      // let newSlots = selectedSlots.filter(slot => {
      //   const slotStart = new Date(slot.start);
      //   const slotEnd = new Date(slot.end);
      //   return !(newStart < slotEnd && newEnd > slotStart);
      // });
      newSlots =  selectedSlots.filter(slot => {
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

      // setSelectedSlots(newSlots);
      setSelectedSlots(spreadSlots(newSlots));
    } else {
      // No overlap, add the new availability slot
      // const newSlot: TimeSlot = {
      //   id: `${selectInfo.startStr}-${selectInfo.endStr}`,
      //   start: selectInfo.startStr,
      //   end: selectInfo.endStr
      // };
      newSlots.push({
        id: `${selectInfo.startStr}-${selectInfo.endStr}`,
        start: selectInfo.startStr,
        end: selectInfo.endStr
      })
      // setSelectedSlots([...selectedSlots, newSlot]);
      setSelectedSlots(prev => [...prev, ...spreadSlots(newSlots)]);
    }
    // Clear the selection
    selectInfo.view.calendar.unselect();
  };

  const spreadSlots = (newSlots: TimeSlot[]) => {
    let spreadSlots: TimeSlot[] = [];
    newSlots.forEach(slot => {
      const start = new Date (slot.start);
      const end = new Date (slot.end);
      console.log(`start: ${start}; end: ${end}`);
      while (timeDifference(start, end) >= 30) {
        // create new slot with start at start, and end at start + 30 mins
        const newEnd = new Date (start.getTime());
        newEnd.setMinutes(newEnd.getMinutes() + 30);
        spreadSlots.push({
            id: `${start.toISOString()}-${newEnd.toISOString()}`,
            start: start.toISOString(),
            end: newEnd.toISOString()
          })
        start.setMinutes(start.getMinutes() + 30);
      }
    })
    return spreadSlots;
  }

  // time difference in minutes
  const timeDifference = (start: Date, end: Date) => {
    return (Math.abs(end.getTime() - start.getTime())) / (1000 * 60);
  }
  // take selectedslots
  // spread
  // split each into 30 min intervals
  // setSelectedSlots

  // const handleExport = () => {
  //   const jsonData = JSON.stringify(selectedSlots, null, 2);
    
  //   // Create a blob and download
  //   const blob = new Blob([jsonData], { type: 'application/json' });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'data.json';
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // };

  

	const handleExport = () => {
		console.log(selectedSlots);
    // numeric array
    let slotArray: number[][] = [];
    selectedSlots.forEach(slot => {
      const currDate = new Date(slot.start);
      const days: number = daysFromStart(currDate);
      const blocks: number = timeFromDayStart(currDate);
      slotArray.push([days, blocks]);
    })
    console.log(slotArray);
	}

  const daysFromStart = (currDate: Date) => {
    return (Math.floor(timeDifference(startDate, currDate) / 1440));
  }

  const timeFromDayStart = (currDate: Date) => {
    const hours = currDate.getHours();
    const mins = currDate.getMinutes();
    if (mins == 0) {
      return 2 * (hours - 9);
    } else {
      return 2 * (hours - 9) + 1;
    }
  }

  const handleClearAll = () => {
    setSelectedSlots([]);
  };

  // Convert slots to FullCalendar events (colour here)
	// NOTE: background is clear and works, block looks better but doesn't work
  const events: EventInput[] = selectedSlots.map((slot) => ({
    id: slot.id,
    start: slot.start,
    end: slot.end,
    display: "background",
    backgroundColor: "rgba(0, 153, 101)",
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
              Submit
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
            initialView = {'timeGridWeek'}
            weekends={false}
            selectable={true}
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: ""
            }}
            select={handleDateSelect}
            events={events}
            height="auto"
			slotMinTime={"09:00"}
			slotMaxTime={"18:00"}
          />
        </div>
      </div>
    </div>
  );
}