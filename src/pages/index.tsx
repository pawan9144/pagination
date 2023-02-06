import dynamic from "next/dynamic";
import { HOME_META } from "../constants/home.constant";
import { Main } from "../layouts/main";
import { Meta } from "../layouts/meta";

const HomeComponent = dynamic(() => import("../container/Home"), {
  suspense: true,
  ssr: true,
});

interface IProps {}

const Index: React.FC<IProps> = (): JSX.Element => {
  return (
    <Main
      meta={
        <Meta
          twitter_site={HOME_META.twitter_site}
          twitter_id={HOME_META.twitter_id}
          twitter_creator={HOME_META.twitter_creator}
          twitter_image={HOME_META.twitter_image}
          keyword={HOME_META.keyword}
          website={HOME_META.website}
        />
      }
    >
      <HomeComponent />
    </Main>
  );
};

export default Index;
