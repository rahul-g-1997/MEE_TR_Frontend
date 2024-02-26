import style from "./view.module.css";
import React from "react";
import ImportExportIcon from "@mui/icons-material/ImportExport";

export default function View({ data }) {
  return (
    <div className={style.view}>
      <h2>MANAGEMENT EFFECTIVENESS EVALUATION OF TIGER RESERVES IN INDIA</h2>
      <div>
        <table style={{ padding: "10px" }}>
          <thead>
            <tr>
              <th>ITEMS OF EVALUATION (WITH SUPPORTIVE DOCUMENTS)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  {index + 1}. {item.title}
                  <table className={style.subItemsTable}>
                    <tbody>
                      {item.subItems.map((subitem, subIndex) => (
                        <React.Fragment key={subIndex}>
                          <tr>
                            <td>
                              {index + 1}:{subIndex + 1}. {subitem.title}
                            </td>
                            <td className={style.descriptionTd}>
                              ({subitem.description})<br />
                              {subitem.document.name}
                            </td>
                            <td className={style.questions}>
                              {/* Render questions here */}
                              <ol type="a">
                                {subitem.questions.map((question, qIndex) => (
                                  <li key={qIndex}>{question.question}</li>
                                ))}
                              </ol>
                            </td>
                            <td>POINT SCORE</td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ImportExportIcon style={{ cursor: "pointer" }}>Export</ImportExportIcon>
    </div>
  );
}
