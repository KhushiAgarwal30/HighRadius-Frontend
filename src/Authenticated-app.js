export default function AuthenticatedApp({ user }) {
  return <h1>Currently logged in user has a level of: {user?.level}</h1>;
}
