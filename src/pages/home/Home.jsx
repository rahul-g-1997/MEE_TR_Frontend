import { Signin } from "../../components/index";

export default function Home(islogin) {
  return <div>{islogin && <Signin /> }</div>;
}
