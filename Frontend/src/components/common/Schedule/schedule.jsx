import { useState, useField, useEffect } from "react";
import styles from "./schedule.module.css";
import { useUserStore } from "@/store/user.store";

import { Flex, Center, Switch, Image } from "@chakra-ui/react";
import TimeDay from "../TimeDay/time-day";

function Schedule(...props) {
  //   const [field, meta, helpers] = useField(props);

  const schedule = useUserStore((state) => state.schedule);
  const setSchedule = useUserStore((state) => state.setSchedule);
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const serverData =
    "sunday%1:00:am-2:00:am/monday%1:00:am-2:00:am@3:00:am-4:00:am/tuesday%1:00:am-2:00:am@3:00:am-4:00:am/wednesday%1:00:am-2:00:am@3:00:am-4:00:am/thursday%1:00:am-2:00:am@3:00:am-4:00:am/friday%1:00:am-2:00:am@3:00:am-4:00:am/saturday%1:00:am-2:00:am@3:00:am-4:00:am";
  // sunday%1:00:am-2:00:am@3:00:am-4:00:am  monday%1:00:am-2:00:am@3:00:am-4:00:am  tuesday%1:00:am-2:00:am@3:00:am-4:00:am  wednesday%1:00:am-2:00:am@3:00:am-4:00:am  thursday%1:00:am-2:00:am@3:00:am-4:00:am  friday%1:00:am-2:00:am@3:00:am-4:00:am  saturday%1:00:am-2:00:am@3:00:am-4:00:am
  // key = day
  // Function to fill up map

  useEffect(() => {
    transformSchedule(serverData, schedule);
    setSchedule(schedule);
  }, []);

  function transformSchedule(serverData, schedule) {
    const daysInterval = serverData.split("/");

    for (const interval of daysInterval) {
      const timeSplit = interval.split("%");
      schedule[timeSplit[0]] = timeSplit[1];
    }
  }
  /* el tiempo completo como string
              @;%-
              monday%1:00:am-2:00:am@3:00:am-4:00:am/tuesday%1:00:am-2:00:am@3:00:am-4:00:am/wednesday%
              [][][]=.split(:)

              <schedule props.settiempo>
              <Timepicker>
          */
  return (
    <>
      <div>
        {days.map((day) => (
          <TimeDay key={day} day={day} time={schedule[day]} />
        ))}
      </div>
    </>
  );
}

export default Schedule;
