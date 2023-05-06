import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Pagination,
} from "@mui/material";
import "./Order.css";
import { temp } from "../../Data/data";

const Orders = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [editedData, setEditedData] = useState({});
  const [data, setData] = useState(temp);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleChildEdit = (childId, field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [childId]: {
        ...prevData[childId],
        [field]: value,
      },
    }));
  };

  const handleRowClick = (rowId) => {
    if (expandedRow === rowId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(rowId);
    }
  };

  const handleSort = () => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (sortDirection === "asc") {
        return new Date(a.created) - new Date(b.created);
      } else {
        return new Date(b.created) - new Date(a.created);
      }
    });
    setData(sortedData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleSave = () => {
    // Apply the edited values to the original data array
    const updatedData = data.map((row) => ({
      ...row,
      children: row.children.map((child) => ({
        ...child,
        ...editedData[child.id],
      })),
    }));

    // Update the data state and clear the editedData state
    setData(updatedData);
    setEditedData({});
    setExpandedRow(null);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="order_head">
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell onClick={handleSort} style={{ cursor: "pointer" }}>
                Created
                {sortDirection === "asc" ? " ▲" : " ▼"}
              </TableCell>
              <TableCell>Internal Notes</TableCell>
              <TableCell>Issue Count</TableCell>
              <TableCell>Modified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((row) => {
              const createdDate = row.created;
              const dateObj = new Date(createdDate);
              const formattedDate = dateObj.toISOString().slice(0, 10);

              return (
                <React.Fragment key={row.id}>
                  <TableRow
                    className="children_prop"
                    onClick={() => handleRowClick(row.id)}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.amount_str}</TableCell>
                    <TableCell>{row.customerName}</TableCell>
                    <TableCell>{row.companyName}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>{row.internalNotes}</TableCell>
                    <TableCell>{row.issueCount}</TableCell>
                    <TableCell>{row.modified}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                    >
                      <Collapse
                        in={expandedRow === row.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Table>
                          <TableBody>
                            {row.children.map((child) => (
                              <TableRow key={child.id}>
                                <TableCell colSpan={3}>
                                  {" "}
                                  <strong>Child ID:</strong> {child.id}
                                </TableCell>
                                <TableCell colSpan={3}>
                                  <strong>Amount:</strong>{" "}
                                  <input
                                    type="text"
                                    value={
                                      editedData[child.id]?.amount_str ||
                                      child.amount_str
                                    }
                                    onChange={(e) =>
                                      handleChildEdit(
                                        child.id,
                                        "amount_str",
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>

                                <TableCell>
                                  <strong>Company Name:</strong>{" "}
                                  <input
                                    type="text"
                                    value={
                                      editedData[child.id]?.companyName ||
                                      child.companyName
                                    }
                                    onChange={(e) =>
                                      handleChildEdit(
                                        child.id,
                                        "companyName",
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>
                                {/* <TableCell>{child.created}</TableCell> */}
                                <TableCell>
                                  <strong>Created:</strong>{" "}
                                  <input
                                    type="text"
                                    value={
                                      editedData[child.id]?.created ||
                                      child.created
                                    }
                                    onChange={(e) =>
                                      handleChildEdit(
                                        child.id,
                                        "created",
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>

                                <TableCell>
                                  <strong>Email:</strong>{" "}
                                  <input
                                    type="text"
                                    value={
                                      editedData[child.id]?.email || child.email
                                    }
                                    onChange={(e) =>
                                      handleChildEdit(
                                        child.id,
                                        "email",
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>

                                <TableCell>
                                  <strong>FirstName:</strong>{" "}
                                  <input
                                    type="text"
                                    value={
                                      editedData[child.id]?.firstName ||
                                      child.firstName
                                    }
                                    onChange={(e) =>
                                      handleChildEdit(
                                        child.id,
                                        "firstName",
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>

                                <TableCell>
                                  <strong>Last Name:</strong>{" "}
                                  <input
                                    type="text"
                                    value={
                                      editedData[child.id]?.lastName ||
                                      child.lastName
                                    }
                                    onChange={(e) =>
                                      handleChildEdit(
                                        child.id,
                                        "lastName",
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>

                                <TableCell>
                                  <strong>Sales PersonId:</strong>{" "}
                                  <input
                                    type="text"
                                    value={
                                      editedData[child.id]?.salespersonId ||
                                      child.salespersonId
                                    }
                                    onChange={(e) =>
                                      handleChildEdit(
                                        child.id,
                                        "salespersonId",
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <strong>Telephone:</strong>{" "}
                                  <input
                                    type="text"
                                    value={
                                      editedData[child.id]?.telephone ||
                                      child.telephone
                                    }
                                    onChange={(e) =>
                                      handleChildEdit(
                                        child.id,
                                        "telephone",
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>
                                <button
                                  onClick={handleSave}
                                  className="save-button"
                                >
                                  Save
                                </button>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(data.length / itemsPerPage)}
        page={currentPage}
        onChange={(event, page) => setCurrentPage(page)}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </>
  );
};

export default Orders;
