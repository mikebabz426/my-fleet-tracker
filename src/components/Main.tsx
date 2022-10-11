import * as React from "react";
import { Grid } from "@mui/material";
import FleetTable from "./Table/FleetTable";
import { gql, useSubscription } from "@apollo/client";
import { useDistroContext } from "../DistroContext";
import { useSettingsContext } from "../SettingsContext";
// import Distro from "./Distro/Distro"
// import FleetManagement from "../components/FleetManagement/FleetManagement"

interface Props {
  children?: React.ReactNode;
}

const FLEET_ALL = gql`
  subscription FLEET_ALL {
    fleet_table {
      appt
      cell
      day
      driver
      id
      city
      needs
      notes
      status
      team
      time
      trailer
      truck
      type
      usState
      hazmat
      tanker
    }
  }
`;

const Main: React.FC<Props> = ({}) => {
  const { loading, error, data } = useSubscription(FLEET_ALL);
  const { distro } = useDistroContext();
  const { settings } = useSettingsContext();

  return (
    <Grid container>
      <Grid item xs={false} sm={false} />
      <Grid item xs={12} sm={12}>
        {distro ? (
          // <Distro loading={loading} data={data} error={error} />

          <h1>This is the distro</h1>
        ) : settings ? (
          // <FleetManagement loading={loading} data={data} error={error} />
          <h1>This is the Fleet Management Area</h1>
        ) : (
          <FleetTable loading={loading} data={data} error={error} />
        )}
      </Grid>
      <Grid item xs={false} sm={false} />
    </Grid>
  );
};

export default Main;
