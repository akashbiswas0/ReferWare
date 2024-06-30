import React from "react";
import Items from "./Items";

const SettingsNavBar = (props: any) => {
  return (
    <div id="settingsnav" className="">
      <div className="flex items-center gap-12 text-white">
        <span
          onClick={() => props.setActivePage("ProfilePage")}
          className="cursor-pointer"
        >
          <Items
            section_name="Profile Setting"
            page_name="profile"
            isActive={props.activePage == "ProfilePage"}
          />
        </span>
      </div>
    </div>
  );
};

export default SettingsNavBar;
