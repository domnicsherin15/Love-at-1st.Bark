import UserAuth from "@/components/UserAuth";
import PageTransition from "@/components/PageTransition";

const Auth = () => {
  return (
    <PageTransition variant="scale">
      <div className="cursor-paw">
        <UserAuth />
      </div>
    </PageTransition>
  );
};

export default Auth;