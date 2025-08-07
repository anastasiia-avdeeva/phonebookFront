export const InputGroup = ({ labelText, inputProps }) => {
  return (
    <div className="input-group">
      <label className="label" htmlFor={inputProps.id}>
        {labelText}
      </label>
      <input className="input" {...inputProps} />
    </div>
  );
};
