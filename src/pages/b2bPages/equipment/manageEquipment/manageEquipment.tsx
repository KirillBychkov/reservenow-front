import Flex from "@/components/UI/layout/flex";
import styles from "./manageEquipment.module.scss";
import { BreadCrumb } from "primereact/breadcrumb";
import { useParams } from "react-router-dom";
import { Home } from "@blueprintjs/icons";
import { ProgressSpinner } from "primereact/progressspinner";
import { ManageEquipmentForm } from "@/components/forms/manageEquipmentForm";

const ManageEquipment = () => {
  const { id } = useParams();
  const initValues = { id: 123 }; //Todo
  const isLoading = false
  const isEditingMode = id && initValues;

  // Localization
  return (
    <Flex options={{direction: 'column', gap: 2 }} className={styles.manageEquipment}>
      <Flex options={{ direction: "column", gap: 0.625 }}>
        <h3 className="heading heading-3">
          {isEditingMode ? "Редагувати товар" : "Додати товар"}
        </h3>
        <BreadCrumb
          home={{ icon: <Home color="gray" />, url: "/" }}
          model={[
            { label: "Товари", url: "/equipment" },
            {
              label: isEditingMode ? `${initValues.id}` : "Додати товар",
              url: "/equipment/add",
            },
          ]}
        />
      </Flex>
      <div className={styles.form}>{isLoading ? <ProgressSpinner /> : <ManageEquipmentForm />}</div>
    </Flex>
  );
};

export default ManageEquipment;
