import { useState, useField, useEffect } from "react";
import styles from "./schedule.module.css";
import { useUserStore } from "@/store/user.store";

import { Spinner, Flex, Center, Switch, Image } from "@chakra-ui/react";
import TimeDay from "../TimeDay/time-day";

function Schedule(props) {
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
  const [isLoading, setIsLoading] = useState(true);

  //   const serverData = "";

  //   const serverData =
  //     "sunday%01:00:am-02:00:am/monday%01:00:am-02:00:am@03:00:am-04:00:am/tuesday%01:00:am-02:00:am@03:00:am-04:00:am/wednesday%01:00:am-02:00:am@03:00:am-04:00:am/thursday%01:00:am-02:00:am@03:00:am-04:00:am/friday%01:00:am-02:00:am@03:00:am-04:00:am/saturday%01:00:am-02:00:am@03:00:am-04:00:am";
  // sunday%1:00:am-2:00:am@3:00:am-4:00:am  monday%1:00:am-2:00:am@3:00:am-4:00:am  tuesday%1:00:am-2:00:am@3:00:am-4:00:am  wednesday%1:00:am-2:00:am@3:00:am-4:00:am  thursday%1:00:am-2:00:am@3:00:am-4:00:am  friday%1:00:am-2:00:am@3:00:am-4:00:am  saturday%1:00:am-2:00:am@3:00:am-4:00:am
  // key = day
  // Function to fill up map
  // 1:00:am-2:00:am

  useEffect(() => {
    transformSchedule(props.value, schedule);
    setSchedule(schedule);
    setIsLoading(false);
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
  if (isLoading) {
    return (
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        position="absolute"
        top="30%"
        left="50%"
      />
    );
  }
  return (
    <>
      <div>
        {days.map((day) => (
          <TimeDay key={day} day={day} time={schedule[day]} edit={props.edit} />
        ))}
      </div>
    </>
  );
}

export default Schedule;
