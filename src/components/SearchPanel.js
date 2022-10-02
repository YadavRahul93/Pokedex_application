import React from "react";
import styles from './SearchPanel.module.css'

function SearchPanel(props) {
  return (
    <>
      <div className={styles.input_srch}>
        <div className="input-group">
          <input
            type="search"
            placeholder="Name or Number"
            aria-describedby="button-addon1"
            className={`form-control ${styles.input_srch}`}
            onChange={(e) => props.dynamicFilter(e.target.value)}
          ></input>
          <div className="input-group-append">
            <button
              id="button-addon1"
              type="submit"
              className="btn btn-link text-primary"
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPanel;
