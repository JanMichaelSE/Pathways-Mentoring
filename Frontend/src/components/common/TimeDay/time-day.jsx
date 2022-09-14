import { useState, useEffect } from "react";
import styles from "./time-day.module.css";
import { Flex, Center, Switch, Image } from "@chakra-ui/react";
import TimePickerSelector from "@/components/common/TimePickerSelector/time-picker-selector";
import { useUserStore } from "@/store/user.store";

function TimeDay(props) {
  const [switchValue, setSwitchValue] = useState(false);
  const [clickValue, setClickValue] = useState(true);
  const [timeSplit, setTimeSplit] = useState([]);
  const [valueInterval1, setValueInterval1] = useState("");
  const [valueInterval2, setValueInterval2] = useState("");
  const submitValue = useUserStore((state) => state.submitValue);
  const schedule = useUserStore((state) => state.schedule);
  //   var timeSplit = [];

  useEffect(() => {
    var [buttonValue, tugleValue, value] = splitTimeInTwo(props.time);
    setSwitchValue(tugleValue);
    setClickValue(buttonValue);
    setTimeSplit(value);
  }, []);

  useEffect(() => {
    if (submitValue == true) {
      // console.log("submitValue timeday:", submitValue);

      console.log("Value 1 time day:", valueInterval1);
      console.log("Value 2 time day:", valueInterval2);

      if (clickValue == true) {
        schedule[props.day] = `%${valueInterval1}/`;
        props.updatetime(true);
      } else {
        schedule[props.day] = `%${valueInterval1}@${valueInterval2}/`;
        props.updatetime(true);
      }
    }
  }, [valueInterval1, valueInterval2]);

  function updateFirstInterval(tiempo) {
    console.log("tiempo1: ", tiempo);
    setValueInterval1(tiempo);
    console.log("Value Interval 1: ", valueInterval1);
  }
  function updateSecondInterval(tiempo) {
    setValueInterval2(tiempo);
    console.log("Value Interval 2: ", valueInterval2);
  }

  function splitTimeInTwo(time) {
    let buttonValue = true;
    let tugleValue = false;

    if (time.length === 0) {
      buttonValue = true;
      const value = "";
      return [buttonValue, tugleValue, value];
    }

    if (time.includes("@")) {
      buttonValue = false;
      tugleValue = true;
      const value = time.split("@");
      return [buttonValue, tugleValue, value];
    } else {
      buttonValue = true;
      tugleValue = true;
      const value = time;
      return [buttonValue, tugleValue, value];
    }
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
                  {props.day.charAt(0).toUpperCase() + props.day.slice(1)}
                </h2>
              </Center>
              <Center w={"60px"} mr={"5px"}>
                <Switch
                  size={"lg"}
                  isChecked={switchValue}
                  onChange={() => setSwitchValue(!switchValue)}
                  isDisabled={props.edit}
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
                {clickValue ? (
                  <>
                    <TimePickerSelector
                      value={timeSplit}
                      edit={props.edit}
                      updatetime={updateFirstInterval}
                    />
                    <button
                      type="button"
                      style={{
                        width: 58,
                        height: 58,
                        float: "none",
                        background: "none",
                      }}
                      onClick={() => setClickValue(!clickValue)}
                    >
                      <Image
                        borderRadius="full"
                        boxSize="50px"
                        src="/assets/add-icon.svg"
                      ></Image>
                    </button>
                  </>
                ) : (
                  <>
                    <TimePickerSelector
                      value={timeSplit[0]}
                      edit={props.edit}
                      updatetime={updateFirstInterval}
                    />
                    <Image
                      borderRadius="full"
                      boxSize="50px"
                      src="/assets/slash-icon.svg"
                    ></Image>
                    <TimePickerSelector
                      value={timeSplit[1]}
                      edit={props.edit}
                      updatetime={updateSecondInterval}
                    />
                    <button
                      type="button"
                      style={{
                        width: 58,
                        height: 58,
                        float: "none",
                        background: "none",
                      }}
                      onClick={() => setClickValue(!clickValue)}
                      disabled={props.edit}
                    >
                      <Image
                        borderRadius="full"
                        boxSize="50px"
                        src="/assets/subtract-icon.svg"
                      ></Image>
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
