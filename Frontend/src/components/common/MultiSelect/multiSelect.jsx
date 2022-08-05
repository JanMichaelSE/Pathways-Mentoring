import React, { useState } from "react";
import { useField, ErrorMessage } from "formik";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react";

import DropdownIcon from "@/assets/select-dropdown.svg";
import styles from "./multiSelect.module.css";

function MultiSelect({ label, options, ...props }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  function multiSelectStyles() {
    let classNames = styles.multiSelect;

    if (meta.touched && meta.error) {
      classNames += " multi-select-error";
    }

    return classNames;
  }

  return (
    <div>
      <Menu closeOnSelect={false}>
        {({ onClose }) => (
          <div>
            <MenuButton
              {...field}
              {...props}
              type="button"
              className={multiSelectStyles()}
              border={selectedOptions.length ? "1px" : "none"}
              borderColor={
                selectedOptions.length ? "var(--color-grey)" : "transparent"
              }
            >
              {`${label}${
                selectedOptions.length > 0 ? ` (${selectedOptions.length})` : ""
              }`}
            </MenuButton>
            <MenuList backgroundColor="#e0e6ea" width="100%">
              <MenuGroup title={undefined}>
                <MenuItem
                  onClick={() => {
                    setSelectedOptions([]);
                    setValue([]);
                    onClose();
                  }}
                >
                  Clear all
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuOptionGroup
                title={undefined}
                value={selectedOptions}
                type="checkbox"
                onChange={(values) => {
                  setSelectedOptions(values.filter((_) => _.length));
                  setValue(values.filter((_) => _.length));
                }}
              >
                {options.map((option) => {
                  return (
                    <MenuItemOption
                      key={`multiselect-menu-${option}`}
                      type="button"
                      value={option}
                    >
                      {option}
                    </MenuItemOption>
                  );
                })}
              </MenuOptionGroup>
            </MenuList>
          </div>
        )}
      </Menu>
      <span className={`error ${styles.errorContainer}`}>
        <ErrorMessage name={props.name} />
      </span>
    </div>
  );
}
export default MultiSelect;
