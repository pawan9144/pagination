import dynamic from "next/dynamic";
import { Main } from "../../layouts/main";

const Signup = dynamic(() => import("../../container/SignUp"), {
  suspense: true,
});

interface IProps {}

const AboutUs: React.FC<IProps> = (): JSX.Element => (
  <Main>
    <Signup />
  </Main>
);

export default AboutUs;
