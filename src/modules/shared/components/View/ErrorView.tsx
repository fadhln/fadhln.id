// TODO: update this component
function ErrorView({ error }: { error: Error | string }) {
  return <div>{typeof error === "string" ? error : error.message}</div>;
}

export default ErrorView;
