import { Layout } from "@arco-design/web-react";
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

import MyContent from "./Content";
import LeftSider from "./LeftSider";
import { TopBar } from "./TopBar";

const MyLayout: React.FC = () => {
  return (
    <>
      <Layout style={{ userSelect: "none" }}>
        <Header>
          <TopBar />
        </Header>
        <Layout>
          <Sider style={{ width: "auto" }}>
            <LeftSider />
          </Sider>
          <Content>
            <MyContent />
          </Content>
        </Layout>
        {/* <Footer>Footer</Footer> */}
      </Layout>
    </>
  );
};

export default MyLayout;
