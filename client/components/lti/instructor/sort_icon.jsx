export const SortIcon = ({ currentKey, expectedKey, direction }) => {
  if (currentKey !== expectedKey) return null;
  if (direction === 'ASC') {
    return <span className="material-icons">arrow_downward</span>;
  }
  return <span className="material-icons">arrow_upward</span>;
};
