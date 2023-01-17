import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OpportunityList = () => {
  const [Opportunitys, setOpportunity] = useState([]);

  useEffect(() => {
    getOpportunity();
  }, []);

  const getOpportunity = async () => {
    const response = await axios.get("http://127.0.0.1:4000/Opportunity");
    try {
      setOpportunity(response.data);

    }
    catch (error) {
      alert(error);
    }
  };

  const deleteOpportunity = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/Opportunity/${id}`);
      getOpportunity();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="columns mt-5">
      <div className="column is-half">
        <Link to="add" className="button is-success">
          Add New
        </Link>
        <table className="table is-striped is-fullwidth mt-2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Adress</th>
            </tr>
          </thead>
          <tbody>
            {Opportunitys.map((Opportunity, index) => (
              <tr key={Opportunity.Name}>
                <td>{Opportunity.Description}</td>
                <td>{Opportunity.Category}</td>
                <td>{Opportunity.Date}</td>
                <td>{Opportunity.Adress}</td>
                <td>
                  <Link
                    to={`edit/${Opportunity._id}`}
                    className="button is-info is-small mr-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteOpportunity(Opportunity._id)}
                    className="button is-danger is-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpportunityList;
