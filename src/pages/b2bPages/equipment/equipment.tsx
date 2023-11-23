import useFetch from "@/hooks/useFetch";
import { IEquipment } from "@/models/IEquipment";
import styles from "./equipment.module.scss";
import equipmentStore from "@/store/EquipmentStore";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import Searchbar from "@/components/searchbar/searchbar";
import { Plus } from "@blueprintjs/icons";
import Button from "@/components/UI/buttons/button";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { useSort } from "@/hooks/useSort";
import usePaginate from "@/hooks/usePaginate";
import { observer } from "mobx-react-lite";
import { EquipmentTable } from "@/components/tables/equipmentTable";
import ToastContext from "@/context/toast";

const Equipment: React.FC = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useContext(ToastContext);
  const [search, setSearch] = useState("");
  const { sort, sortField, sortOrder, handleSort } = useSort();
  const { limit, skip, first, onPageChange } = usePaginate(
    equipmentStore.filters
  );
  const {
    data: equipment,
    isLoading,
    errorMsg,
  } = useFetch<IEquipment[]>(
    () => equipmentStore.getEquipment({ limit, skip, search, sort }),
    [limit, skip, search, sort]
  );
  const isEquipmentEmpty = equipment && equipment.length === 0 && !isLoading;

  if (errorMsg) {
    showError(errorMsg);
  }

  return (
    <div className={styles.equipment}>
      <h3 className="heading heading-3">{t("equipment.equipment")}</h3>
      <div className={styles.controls}>
        <Searchbar setSearch={setSearch} />
        <Button onClick={() => navigate('add')} icon={<Plus color="white" />}>
          {t("actions.addEquipment")}
        </Button>
      </div>
      {isLoading && (
        <div className={styles.content}>
          <ProgressSpinner />
        </div>
      )}

      {equipment?.length && (
        <EquipmentTable
          equipment={equipment}
          onPageChange={onPageChange}
          onSortChange={handleSort}
          first={first}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      )}

      {isEquipmentEmpty && (
        <div className={styles.content}>
          <h2 className="heading heading-2 heading-primary text-center">
            {t("equipment.empty")}
          </h2>
          <Button icon={<Plus color="white" />} onClick={() => navigate("add")}>
            {t("actions.addEquipment")}
          </Button>
        </div>
      )}
    </div>
  );
});

export default Equipment;
