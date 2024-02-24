import style from "./view.module.css";
import ImportExportIcon from "@mui/icons-material/ImportExport";

export default function View() {
  return (
    <div className={style.view}>
      <h2>View</h2>
      <ImportExportIcon style={{ cursor: "pointer" }}>Export</ImportExportIcon>
      <div>
        <table>
          <thead>
            <tr>
              <th>Items of evaluation</th>
              <th>Tick appropriate cate</th>
              <th>Point score</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.map((item, index) => (
              <tr key={index}>
                <td>{data.name}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
