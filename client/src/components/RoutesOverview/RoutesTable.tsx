const RoutesTable: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <table id="roadtripslist" /* style={{ border-collapse:"collapse" }} */>
      <tbody>{children}</tbody>
    </table>
  );
};

export default RoutesTable;
