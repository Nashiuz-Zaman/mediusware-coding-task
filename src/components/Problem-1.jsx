import React, { useState, useEffect, useRef } from "react";

const Problem1 = () => {
  // add states
  const [show, setShow] = useState("all");
  const [data, setData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [cur, setCur] = useState(0);

  const filterData = (data, status, setVisibleData) => {
    // if status all then sort and return
    if (status === "all") {
      const tempVisibleData = data.sort((a, b) => {
        return a.statusCode - b.statusCode;
      });

      setVisibleData(tempVisibleData);
      return;
    }

    // if status is specific filter and return
    const tempVisibleData = data.filter((el) => {
      const tempStatus = el.status.toLowerCase();
      return tempStatus === status;
    });

    setVisibleData(tempVisibleData);
    return;
  };

  // detect changes to show and data
  useEffect(() => {
    if (data.length) {
      filterData(data, show, setVisibleData);
    }
  }, [show, data.length]);

  // handle tab click
  const handleClick = (val) => {
    setShow(val);
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const status = form.status.value.trim();

    // if any of the inputs are missing terminate from here
    if (!name || !status) {
      return;
    }

    // assign number status code for sorting
    const statusToCheck = status.toLowerCase();
    const statusCode =
      statusToCheck === "active" ? 1 : statusToCheck === "completed" ? 2 : 3;

    // change data state array
    setData((prevData) => {
      const tempData = [...prevData];
      tempData.push({
        id: cur,
        name,
        status,
        statusCode,
      });
      return tempData;
    });

    // change cur number
    setCur((prev) => prev + 1);

    // reset input fields
    e.target.reset();
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          {/* form starts */}
          <form
            onSubmit={handleSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            {/* name field */}
            <div className="col-auto">
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>

            {/* status field */}
            <div className="col-auto">
              <input
                name="status"
                type="text"
                className="form-control"
                placeholder="Status"
              />
            </div>

            {/* submit button */}
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* tabs */}
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>

          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>

            {visibleData && visibleData.length > 0 && (
              <tbody>
                {visibleData.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.name}</td>
                      <td>{data.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
