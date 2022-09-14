import { useState, useEffect } from "react";
import styles from "./time-day.module.css";
import { Flex, Center, Switch, Image } from "@chakra-ui/react";
import TimePickerSelector from "@/components/common/TimePickerSelector/time-picker-selector";
import { useUserStore } from "@/store/user.store";

function TimeDay({ day, time, edit }) {
  const schedule = useUserStore((state) => state.schedule);
  const setSchedule = useUserStore((state) => state.setSchedule);
  const scheduleStatus = useUserStore((state) => state.scheduleStatus);
  const setScheduleStatus = useUserStore((state) => state.setScheduleStatus);
  const [switchValue, setSwitchValue] = useState(false);
  const [hasSecondInterval, setHasSecondInterval] = useState(false);
  const [timeSplit, setTimeSplit] = useState([]);
  const [firstInterval, setFirstInterval] = useState("");
  const [secondInterval, setSecondInterval] = useState("");

  // Load Initial Data
  useEffect(() => {
    var [isOneInterval, hasDayOpen, timeSplit] = splitTimeInTwo(time);
    setSwitchValue(hasDayOpen);
    setHasSecondInterval(!isOneInterval);
    setTimeSplit(timeSplit);
  }, []);

  // Handle Schedule Data
  useEffect(() => {
    if ((firstInterval && !hasSecondInterval) || (firstInterval && secondInterval)) {
      console.log("Use Effect Value 1 time day:", firstInterval);
      console.log("Use Effect Value 2 time day:", secondInterval);

      if (hasSecondInterval) {
        schedule[day] = `%${firstInterval}@${secondInterval}/`;
        scheduleStatus[day] = !scheduleStatus[day];
        setSchedule(schedule);
        setScheduleStatus({ ...scheduleStatus });
      } else {
        schedule[day] = `%${firstInterval}/`;
        scheduleStatus[day] = !scheduleStatus[day];
        setSchedule(schedule);
        setScheduleStatus({ ...scheduleStatus });
      }
    }
  }, [firstInterval, secondInterval]);

  function updateFirstInterval(tiempo) {
    console.log("Time Day Value Interval 1: ", tiempo);
    setFirstInterval(tiempo);
  }
  function updateSecondInterval(tiempo) {
    console.log("Time Day Value Interval 2: ", tiempo);
    setSecondInterval(tiempo);
  }

  function splitTimeInTwo(time) {
    let isOneInterval = true;
    let hasDayOpen = false;
    let timeSplit = "";

    if (time.length === 0) {
      isOneInterval = true;
      timeSplit = "";
    } else if (time.includes("@")) {
      isOneInterval = false;
      hasDayOpen = true;
      timeSplit = time.split("@");
    } else {
      isOneInterval = true;
      hasDayOpen = true;
      timeSplit = time;
    }

    return [isOneInterval, hasDayOpen, timeSplit];
  }

  return (
    <>
      <div className={styles.formScheduleContainer}>
        <div className={styles.formDailyContainer}>
          <div className={styles.formDaysContainer}>
            <Flex>
              <Center w={"120px"} mr={"20px"}>
                <h2
                  style={{
                    fontWeight: "bold",
                    fontSize: "var(--font-size-subheading)",
                    color: "var(--color-blue-dark)",
                  }}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </h2>
              </Center>
              <Center w={"60px"} mr={"5px"}>
                <Switch
                  size={"lg"}
                  isChecked={switchValue}
                  onChange={() => setSwitchValue((switchValue) => !switchValue)}
                  isDisabled={edit}
                />
              </Center>
              <Center>
                <h3
                  style={{
                    fontSize: "var(--font-size-small)",
                    color: "var(--color-blue-dark)",
                  }}
                >
                  {switchValue ? "Open" : "Close"}
                </h3>
              </Center>
            </Flex>
          </div>
          <div className={styles.formTimePickerContainer}>
            {switchValue ? (
              <>
                {hasSecondInterval ? (
                  <>
                    <TimePickerSelector
                      time={timeSplit[0]}
                      edit={edit}
                      updateInterval={updateFirstInterval}
                    />
                    <Image borderRadius="full" boxSize="50px" src="/assets/slash-icon.svg"></Image>
                    <TimePickerSelector
                      time={timeSplit[1]}
                      edit={edit}
                      updateInterval={updateSecondInterval}
                    />
                    <button
                      type="button"
                      style={{
                        width: 58,
                        height: 58,
                        float: "none",
                        background: "none",
                      }}
                      onClick={() =>
                        setHasSecondInterval((hasSecondInterval) => !hasSecondInterval)
                      }
                      disabled={edit}
                    >
                      <Image
                        borderRadius="full"
                        boxSize="50px"
                        src="/assets/subtract-icon.svg"
                      ></Image>
                    </button>
                  </>
                ) : (
                  <>
                    <TimePickerSelector
                      time={timeSplit}
                      edit={edit}
                      updateInterval={updateFirstInterval}
                    />
                    <button
                      type="button"
                      style={{
                        width: 58,
                        height: 58,
                        float: "none",
                        background: "none",
                      }}
                      onClick={() =>
                        setHasSecondInterval((hasSecondInterval) => !hasSecondInterval)
                      }
                    >
                      <Image borderRadius="full" boxSize="50px" src="/assets/add-icon.svg"></Image>
                    </button>
                  </>
                )}
              </>
            ) : (
              <p className={styles.timeMessage}>No time will be selected</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default TimeDay;
