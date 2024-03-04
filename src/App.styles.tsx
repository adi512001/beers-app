import { Layout } from "antd";
import styled from "styled-components";

const { Content, Sider } = Layout;

export const Wrapper = styled.div`
  padding: 24px;
  text-align: center;
  background: #fff;
  border-radius: 8px;
  height: 98%;
`;

export const BeersLayout = styled(Layout)`
  height: 100%;
`;

export const BeersSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
`;

export const BeersContent = styled(Content)`
  margin: 24px 16px 0;
  overflow: initial;
`;
