import '../../styles/table.css';

export default function Table() {
  return (
    <table className="table">
      <thead>
        <tr className="table_row">
          <td className="table_element table_header">1</td>
          <td className="table_element table_header">2</td>
          <td className="table_element table_header">3</td>
        </tr>
      </thead>
      <tbody>
        <tr className="table_row">
          <td className="table_element table_body">4</td>
          <td className="table_element table_body">5</td>
          <td className="table_element table_body">6</td>
        </tr>
        <tr className="table_row">
          <td className="table_element table_body">7</td>
          <td className="table_element table_body">8</td>
          <td className="table_element table_body">9</td>
        </tr>
        <tr className="table_row">
          <td className="table_element table_body">10</td>
          <td className="table_element table_body">11</td>
          <td className="table_element table_body">12</td>
        </tr>
        <tr className="table_row">
          <td className="table_element table_body">13</td>
          <td className="table_element table_body">14</td>
          <td className="table_element table_body">15</td>
        </tr>
      </tbody>
    </table>
  );
}
