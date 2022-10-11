import * as React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Typography,
  TextField,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  Checkbox,
  Snackbar,
  IconButton,
} from "@mui/material";
import {
  EditTwoTone,
  SaveRounded,
  CheckBox,
  CheckBoxOutlineBlank,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Haz from "../../assets/hazmat-icon.svg";
import Tnkr from "../../assets/tanker-icon.svg";
import { Formik, Field } from "formik";
import { weekDays, states, truckStatus } from "./../../services/services";
import { useMutation, gql } from "@apollo/client";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#EBF5FF",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0257A2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: ".5rem 1rem .5rem 1rem",
  },
}));

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UPDATE_TRUCK = gql`
  mutation Update(
    $id: uuid!
    $day: String!
    $city: String!
    $usState: String!
    $time: String!
    $appt: Boolean!
    $status: String!
    $needs: String!
    $notes: String!
  ) {
    update_fleet_table_by_pk(
      pk_columns: { id: $id }
      _set: {
        day: $day
        city: $city
        usState: $usState
        time: $time
        appt: $appt
        status: $status
        needs: $needs
        notes: $notes
      }
    ) {
      day
      city
      usState
      time
      appt
      status
      needs
      notes
    }
  }
`;

const TruckRow = (props) => {
  const [updateTruck] = useMutation(UPDATE_TRUCK);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const {
    id,
    day,
    driver,
    cell,
    truck,
    trailer,
    type,
    city,
    usState,
    time,
    appt,
    status,
    needs,
    notes,
    hazmat,
    tanker,
  } = props;

  return (
    <>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Driver Info Copied!
        </Alert>
      </Snackbar>
      <Formik
        initialValues={{
          id: id,
          day: day,
          city: city,
          usState: usState,
          time: time,
          appt: appt,
          status: status,
          needs: needs,
          notes: notes,
          edit: false,
        }}
        onSubmit={(values) => {
          updateTruck({
            variables: {
              id: values.id,
              day: values.day,
              city: values.city,
              usState: values.usState,
              time: values.time,
              appt: values.appt,
              status: values.status,
              needs: values.needs,
              notes: values.notes,
            },
          });
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => {
          const copyText = `
          Driver Name: ${driver},
          Truck: ${truck}, 
          Trailer: ${trailer}, 
          Phone: ${cell}
          `;

          return (
            <StyledTableRow key={id}>
              <StyledTableCell />
              {/* Enable Editing Mode on the truck row */}
              <StyledTableCell>
                {values.edit === false ? (
                  <IconButton
                    color="primary"
                    aria-label="Edit Driver Row"
                    component="span"
                    size="small"
                  >
                    <EditTwoTone
                      color="primary"
                      onClick={() => {
                        setFieldValue("edit", true, false);
                      }}
                      fontSize="small"
                    />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="Update Driver Row"
                    component="span"
                  >
                    <SaveRounded
                      color="secondary"
                      fontSize="small"
                      onClick={() => {
                        handleSubmit();
                        setFieldValue("edit", false, false);
                      }}
                    />
                  </IconButton>
                )}
              </StyledTableCell>

              <StyledTableCell>
                {values.edit === false ? (
                  <Typography>{values.day}</Typography>
                ) : (
                  <FormControl
                    variant="outlined"
                    size="small"
                    sx={(theme) => ({ margin: theme.spacing(1), minWidth: 80 })}
                  >
                    <Field as={Select} name="day" variant="outlined">
                      {weekDays.map((day) => (
                        <MenuItem value={day} key={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                )}
              </StyledTableCell>
              <StyledTableCell>{cell}</StyledTableCell>
              <StyledTableCell>{driver}</StyledTableCell>
              <StyledTableCell>{truck}</StyledTableCell>
              <StyledTableCell>{trailer}</StyledTableCell>
              <StyledTableCell>
                {hazmat ? (
                  <Haz
                    sx={{ maxWidth: 18, maxHeight: 18, margin: "0px 3px" }}
                  />
                ) : null}
                {tanker ? (
                  <Tnkr
                    sx={{ maxWidth: 18, maxHeight: 18, margin: "0px 3px" }}
                  />
                ) : null}
              </StyledTableCell>
              <StyledTableCell>
                <Typography>{type}</Typography>
              </StyledTableCell>
              <StyledTableCell>
                {values.edit === false ? (
                  <Typography>{values.city}</Typography>
                ) : (
                  <Field
                    name="city"
                    type="input"
                    size="small"
                    color="secondary"
                    variant="outlined"
                    as={TextField}
                  />
                )}
              </StyledTableCell>
              <StyledTableCell>
                {values.edit === false ? (
                  <Typography>{values.usState}</Typography>
                ) : (
                  <FormControl
                    variant="outlined"
                    size="small"
                    sx={(theme) => ({ margin: theme.spacing(1), minWidth: 80 })}
                  >
                    <Field as={Select} name="usState" variant="outlined">
                      {states.map((st) => (
                        <MenuItem value={st} key={st}>
                          {st}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                )}
              </StyledTableCell>
              <StyledTableCell>
                {values.edit === false ? (
                  <Typography>{values.time}</Typography>
                ) : (
                  <Field
                    name="time"
                    type="input"
                    size="small"
                    color="secondary"
                    as={TextField}
                  />
                )}
              </StyledTableCell>
              <StyledTableCell>
                {values.edit === false ? (
                  values.appt === true ? (
                    <CheckBox color="secondary" />
                  ) : (
                    <CheckBoxOutlineBlank color="secondary" />
                  )
                ) : (
                  <Field
                    name="appt"
                    as={Checkbox}
                    id={id}
                    checked={values.appt}
                  />
                )}
              </StyledTableCell>
              <StyledTableCell>
                {values.edit === false ? (
                  <Typography>{values.status}</Typography>
                ) : (
                  <FormControl
                    variant="outlined"
                    size="small"
                    sx={(theme) => ({ margin: theme.spacing(1), minWidth: 80 })}
                  >
                    <Field as={Select} name="status" variant="outlined">
                      {truckStatus.map((st) => (
                        <MenuItem value={st} key={st}>
                          {st}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                )}
              </StyledTableCell>
              <StyledTableCell>
                {values.edit === false ? (
                  <Typography>{values.needs}</Typography>
                ) : (
                  <Field
                    name="needs"
                    type="input"
                    variant="outlined"
                    size="small"
                    color="secondary"
                    as={TextField}
                  />
                )}
              </StyledTableCell>
              <StyledTableCell>
                {values.edit === false ? (
                  <Typography>{values.notes}</Typography>
                ) : (
                  <Field
                    name="notes"
                    type="input"
                    variant="outlined"
                    size="small"
                    color="secondary"
                    as={TextField}
                  />
                )}
              </StyledTableCell>
              <StyledTableCell>
                <CopyToClipboard text={copyText} onCopy={handleClick}>
                  <IconButton
                    color="primary"
                    aria-label="Copy Driver Info"
                    component="span"
                    size="small"
                  >
                    <FileCopyIcon fontSize="small" />
                  </IconButton>
                </CopyToClipboard>
              </StyledTableCell>
            </StyledTableRow>
          );
        }}
      </Formik>
    </>
  );
};

export default TruckRow;
