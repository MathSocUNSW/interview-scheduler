"use client";

import React, { useState } from "react";
import FullCalendar from '@fullcalendar/react'
import { DateSelectArg } from "@fullcalendar/core"
import {EventInput} from "@fullcalendar/core"
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function main() {
	
	const handleSelect = (selectInfo: DateSelectArg) => {
		console.log(selectInfo);
		const start = selectInfo.startStr;
		const end = selectInfo.endStr;
		// setSelectedSlots((prev) => ({
		// 	...prev,
		// 	[key]: !prev[key],
		// }))
		// check if this exact range is already selected
		// const exists = selectedSlots.some(
		// 	(r) => r.start === start && r.end === end
		// );
		// console.log(exists);

		// if (exists) {
		// // if it exists, remove it (toggle off)
		// setSelectedSlots((prev) =>
		// 	prev.filter((r) => !(r.start === start && r.end === end))
		// );
		// } else {
		// // otherwise add it (toggle on)
		// setSelectedSlots((prev) => [...prev, { start: start, end: end }]);
		// }

	}
	
	return (
		
		<div className = "relative w-full">
			{/* div for top bar*/}
			<div className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
				{/* Left: Logo */}
      	<div className="text-xl font-semibold text-[#009965]">Mathsoc wtv name thing</div>
				 {/* Right: Buttons */}
				<div className="flex gap-3">
					<button className="px-4 py-1 border rounded-lg text-[#003f2a] hover:bg-gray-100">
						Log in
					</button>
					<button className="px-4 py-1 bg-[#003f2a] text-white rounded-lg hover:bg-[#009965]">
						Sign up
					</button>
				</div>
			</div>

			{/*FULL CALENDAR*/} 
			<div className="flex-auto p-20 text-[#003f2a]">
				<FullCalendar
					plugins = {[dayGridPlugin, timeGridPlugin, interactionPlugin]}
					initialView = {'timeGridWeek'}
					weekends = {false}
					selectable = {true}
					select = {handleSelect}
					headerToolbar = {{
						start: "today prev,next",
						center: "title",
						end: ""
					}}>
				</FullCalendar>
				
				{/* {events={selectedSlots.map((r) => ({
					start: r.start,
					end: r.end,
					display: "background",
					backgroundColor: "rgba(34,197,94,0.5)", // highlight
				}))}} */}
			</div>
		</div>
	)
}