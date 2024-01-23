import React, { useEffect, useState } from "react";

// scss
import "./candidateStyles.scss";

// data
const baseApi = "https://contact.mediusware.com/api";

const Problem2 = () => {
  const [modalOpen, setModalOpen] = useState(null);
  const [curPage, setCurPage] = useState(1);
  const [data, setData] = useState([]);
  const contactsEndpoint = `/contacts/?page=${curPage}`;
  const onlyUSContactsEndpoint = `/country-contacts/united%20states/?page=${curPage}`;

  useEffect(() => {
    if (modalOpen !== null) {
      fetch(
        `${baseApi}${
          modalOpen === "a" ? contactsEndpoint : onlyUSContactsEndpoint
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data.results);
        });
    }
  }, [modalOpen, curPage]);

  console.log(data);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() => setModalOpen("a")}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </button>
          <button
            onClick={() => setModalOpen("b")}
            className="btn btn-lg btn-outline-warning"
            type="button"
          >
            US Contacts
          </button>
        </div>

        {modalOpen !== null && (
          <div className="modal-container">
            <div className="modal-container__modal">
              <div className="modal-container__modal__btns">
                <button
                  className="modal-container__modal__btns_btn modal-a-btn"
                  onClick={() => setModalOpen("a")}
                >
                  All Contacts
                </button>

                <button
                  className="modal-container__modal__btns_btn modal-b-btn"
                  onClick={() => setModalOpen("b")}
                >
                  US Contacts
                </button>

                <button
                  className="modal-container__modal__btns_btn close-btn"
                  onClick={() => setModalOpen(null)}
                >
                  Close
                </button>
              </div>

              {data && data.length > 0 && (
                <ul>
                  {data.map((el) => {
                    return (
                      <li key={el.id}>
                        <p>
                          <span>{el.id}. </span>
                          <span>Phone: {el.phone} </span>
                          <span>Country: {el.country.name}</span>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problem2;
