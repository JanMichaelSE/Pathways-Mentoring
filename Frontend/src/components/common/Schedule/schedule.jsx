import { useState, useField } from "react";
import styles from "./schedule.module.css";

import { Flex, Center, Switch, Image } from "@chakra-ui/react";
import TimePickerSelector from "@/components/common/TimePickerSelector/time-picker-selector";

function Schedule(...props) {
  //   const [field, meta, helpers] = useField(props);
  const [switchValue1, setSwitchValue1] = useState(true);
  const [switchValue2, setSwitchValue2] = useState(true);
  const [switchValue3, setSwitchValue3] = useState(true);
  const [switchValue4, setSwitchValue4] = useState(true);
  const [switchValue5, setSwitchValue5] = useState(true);
  const [switchValue6, setSwitchValue6] = useState(true);
  const [switchValue7, setSwitchValue7] = useState(true);

  const [clickValue1, setClickValue1] = useState(true);
  const [clickValue2, setClickValue2] = useState(true);
  const [clickValue3, setClickValue3] = useState(true);
  const [clickValue4, setClickValue4] = useState(true);
  const [clickValue5, setClickValue5] = useState(true);
  const [clickValue6, setClickValue6] = useState(true);
  const [clickValue7, setClickValue7] = useState(true);

  /* el tiempo completo como string
              @;%-
              monday%1:00:am-2:00:am@3:00:am-4:00:am
              [][][]=.split(:)

              <schedule props.settiempo>
              <Timepicker>
          */
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
                  Sunday
                </h2>
              </Center>
              <Center w={"60px"} mr={"5px"}>
                <Switch
                  size={"lg"}
                  defaultChecked
                  onChange={() => setSwitchValue1(!switchValue1)}
                />
              </Center>
              <Center>
                <h3
                  style={{
                    fontSize: "var(--font-size-small)",
                    color: "var(--color-blue-dark)",
                  }}
                >
                  {switchValue1 ? "Open" : "Close"}
                </h3>
              </Center>
            </Flex>
          </div>
          <div className={styles.formTimePickerContainer}>
            {switchValue1 ? (
              <>
                {clickValue1 ? (
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
                      onClick={() => setClickValue1(!clickValue1)}
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
                      onClick={() => setClickValue1(!clickValue1)}
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
                  Monday
                </h2>
              </Center>
              <Center w={"60px"} mr={"5px"}>
                <Switch
                  size={"lg"}
                  defaultChecked
                  onChange={() => setSwitchValue2(!switchValue2)}
                />
              </Center>
              <Center>
                <h3
                  style={{
                    fontSize: "var(--font-size-small)",
                    color: "var(--color-blue-dark)",
                  }}
                >
                  {switchValue2 ? "Open" : "Close"}
                </h3>
              </Center>
            </Flex>
          </div>
          <div className={styles.formTimePickerContainer}>
            {switchValue2 ? (
              <>
                {clickValue2 ? (
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
                      onClick={() => setClickValue2(!clickValue2)}
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
                      onClick={() => setClickValue2(!clickValue2)}
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
                  Tuesday
                </h2>
              </Center>
              <Center w={"60px"} mr={"5px"}>
                <Switch
                  size={"lg"}
                  defaultChecked
                  onChange={() => setSwitchValue3(!switchValue3)}
                />
              </Center>
              <Center>
                <h3
                  style={{
                    fontSize: "var(--font-size-small)",
                    color: "var(--color-blue-dark)",
                  }}
                >
                  {switchValue3 ? "Open" : "Close"}
                </h3>
              </Center>
            </Flex>
          </div>
          <div className={styles.formTimePickerContainer}>
            {switchValue3 ? (
              <>
                {clickValue3 ? (
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
                      onClick={() => setClickValue3(!clickValue3)}
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
                      onClick={() => setClickValue3(!clickValue3)}
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
                  Wednesday
                </h2>
              </Center>
              <Center w={"60px"} mr={"5px"}>
                <Switch
                  size={"lg"}
                  defaultChecked
                  onChange={() => setSwitchValue4(!switchValue4)}
                />
              </Center>
              <Center>
                <h3
                  style={{
                    fontSize: "var(--font-size-small)",
                    color: "var(--color-blue-dark)",
                  }}
                >
                  {switchValue4 ? "Open" : "Close"}
                </h3>
              </Center>
            </Flex>
          </div>
          <div className={styles.formTimePickerContainer}>
            {switchValue4 ? (
              <>
                {clickValue4 ? (
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
                      onClick={() => setClickValue4(!clickValue4)}
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
                      onClick={() => setClickValue4(!clickValue4)}
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
                  Thursday
                </h2>
              </Center>
              <Center w={"60px"} mr={"5px"}>
                <Switch
                  size={"lg"}
                  defaultChecked
                  onChange={() => setSwitchValue5(!switchValue5)}
                />
              </Center>
              <Center>
                <h3
                  style={{
                    fontSize: "var(--font-size-small)",
                    color: "var(--color-blue-dark)",
                  }}
                >
                  {switchValue5 ? "Open" : "Close"}
                </h3>
              </Center>
            </Flex>
          </div>
          <div className={styles.formTimePickerContainer}>
            {switchValue5 ? (
              <>
                {clickValue5 ? (
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
                      onClick={() => setClickValue5(!clickValue5)}
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
                      onClick={() => setClickValue5(!clickValue5)}
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
                  Friday
                </h2>
              </Center>
              <Center w={"60px"} mr={"5px"}>
                <Switch
                  size={"lg"}
                  defaultChecked
                  onChange={() => setSwitchValue6(!switchValue6)}
                />
              </Center>
              <Center>
                <h3
                  style={{
                    fontSize: "var(--font-size-small)",
                    color: "var(--color-blue-dark)",
                  }}
                >
                  {switchValue6 ? "Open" : "Close"}
                </h3>
              </Center>
            </Flex>
          </div>
          <div className={styles.formTimePickerContainer}>
            {switchValue6 ? (
              <>
                {clickValue6 ? (
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
                      onClick={() => setClickValue6(!clickValue6)}
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
                      onClick={() => setClickValue6(!clickValue6)}
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
                  Saturday
                </h2>
              </Center>
              <Center w={"60px"} mr={"5px"}>
                <Switch
                  size={"lg"}
                  defaultChecked
                  onChange={() => setSwitchValue7(!switchValue7)}
                />
              </Center>
              <Center>
                <h3
                  style={{
                    fontSize: "var(--font-size-small)",
                    color: "var(--color-blue-dark)",
                  }}
                >
                  {switchValue7 ? "Open" : "Close"}
                </h3>
              </Center>
            </Flex>
          </div>
          <div className={styles.formTimePickerContainer}>
            {switchValue7 ? (
              <>
                {clickValue7 ? (
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
                      onClick={() => setClickValue7(!clickValue7)}
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
                      onClick={() => setClickValue7(!clickValue7)}
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

export default Schedule;
