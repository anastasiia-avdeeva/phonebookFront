export const Notification = ({ className, msg }) => {
  let classNames = "notification";
  if (className) classNames += ` ${className}`;
  return <p className={classNames}>{msg}</p>;
};
