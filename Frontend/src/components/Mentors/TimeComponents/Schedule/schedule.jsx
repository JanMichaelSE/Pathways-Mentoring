import { useState, useEffect } from "react";

import { useUserStore } from "@/store/user.store";

import { Spinner } from "@chakra-ui/react";
import TimeDay from "@/components/Mentors/TimeComponents/TimeDay/time-day";

function Schedule({ scheduleValue, edit, onReadyToSubmit }) {
  const scheduleStatus = useUserStore((state) => state.scheduleStatus);
  const schedule = useUserStore((state) => state.schedule);
  const setSchedule = useUserStore((state) => state.setSchedule);
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const [isLoading, setIsLoading] = useState(true);

  // Load Initial Data
  useEffect(() => {
    transformSchedule(scheduleValue, schedule);
    setSchedule(schedule);
    setIsLoading(false);
  }, []);

  // Handle Submit Transformed Schedule
  useEffect(() => {
    if (
      scheduleStatus.sunday &&
      scheduleStatus.monday &&
      scheduleStatus.tuesday &&
      scheduleStatus.wednesday &&
      scheduleStatus.thursday &&
      scheduleStatus.friday &&
      scheduleStatus.saturday
    ) {
      const transformedSchedule = transformScheduleToString(schedule);
      onReadyToSubmit(true, transformedSchedule);
    }
  }, [scheduleStatus]);

  function transformScheduleToString(schedule) {
    if (
      schedule["sunday"] == "%/" &&
      schedule["monday"] == "%/" &&
      schedule["tuesday"] == "%/" &&
      schedule["wednesday"] == "%/" &&
      schedule["thursday"] == "%/" &&
      schedule["friday"] == "%/" &&
      schedule["saturday"] == "%/"
    ) {
      setSchedule({
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
      });
      return "";
    }

    const transformedSchedule = `sunday${schedule["sunday"]}monday${schedule["monday"]}tuesday${schedule["tuesday"]}wednesday${schedule["wednesday"]}thursday${schedule["thursday"]}friday${schedule["friday"]}saturday${schedule["saturday"]}`;
    return transformedSchedule;
  }

  function transformSchedule(serverData, schedule) {
    const daysInterval = serverData.split("/");

    for (const interval of daysInterval) {
      const timeSplit = interval.split("%");
      schedule[timeSplit[0]] = timeSplit[1];
    }
  }

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
          <TimeDay key={day} day={day} time={schedule[day]} edit={edit} />
        ))}
      </div>
    </>
  );
}

export default Schedule;
