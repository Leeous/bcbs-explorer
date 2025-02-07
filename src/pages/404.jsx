import { Link }  from "react-router";

export default function NotFound404() {
  return (
    <>
      <h1>404 - Not Found</h1>
      <Link to={"/"} style={{margin: "10px"}}>Search</Link>
      <Link to={"/Settings"} style={{margin: "10px"}}>Settings</Link>
    </>
  )
}