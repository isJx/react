import i18n from "@/i18n";
import type { RootState } from "@/store/store";
import { getCookieValue, logout, setCookieValue } from "@/utils";
import { Avatar, Dropdown, Image, Menu, Select } from "@arco-design/web-react";
import { IconDown } from "@arco-design/web-react/icon";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./style/index.css";

export const TopBar: FunctionComponent = () => {
  const Option = Select.Option;
  const { userName } = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();
  const { t } = useTranslation();

  type State = {
    defaultValue: string;
  };

  const [state, setState] = useState<State>({ defaultValue: "中文" });

  const handleLogout = () => {
    logout();

    navigate("/login", { replace: true });
  };

  const dropList = (
    <Menu>
      <Menu.Item onClick={handleLogout} key="1">
        退出登录
      </Menu.Item>
    </Menu>
  );

  const handleChange = (value: string) => {
    setCookieValue("i18n", value);
    setState((state) => ({
      ...state,
      defaultValue: value == "zh" ? "中文" : "English",
    }));
    i18n.changeLanguage(value);
    PubSub.publish("SwitchLanguage");
  };

  const options = {
    zh: { nativeName: "中文" },
    en: { nativeName: "English" },
  } as const;

  const optinoKeys = Object.keys(options) as [keyof typeof options];

  const toHome = () => {
    navigate("/layout/home");
  };

  useEffect(() => {
    setState(() => ({
      ...state,
      defaultValue: getCookieValue("i18n") == "en" ? "English" : "中文",
    }));
  }, []);

  return (
    <div className="h60px bg-amber flex items-center justify-between p-x-4 top-bar">
      <div onClick={toHome}>
        <Image width={"88px"} src="/logo.png" preview={false} />
      </div>
      <div className="flex items-center">
        {/*  */}
        <Select
          bordered={false}
          style={{ width: 80 }}
          value={state.defaultValue}
          suffixIcon={<p></p>}
          onChange={handleChange}
        >
          {optinoKeys.map((option, index) => (
            <Option key={index} value={option} style={{ textAlign: "center" }}>
              {options[option].nativeName}
            </Option>
          ))}
        </Select>
        {/*  */}
        <div className="w155px flex items-center">
          <Avatar className="mr-3">
            <img
              alt="avatar"
              src="data:image/png;base64,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"
            />
          </Avatar>
          {t("欢迎您")}
          &nbsp;
          <Dropdown droplist={dropList} position="bl">
            <span style={{ cursor: "pointer" }} className="hover-color-blue">
              {userName} <IconDown />
            </span>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
