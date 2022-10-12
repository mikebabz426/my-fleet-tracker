import * as React from "react";
import { useState } from "react";
import {
  TableRow,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputBase,
  FormControl,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import EditButton from "../Buttons/EditButton";
import UpdateButton from "../Buttons/UpdateButton";
import DeleteButton from "../Buttons/DeleteButton";
import { Formik, Field } from "formik";
import { useMutation, gql } from "@apollo/client";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#EBF5FF",
  },
}));

const UPDATE_DRIVER = gql`
  mutation Update(
    $id: uuid!
    $driver: String!
    $cell: String!
    $truck: Int!
    $trailer: Int!
    $type: String!
    $team: String!
    $hazmat: Boolean!
    $tanker: Boolean!
  ) {
    update_fleet_table_by_pk(
      pk_columns: { id: $id }
      _set: {
        driver: $driver
        cell: $cell
        truck: $truck
        trailer: $trailer
        type: $type
        team: $team
        hazmat: $hazmat
        tanker: $tanker
      }
    ) {
      driver
      cell
      truck
      trailer
      type
      team
      hazmat
      tanker
    }
  }
`;
const DELETE_DRIVER = gql`
  mutation Delete($id: uuid!) {
    delete_fleet_table_by_pk(id: $id) {
      driver
    }
  }
`;

const DriverRow = (props) => {
  const [updateDriver] = useMutation(UPDATE_DRIVER);
  const [deleteDriver] = useMutation(DELETE_DRIVER);
  const { id, driver, cell, truck, trailer, type, team, hazmat, tanker } =
    props;

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this driver?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will permanently delete the driver entry!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Go Back
          </Button>
          <Button
            onClick={() =>
              deleteDriver({
                variables: {
                  id: id,
                },
              })
            }
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Formik
        initialValues={{
          id: id,
          driver: driver,
          cell: cell,
          truck: truck,
          trailer: trailer,
          type: type,
          team: team,
          hazmat: hazmat,
          tanker: tanker,
          edit: false,
        }}
        onSubmit={(values) => {
          updateDriver({
            variables: {
              id: values.id,
              driver: values.driver,
              cell: values.cell,
              truck: parseInt(values.truck),
              trailer: parseInt(values.trailer),
              type: values.type,
              team: values.team,
              hazmat: values.hazmat,
              tanker: values.tanker,
            },
          });
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => {
          return (
            <StyledTableRow key={id}>
              {/* Enables Editing Mode for each row */}

              <StyledTableCell>
                {values.edit === false ? (
                  <EditButton
                    size="small"
                    color="primary"
                    variant="outlined"
                    click={() => {
                      setFieldValue("edit", true, false);
                    }}
                  />
                ) : (
                  <UpdateButton
                    size="small"
                    color="secondary"
                    variant="contained"
                    click={() => {
                      handleSubmit();
                      setFieldValue("edit", false, false);
                    }}
                  />
                )}
              </StyledTableCell>

              <StyledTableCell>
                {values.edit === false ? (
                  <Typography>{values.driver}</Typography>
                ) : (
                  <Field
                    name="driver"
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
                  <Typography>{values.cell}</Typography>
                ) : (
                  <Field
                    name="cell"
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
                  <Typography>{values.truck}</Typography>
                ) : (
                  <Field
                    name="truck"
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
                  <Typography>{values.trailer}</Typography>
                ) : (
                  <Field
                    name="trailer"
                    type="input"
                    size="small"
                    color="secondary"
                    variant="outlined"
                    as={TextField}
                  />
                )}
              </StyledTableCell>

              <StyledTableCell>
                {values.edit === false && values.type === "53' Van" ? (
                  <Typography sx={{ fontWeight: 500, color: "#43a047" }}>
                    {values.type}
                  </Typography>
                ) : values.edit === false && values.type === "53' Reefer" ? (
                  <Typography sx={{ fontWeight: 500, color: "#f44336" }}>
                    {type}
                  </Typography>
                ) : (
                  <FormControl variant="outlined">
                    <Field
                      as={Select}
                      name="type"
                      variant="outlined"
                      size="small"
                    >
                      <MenuItem value="53' Van">53' Van</MenuItem>
                      <MenuItem value="53' Reefer">53' Reefer</MenuItem>
                    </Field>
                  </FormControl>
                )}
              </StyledTableCell>

              <StyledTableCell>
                {values.edit === false ? (
                  <Typography>{values.team}</Typography>
                ) : (
                  <FormControl variant="outlined">
                    <Field
                      as={Select}
                      name="team"
                      variant="outlined"
                      size="small"
                    >
                      <MenuItem value="Alex">Alex</MenuItem>
                      <MenuItem value="Mike">Mike</MenuItem>
                      <MenuItem value="Bobby">Bobby</MenuItem>
                    </Field>
                  </FormControl>
                )}
              </StyledTableCell>
              <StyledTableCell>
                {values.edit === false ? (
                  values.hazmat === true ? (
                    <CheckBox color="secondary" />
                  ) : (
                    <CheckBoxOutlineBlank color="secondary" />
                  )
                ) : (
                  <Field
                    name="hazmat"
                    as={Checkbox}
                    id={id}
                    checked={values.hazmat}
                  />
                )}
              </StyledTableCell>
              <StyledTableCell>
                {values.edit === false ? (
                  values.tanker === true ? (
                    <CheckBox color="secondary" />
                  ) : (
                    <CheckBoxOutlineBlank color="secondary" />
                  )
                ) : (
                  <Field
                    name="tanker"
                    as={Checkbox}
                    id={id}
                    checked={values.tanker}
                  />
                )}
              </StyledTableCell>
              <StyledTableCell>
                {values.edit === false ? (
                  <DeleteButton
                    variant="outlined"
                    size="small"
                    click={() => setOpen(true)}
                  />
                ) : null}
              </StyledTableCell>
            </StyledTableRow>
          );
        }}
      </Formik>
    </>
  );
};

export default DriverRow;
