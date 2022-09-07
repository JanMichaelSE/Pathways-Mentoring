import { useState } from "react";
import styles from "./time-day.module.css";
import { Flex, Center, Switch, Image } from "@chakra-ui/react";
import TimePickerSelector from "@/components/common/TimePickerSelector/time-picker-selector";

function TimeDay(props) {
  const [switchValue, setSwitchValue] = useState(true);
  const [clickValue, setClickValue] = useState(true);
  if (props.time.includes("@")) {
    const timeSplit = props.time.split("@");
    console.log(timeSplit);
    // console.log(`Time: ${props.day}: `, props.time);
  } else {
    const timeSplit = props.time;
    console.log(`Time: ${props.day}: `, timeSplit);
  }
  //   console.log(`Time: ${props.day}: `, props.time);

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
                  defaultChecked
                  onChange={() => setSwitchValue(!switchValue)}
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
                    <TimePickerSelector />
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
                    <TimePickerSelector />
                    <Image
                      borderRadius="full"
                      boxSize="50px"
                      src="/assets/slash-icon.svg"
                    ></Image>
                    <TimePickerSelector />
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
                        src="/assets/subtract-icon.svg"
                      ></Image>
                    </button>
                  </>
                )}
              </>
            ) : (
              <text>No time will be selected</text>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default TimeDay;
