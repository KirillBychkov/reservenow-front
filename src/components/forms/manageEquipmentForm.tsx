import FormField from "../UI/fields/formField";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import styles from "./manageEquipmentForm.module.scss";
import Flex from "../UI/layout/flex";
import Button from "../UI/buttons/button";
import { InputNumber } from "primereact/inputnumber";

export const ManageEquipmentForm = () => {


  return (
    <form action="">
      <Flex options={{ direction: "column", gap: 1.5 }}>
        <div className={styles.formSection}>
          <FormField label="Назва товару">
            <InputText placeholder="Ім'я" />
          </FormField>
          <FormField label="Опис">
            <InputTextarea autoResize rows={7} placeholder="Введіть опис"/>
          </FormField>
        </div>

        <div className={styles.formSection}>
          <FormField label="Ціна">
            <InputNumber size={100} prefix="₴" />
          </FormField>
        </div>

        <Flex options={{justify:'flex-end', gap: 1}}>
          <Button  type='reset' severity='danger' fill className={styles.btn} >Скасувати</Button>
          <Button type='submit' fill className={styles.btn}>Додати товар</Button>
        </Flex>
      </Flex>
    </form>
  );
};
