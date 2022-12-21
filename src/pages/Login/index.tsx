import "./index.css";

import { getCheckCode } from "@/api";
import { LoginType } from "@/api/type";
import { loginAsync } from "@/store/loginSlice";
import { AppDispatch } from "@/store/store";
import {
  Button,
  Form,
  FormInstance,
  Image,
  Input,
} from "@arco-design/web-react";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
const FormItem = Form.Item;

const Login: React.FC = () => {
  const formRef = useRef<FormInstance>(null);
  const dispatch: AppDispatch = useDispatch();

  type State = {
    img: string;
    code: number;
  };

  const [state, setState] = useState<State>({ img: "", code: 0 });

  const handleClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    setState({ ...state, code: Math.floor(Math.random() * 10) });
  };

  const init = () => {
    getCheckCode(state.code).then(({ data }) => {
      setState({ ...state, img: window.URL.createObjectURL(data) });
    });
  };

  const handleSubmit = async () => {
    if (formRef.current) {
      const value = await formRef.current.validate();
      const data: LoginType = {
        clientToken: state.code,
        code: value.checkCode,
        loginName: value.userName,
        loginType: 0,
        password: value.passWord,
      };

      dispatch(loginAsync(data));
    }
  };

  useEffect(() => {
    init();
    const subToken: string = PubSub.subscribe("loginError", () => {
      init();
    });

    return () => {
      PubSub.unsubscribe(subToken);
    };
  }, [state.code]);

  return (
    <div className="login flex justify-center items-center">
      <div className="w-518px h-388px bg-white rounded-4 relative">
        <img
          src="src/assets/logo.png"
          className="img w30 h30 absolute"
          alt="logo"
        />
        <div className="form mt20 p-4">
          <Form
            ref={formRef}
            autoComplete="off"
            size="large"
            style={{ width: "615px" }}
            initialValues={{
              userName: "admin",
              passWord: "admin",
            }}
          >
            <FormItem field={"userName"}>
              <Input placeholder="账号" />
            </FormItem>
            <FormItem field={"passWord"}>
              <Input.Password placeholder="密码" />
            </FormItem>
            <FormItem field={"checkCode"} className="check-code">
              <Input
                placeholder="验证码"
                suffix={
                  <Image
                    onClick={handleClick}
                    height="36px"
                    preview={false}
                    src={state.img}
                  />
                }
              />
            </FormItem>
            <FormItem>
              <Button
                onClick={handleSubmit}
                style={{ width: "100%" }}
                type="primary"
              >
                Submit
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
