import { BreadCrumb } from "primereact/breadcrumb";
import styles from "./password.module.scss";
import { Home, TickCircle } from "@blueprintjs/icons";
import Flex from "@/components/UI/layout/flex";
import PasswordChangeForm from "@/components/forms/passwordChangeForm";
import { useState } from "react";
import Button from "@/components/UI/buttons/button";
import { useNavigate } from "react-router-dom";

const PasswordPage = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const navigate = useNavigate()

  const handlePasswordChange = () => {
    setIsPasswordChanged(true);
  };

  return (
    <Flex
      options={{ direction: "column", gap: 2 }}
      className={styles.passwordPage}
    >
      <article>
        <h3 className="heading heading-3">Змінити пароль</h3>
        <BreadCrumb
          home={{ icon: <Home color="gray" />, url: "/" }}
          model={[
            { label: "Профіль", url: "/profile" },
            {
              label: "Змінити пароль",
              url: "/profile/password",
              disabled: true,
            },
          ]}
        />
      </article>

      <article className={styles.section}>
        {isPasswordChanged ? (
          <Flex options={{direction: 'column', gap: 1}} className={styles.success}>
            <TickCircle size={80} color='#62D96B' />
            <h1 className="heading heading-1 heading-primary">Пароль змінений</h1>
            <p>Lorem Ipsum є псевдо- латинський текст використовується у веб - дизайні, типографіка, верстка, і друку замість англійської </p>
            <Button onClick={() => navigate('/')} fill className={styles.btn}>На головну</Button>
          </Flex>
        ) : (
          <PasswordChangeForm onSubmit={handlePasswordChange} />
        )}
      </article>
    </Flex>
  );
};

export default PasswordPage;
