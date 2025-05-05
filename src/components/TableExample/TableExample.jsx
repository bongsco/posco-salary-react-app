import '../../styles/table.css';

export default function TableExample() {
  return (
    <table>
      <thead>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>4</td>
          <td>5</td>
          <td>6</td>
        </tr>
        <tr>
          <td>7</td>
          <td>8</td>
          <td>9</td>
        </tr>
        <tr>
          <td>10</td>
          <td>11</td>
          <td>12</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td>15</td>
        </tr>
        <tr>
          <td colSpan="3" className="button_td">
            <button
              type="button"
              className="add_column"
              aria-label="add_button"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
