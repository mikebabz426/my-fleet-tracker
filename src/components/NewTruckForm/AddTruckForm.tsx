import * as React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  InputBase,
  Radio,
  Theme,
  Checkbox,
  Divider,
} from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Formik, Form, Field, useField, FieldAttributes } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";

//GQL Mutation to add new truck to database

const ADD_DRIVER = gql`
  mutation MyMutation(
    $driver: String!
    $truck: Int!
    $trailer: Int!
    $cell: String!
    $type: String!
    $team: String!
    $hazmat: Boolean!
    $tanker: Boolean!
  ) {
    insert_fleet_table_one(
      object: {
        driver: $driver
        truck: $truck
        trailer: $trailer
        cell: $cell
        type: $type
        team: $team
        hazmat: $hazmat
        tanker: $tanker
      }
    ) {
      id
    }
  }
`;

//Form Validation:

let truckSchema = Yup.object().shape({
  driverName: Yup.string().required().min(3),
  phoneNumber: Yup.string().required().min(12),
  truckNumber: Yup.number().required().positive().integer(),
  trailerNumber: Yup.number().required().positive().integer(),
  trailerType: Yup.string().required(),
  team: Yup.string().required(),
});

//Form Component

const AddTruckForm = (props) => {
  const { toggle } = props;

  const [addDriver] = useMutation(ADD_DRIVER);
  const teams = ["Mike", "Alex", "Chip", "Vlad"];

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        backgroundColor: "#fff",
        borderRadius: "3px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar>
        <LocalShippingIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Add Driver
      </Typography>
      <Formik
        initialValues={{
          driverName: "",
          phoneNumber: "",
          truckNumber: "",
          trailerNumber: "",
          trailerType: "",
          team: "",
          hazmat: false,
          tanker: false,
        }}
        validationSchema={truckSchema}
        onSubmit={(values) => {
          addDriver({
            variables: {
              driver: values.driverName,
              truck: parseInt(values.truckNumber, 10),
              trailer: parseInt(values.trailerNumber, 10),
              cell: values.phoneNumber,
              team: values.team,
              type: values.trailerType,
              hazmat: values.hazmat,
              tanker: values.tanker,
            },
          });
          toggle(false);
        }}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <Field
                name="driverName"
                type="input"
                variant="outlined"
                margin="normal"
                label="Driver Name"
                required
                fullWidth
                as={TextField}
              />
              {errors.driverName && touched.driverName ? (
                <Typography color="error">
                  Please enter a valid driver name
                </Typography>
              ) : null}
              <Field
                name="phoneNumber"
                type="input"
                variant="outlined"
                margin="normal"
                label="Phone Number"
                required
                fullWidth
                as={TextField}
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <Typography color="error">
                  Please enter a valid phone number: xxx-xxx-xxxx
                </Typography>
              ) : null}
              <Field
                name="truckNumber"
                type="input"
                variant="outlined"
                margin="normal"
                label="Truck Number"
                required
                fullWidth
                as={TextField}
              />
              {errors.truckNumber && touched.truckNumber ? (
                <Typography color="error">
                  Please enter a valid truck number
                </Typography>
              ) : null}
              <Field
                name="trailerNumber"
                type="input"
                variant="outlined"
                margin="normal"
                label="Trailer Number"
                required
                fullWidth
                as={TextField}
              />
              {errors.trailerNumber && touched.trailerNumber ? (
                <Typography color="error">
                  Please enter a valid trailer number
                </Typography>
              ) : null}
              <Divider sx={{ m: 5 }} />
              <Typography variant="body1" style={{ fontWeight: 500 }}>
                Select Trailer Type:{" "}
              </Typography>
              <CustomRadio
                value="53' Reefer"
                name="trailerType"
                type="radio"
                label="53 Reefer"
              />
              <CustomRadio
                value="53' Van"
                name="trailerType"
                type="radio"
                label="53 Van"
              />
              {errors.trailerType && touched.trailerType ? (
                <Typography color="error">
                  Please select a trailer type
                </Typography>
              ) : null}
              <Divider sx={{ m: 5 }} />
              <Box
                sx={{
                  dispaly: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Typography variant="body1" style={{ fontWeight: 500 }}>
                  Select Endorsements:
                </Typography>
                <Field type="checkbox" name="hazmat" as={Checkbox} />
                <Typography display="inline" variant="body1">
                  Hazmat
                </Typography>

                <Field type="checkbox" name="tanker" as={Checkbox} />
                <Typography display="inline" variant="body1">
                  Tanker
                </Typography>
              </Box>
              <Divider sx={{ m: 5 }} />
              <Typography variant="body1" style={{ fontWeight: 500 }}>
                Select Team: -
              </Typography>
              <FormControl variant="outlined">
                <Field
                  className="selected"
                  as={Select}
                  name="team"
                  variant="outlined"
                  input={<InputBase />}
                >
                  {teams.map((team) => (
                    <MenuItem className="selected" value={team} key={team}>
                      {team}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
              {errors.team && touched.team ? (
                <Typography color="error">Please select a team</Typography>
              ) : null}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Add New Driver
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

//Custom Styling

//Custom Styles

// const CustomInput = withStyles((theme: Theme) => ({
//   input: {
//     borderRadius: 4,
//     position: "relative",
//     backgroundColor: theme.palette.background.paper,
//     border: "1px solid #ced4da",
//     fontSize: 16,
//     padding: "10px 26px 10px 12px",
//     transition: theme.transitions.create(["border-color", "box-shadow"]),

//     "&:focus": {
//       borderRadius: 4,
//       borderColor: theme.palette.secondary,
//       boxShadow: `0 0 0 0.2rem rgba(102,187,106,.75)`,
//     },
//   },
// }))(InputBase);

type MyRadioProps = { label: string } & FieldAttributes<{}>;

const CustomRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

export default AddTruckForm;
