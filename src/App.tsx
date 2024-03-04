import "./App.css";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import BrowseBeers from "./components/BrowseBeers/BrowseBeers";
import FavoriteBeers from "./components/FavoriteBeers/FavoriteBeers";
import { HeartFilled, HomeFilled } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { BeersContent, BeersLayout, BeersSider, Wrapper } from "./App.styles";

const items: MenuProps["items"] = [
  {
    label: <Link to={"/"}>Browse Beers</Link>,
    key: "1",
    icon: <HomeFilled />,
  },
  {
    label: <Link to={"/favorites"}>Favorite Beers</Link>,
    key: "2",
    icon: <HeartFilled />,
  },
];

const getCurrentPage = (pathname: string) => {
  if (pathname === "/favorites") {
    return ["2"];
  }
  return ["1"];
};

const App = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <BeersLayout hasSider>
      <BeersSider>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={getCurrentPage(pathname)}
          items={items}
        />
      </BeersSider>
      <Layout>
        <BeersContent>
          <Wrapper>
            <Routes>
              <Route path="/" Component={BrowseBeers} />
              <Route path="/favorites" Component={FavoriteBeers} />
            </Routes>
          </Wrapper>
        </BeersContent>
      </Layout>
    </BeersLayout>
  );
};

export default App;
