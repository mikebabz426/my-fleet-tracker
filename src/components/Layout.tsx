import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import PropTypes from "prop-types";
// import Header from "./Header";
import "@fontsource/roboto";
import GlobalThemeProvider from "../GlobalThemeProvider";
import { useDistroContext } from "../DistroContext";
import { useSettingsContext } from "../SettingsContext";

interface Props {
  children?: React.ReactNode;
  margin: boolean;
  headerInfo: boolean;
}

const Layout: React.FC<Props> = ({ children, margin, headerInfo }) => {
  const { distro, setDistro } = useDistroContext();
  const { settings, setSettings } = useSettingsContext();

  return (
    <GlobalThemeProvider>
      <CssBaseline>
        {/* <Header
          infoDisplay={headerInfo}
          margin={margin}
          setDistro={() => setDistro(!distro)}
          distro={distro}
          settings={settings}
          setSettings={() => setSettings(!settings)}
        /> */}
        {children}
      </CssBaseline>
    </GlobalThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
