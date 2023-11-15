import useFetch from "@/hooks/useFetch";
import { IEquipment } from "@/models/IEquipment";
import styles from "./equipment.module.scss";
import equipmentStore from "@/store/EquipmentStore";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Searchbar from "@/components/searchbar/searchbar";
import { Plus } from "@blueprintjs/icons";
import Button from "@/components/UI/buttons/button";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

const Equipment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data, isLoading } = useFetch<IEquipment[]>(() => equipmentStore.getEquipment());
  const isEquipmentEmpty = data && data.length === 0 && !isLoading;

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

      {/* TABLE */}

      {isEquipmentEmpty && (
        <div className={styles.content}>
          <h2 className="heading heading-2 heading-primary text-center">
            {t("equipment.empty")}
          </h2>
          <Button icon={<Plus color='white' />} onClick={() => navigate('add')}>
            {t('actions.addEquipment')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Equipment;
